from flask import Flask
from mongodb import getStudent_Behaviour , getStudentmat
from students import Student

app = Flask(__name__)

@app.route("/")
def home():
  res = "Hello, World! This is our first Flask app."
  return res


@app.route("/Student_Behaviour", methods=['GET'])
def getStudentBehaviour():
  return getStudent_Behaviour()

@app.route("/Student_mat", methods=['GET'])
def getStudentmat1():
  return getStudentmat()

@app.route("/student1", methods=['GET'])
def get_Students():
    return Student.getStudent()






if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7777)

    