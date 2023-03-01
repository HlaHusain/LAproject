import datetime
import bcrypt
from pymongo import *
from pymongo import MongoClient
from bson import ObjectId, json_util
from flask import request, json
from config import CONNECTION_STRING, AUTH_CONFIG
import jwt
from datetime import date
# Import libraries
import numpy as np
from flask import Flask, request, jsonify
import pickle
from os import listdir
import pandas as pd
from base64 import decode

# Load the model


# print(listdir())

def get_connection():
    client = MongoClient(
        "mongodb+srv://databits:group5@cluster0.vt9xqx9.mongodb.net/?retryWrites=true&w=majority")
    db = client.LA_PROJECT
    return db

# wrap the native json methods and provide explicit BSON conversion to and from JSON


def find_students_behaviour():
    db = get_connection()
    col = db.Student1
    return json_util.dumps(col.find())


def find_students_mat():
    db = get_connection()
    print(db)
    col = db.student2
    return json_util.dumps(col.find())


def getStudents():
    db = get_connection()
    col = db.student1
    return json_util.dumps(col.find())


def get_users_data():
    db = get_connection()
    col = db.users
    return json_util.dumps(col.find())


# def add_user():
#     db = get_connection()
#     col=db.users
#     data= {"email": 'hlahusain@gmail.com'}
#     user = col.fine_one(data.email)
#     if (!user):
#         col.insert_one(data)

#     return json.jsonify({'message': 'inserted successfully', "status": 200})

def get_user_behaviour():

    db = get_connection()
    behaviour = db.userbehaviourData
    user = request.user

    if (behaviour.find_one({"email": user['email']})):
    
        return json_util.dumps(behaviour.find({"email": user['email']}).sort('created_at' , -1).limit(5))
    else:
        return json.jsonify({"error": "User not exists", "status": 400}), 400


def create_user():
    db = get_connection()
    users = db.users
    user = request.json
    newPassword = bcrypt.hashpw(
        user['password'].encode('utf-8'), bcrypt.gensalt())

    if (users.find_one({"email": user['email']})):
        return json.jsonify({"error": "Email address already in use", "status": 400}), 400

    if (users.insert_one({
        "email": user['email'],
        "password": newPassword,

    })):
        return json.jsonify({'message': 'inserted successfully', "status": 200})

    return json.jsonify({"error": "SignUp failed"}), 400


def update_userbehaviourData():

    try:
        db = get_connection()
        userbehaviourData = db.userbehaviourData
        data = request.json
        user = request.user
        print('user = ', user)

        data['email'] = user['email']
        data['created_at'] = str(date.today())
        userbehaviourData.insert_one(data)
        return json.jsonify({'message': 'user data updated successfully', "status": 200})
    except Exception as ex:
        print("[WARNING] some exception has occurred!")
        print(ex)
        return []


def signin():
    db = get_connection()
    users = db.users
    user = request.json

    if (users.find_one({"email": user['email']})):
        document = users.find_one({"email": user['email']})
        password = document['password']
        print(password)

        if not bcrypt.checkpw(user['password'].encode('utf-8'), password):
            return json.jsonify({"error": "User not exists", "status": 400}), 400
        else:
            user['password'] = str(bcrypt.hashpw(
                user['password'].encode('utf-8'), bcrypt.gensalt()))
            user['status'] = 200
            print(user['password'])
            token = jwt.encode(
                {'id': str(document["_id"]), }, AUTH_CONFIG['SECRET_KEY'], "HS256")
            return json.jsonify({'token': str(token), "email": user['email'], "status": 200}), 200
            # else:
            #     return json.jsonify({"error": 'could not verify',  "status": 401}, {'Authentication': '"login required"'})
    else:
        return json.jsonify({"error": "User not exists", "status": 400}), 400


# def add_course():

#     db = get_connection()
#     courses = db.courses
#     user_courses = request.json
 
#     for c in user_courses['courses']:
#         # course = find_in_list
#         if not (courses.insert_one({
#             "course": c['course'],
#             "credit": c['credit'],
#         })): 
#             return json.jsonify({"error": "Add Course failed"}), 400

#     return json.jsonify({'message': 'inserted successfully', "status": 200})


def find_in_list(list, filter):
    for x in list:
        if filter(x):
            return x
    return None


def get_courses_difficulties():

    db = get_connection()
    courses = get_list_courses()

    credit_factors = db.creditFactors
    user_courses = request.json["courses"]
    user_score = request.json["score"]

    final_scores = []

    for user_course in user_courses:
        course = find_in_list(
            courses, lambda x: x["course"] == user_course["course"])
        credit_factor = credit_factors.find_one({"credit": course["credit"]})

        if(credit_factor):
            final_score = user_score + (user_score * float(credit_factor["n_ects"]))

            final_scores.append({
                "course": course["course"],
                "difficulty": final_score
            })


            credits_difficulites = db.credits_difficulites.insert_one({"course": course["course"] , "credit": course["credit"] , "difficulty": final_score})

    return json.jsonify(final_scores), 200


def predict():
    data = request.json
    df = pd.DataFrame(data, index=[0])


    lr = pickle.load(open('src/model.pickle', 'rb'))
    prediction = lr.predict(df)

    return jsonify({
        "prediction": prediction[0]
    })


    # The protocol version used is detected automatically, so we do not
    # have to specify it.
    # model = pickle.load(file)
    # # Get the data from the POST request.
    # # Make prediction using model loaded from disk as per the data.
    # prediction = model.predict([[np.array(df)]])
    # # Take the first value of prediction
    # print(prediction)
    # output = prediction[0]
    # return jsonify(output)


def get_list_courses():
    import csv

    rows = []
    with open('src/courses.csv', 'r') as file:
        reader = csv.reader(file)
        for row in reader:
            rows.append({
                "credit": row[0],
                "course": row[1],
            })

    return rows
    # for row in df:
    #     rows.append(row)

    # print(rows)
    # return jsonify(rows)


if __name__ == "__main__":
    for i in find_students_behaviour():
        print(i)
    for i in find_students_mat():
        print(i)

