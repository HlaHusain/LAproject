from functools import wraps
from flask import Flask, request
from mongodb import find_students_behaviour, find_students_mat, create_user, update_user, signin,get_users_data
from students import Student
from bson import ObjectId
import json
from base64 import decode
from bson import ObjectId
import json
from functools import wraps
from pymongo import MongoClient
from pymongo.message import query
from config import CONNECTION_STRING, AUTH_CONFIG
import jwt
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
client = MongoClient(CONNECTION_STRING, ssl=True, ssl_cert_reqs='CERT_NONE')

def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        print('request.headers' , request.headers)
        if 'Authorization' in request.headers:
            token = request.headers['Authorization']

            print('token' , token)


        if not token:
            return json.dumps({'message': 'a valid token is missing'})
        try:
            decoded = jwt.decode(
                token, AUTH_CONFIG['SECRET_KEY'], algorithms=["HS256"])
            user = client.LA_PROJECT['users'].find_one(
                    {"_id": ObjectId(decoded["id"])})

            if user is None:
                return json.dumps({'message': 'token is invalid'})
            request.user = user

        except Exception as ex:
            print(ex)
            return json.dumps({'message': 'token is invalid'})

        return f(*args, **kwargs)

    return decorator



class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, bytes):
            return o.decode('utf-8')
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)




@app.route("/", methods=['GET'])
def home():
    res = "Hello, World! This is our first Flask app."
    return res


@app.route("/students/behaviour", methods=['GET'])
# @token_required
def get_students_behaviour():
    return find_students_behaviour()


@app.route("/students/mat", methods=['GET'])
# @token_required
def get_studenst_mat():
    return find_students_mat()


@app.route("/users/add", methods=['POST'])
# @token_required
def add_user_data():
    return create_user()

@app.route("/users/get", methods=['GET'])
# @token_required
def get_user_data():
    return get_users_data()


@app.route("/users/update", methods=['PUT'])
# @token_required
def update_user_data():
    return update_user()


@app.route("/users/signin", methods=['POST'])
def signin_user():
    return signin()


@app.route("/students", methods=['GET'])
# @token_required
def get_students():
    return Student.find_students()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7777)
