from flask import Flask
from mongodb import find_students_behaviour , find_students_mat
from students import Student
import json
app = Flask(__name__,static_url_path="",root_path="./")

@app.route("/")
def home():
  res = "Hello, World! This is our first Flask app."
  return res


@app.route("/students/behaviour", methods=['GET'])
def get_students_behaviour():
  return find_students_behaviour()

@app.route("/students/mat", methods=['GET'])
def get_studenst_mat():
  return find_students_mat()

@app.route("/students", methods=['GET'])
def get_students():
    return Student.find_students()

@app.route("/students/datavis",methods=["GET"])
def get_stu_vis():
    return app.send_static_file("index.html")

@app.route("/csvdata",methods=["GET"])
def get_stu_vis_csv():
    return app.send_static_file("dataset.csv")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7000)

    