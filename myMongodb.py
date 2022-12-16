from pymongo import *

def Startconn():
    client = MongoClient("mongodb+srv://databits:group5@cluster0.vt9xqx9.mongodb.net/?retryWrites=true&w=majority")
    db=client.LA_PROJECT
    return db

def getStudent_Behaviour():
    db=Startconn()
    col=db["Student1"]
    return col.find()


def getStudentmat():
    db=Startconn()
    col=db["student2"]
    return col.find()


if __name__ == "__main__":
    for i in getStudent_Behaviour():
        print(i)
    for i in getStudentmat():
        print(i)


