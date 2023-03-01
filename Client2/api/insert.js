import { url } from "../config";
export const insert = async (data, token) => {
  
  const response = await fetch(`${url}/users/update`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  });

  const json = await response.json()
   
  return json
};

export const predict = async (data, token) => {

  const newData = JSON.stringify({
    "10th Mark": data['tenthMark'],
    "12th Mark": data['twelfthMark'],
    "willingness to pursue a career based on their degree  ": "4",
    "Financial Status": data['financialStatus'],
    "Stress Level ":data['stressLevel'],
    "daily studing time": data['dailystudingtime'],
    "social medai & video": data['socialMedia'],
    "prefer to study in_Night": data['studyNight'],
    "Travelling Time ":data['travellingTime'],
    "Gender_Female": data['gender'],
    "hobbies_Cinema": data['hobbiesCinema'],
    "prefer to study in_Anytime": data['studyAnytime'],
    "Department_B.com ISM": data['Department_B_ISM'],
    "hobbies_Sports": data['hobbiesSports'],
    "prefer to study in_Morning": data['studyMorning']
  })
  
  const response = await fetch(`${url}/MLOutput`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
    body:newData
  });

  const json = await response.json()
   
  return json
};



export const insertCourse = async (data, token) => {
  
  const response = await fetch(`${url}/courses/add`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  });

  const json = await response.json()
   
  return json
};


export const getCourseDifficulty = async(data, token) => {
  const response = await fetch(`${url}/courses/difficulties`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  });

  const json = await response.json()
   
  return json
}


export const getCourses = async(data, token) => {
  const response = await fetch(`${url}/courses/list`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    }
  });

  const json = await response.json()
   
  return json
}