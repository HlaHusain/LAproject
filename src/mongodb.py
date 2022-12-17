
from pymongo import *
from pymongo import MongoClient
from bson import ObjectId, json_util


def Startconn():
    client = MongoClient(
        "mongodb+srv://databits:group5@cluster0.vt9xqx9.mongodb.net/?retryWrites=true&w=majority")
    db = client.LA_PROJECT
    return db


def getStudent_Behaviour():
    db = Startconn()
    col = db["Student1"]
# print(col.find_one({'_id': ObjectId("639cc679bdbae108e2ca15f3")}))
    return json_util.dumps(col.find())



def getStudentmat():
    db = Startconn()
    col = db["student2"]
    return json_util.dumps(col.find())


def getStudents():
    db = Startconn()
    col = db["student1"]
    return json_util.dumps(col.find())


if __name__ == "__main__":
    for i in getStudent_Behaviour():
        print(i)
    for i in getStudentmat():
        print(i)
