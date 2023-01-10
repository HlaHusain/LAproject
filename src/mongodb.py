import bcrypt
from pymongo import *
from pymongo import MongoClient
from bson import ObjectId, json_util
from flask import request, json
from config import CONNECTION_STRING, AUTH_CONFIG
import jwt



def get_connection():
    client = MongoClient(
        "mongodb+srv://databits:group5@cluster0.vt9xqx9.mongodb.net/?retryWrites=true&w=majority")
    db = client.LA_PROJECT
    return db

# wrap the native json methods and provide explicit BSON conversion to and from JSON


def find_students_behaviour():
    db = get_connection()
    col = db.Student1
# print(col.find_one({'_id': ObjectId("639cc679bdbae108e2ca15f3")}))
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


def create_user():
    db = get_connection()
    users = db.users
    user=request.json
    newPassword = bcrypt.hashpw(
            user['password'].encode('utf-8'), bcrypt.gensalt())

    if(users.find_one({"email" :user['email']})):
        return json.jsonify({"error": "Email address already in use", "status": 400}), 400

    if(users.insert_one({
        "email" :user['email'],
        "password" :newPassword,

    })):
       return json.jsonify({'message': 'inserted successfully', "status": 200})

    return json.jsonify({"error": "SignUp failed"}), 400

def update_user():
    db = get_connection()
    users = db.users
    user=request.json

    if(users.find_one({"email":user['email']})):
        id = users.find_one({"email":user['email']})['_id']
        users.update_one({"_id": id}, {"$set": user})
        return json.jsonify({'message': 'user data updated successfully', "status": 200})

    return json.jsonify({"error": "User data updated failed"}), 400

def signin():
    db = get_connection()
    users = db.users
    user=request.json  

    if(users.find_one({"email":user['email']})):
       document=users.find_one({"email":user['email']})
       password= document['password']
       print(password)

       if not bcrypt.checkpw(user['password'].encode('utf-8') , password):
            return json.jsonify({"error": "Invalid Email or Password", "status": 400}), 400
       else:
        user['password'] = str(bcrypt.hashpw(user['password'].encode('utf-8'), bcrypt.gensalt()))
        user['status'] = 200
        print(user['password'])
        token = jwt.encode({'id': str(document["_id"]), }, AUTH_CONFIG['SECRET_KEY'], "HS256")
        return json.jsonify({ 'token': str(token), "email": user['email'] })
            # else:
            #     return json.jsonify({"error": 'could not verify',  "status": 401}, {'Authentication': '"login required"'})
    else:
     return json.jsonify({"error": "Email address not exists", "status": 400}), 400




if __name__ == "__main__":
    for i in find_students_behaviour():
        print(i)
    for i in find_students_mat():
        print(i)
