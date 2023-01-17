
from pymongo import *
from pymongo import MongoClient
from bson import ObjectId, json_util


def get_connection():
    client = MongoClient(
        "mongodb+srv://databits:group5@cluster0.vt9xqx9.mongodb.net/?retryWrites=true&w=majority")
    db = client.LA_PROJECT
    return db


def find_students_behaviour():
    db = get_connection()
    col = db["Student1"]
# print(col.find_one({'_id': ObjectId("639cc679bdbae108e2ca15f3")}))
    return json_util.dumps(col.find())

def find_colloge_grade():
    
    db = get_connection()
    

def find_students_mat():
    db = get_connection()
    col = db["student2"]
    return json_util.dumps(col.find())


def getStudents():
    db = get_connection()
    col = db["student1"]
    return json_util.dumps(col.find())


if __name__ == "__main__":
    for i in find_students_behaviour():
        print(i)
    for i in find_students_mat():
        print(i)
