
from flask import request, json
from pymongo import MongoClient
from config import CONNECTION_STRING
from mongodb import getStudent_Behaviour , getStudentmat
from bson import ObjectId, json_util

client = MongoClient(CONNECTION_STRING)
student1 = client.LA_PROJECT['Student1']  # students collection
student2 = client.LA_PROJECT['Student2']

class Student:


    def getStudent():
        try:
            print( json_util.dumps(student1.find()))
            return json_util.dumps(student1.find())
        except Exception as ex:
            print("[WARNING] some exception has occurred!")
            print("Error in searching query, cause ")
            print(ex)
            return []    

    def getStudent_Behaviour():
            try:
                return getStudent_Behaviour()
            except Exception as ex:
                print("[WARNING] some exception has occurred!")
                print("Error in searching query, cause ")
                print(ex)
                return []    


    def getStudentmat():
            try:
                return getStudentmat()
            except Exception as ex:
                print("[WARNING] some exception has occurred!")
                print("Error in searching query, cause ")
                print(ex)
                return []  
