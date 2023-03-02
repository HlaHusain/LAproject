# -*- coding: utf-8 -*-
"""Heiner ML.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1m4fQHn_hvorlA2iJByTiuU1SqDeBeyRY
"""

import numpy as np
import pandas as pd
import requests
import json

import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
import seaborn as sns #Vizualisation
import matplotlib.pyplot as plt #Vizualisation

from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

# Load data
data = []
url='https://la-api.codeiin.com/students/behaviour'
r = requests.get(url)

# Load data
data = []
url1='https://la-api.codeiin.com/users/get'
usersData = requests.get(url1)

json_dict = r.json()

json_dict1 = usersData.json()

print(type(json_dict))
JSONContent= json.dumps(json_dict)
JSONContent1= json.dumps(json_dict1)
JSONContent
JSONContent1

# Convert JSON string with records orient to a Dataframe
df = pd.read_json(JSONContent, orient ='columns')
df1 = pd.read_json(JSONContent1, orient ='columns')

df.shape
df1.shape

df.describe()
df1.describe()

df

df = df.drop("_id", axis=1)
df
df1 = df1.drop(["_id","email","password"], axis=1)
df1

columns = df.columns
print(columns)
for column in columns:
   print(column)
   x = df[column].nunique()

def createNumericalArray(data, threshold):
  columns = df.columns
  numerical_columns = []
  for column in columns:
    x = df[column].nunique()
    if x > 10:
      numerical_columns.append(column)
  print(numerical_columns)
  return numerical_columns

numerical = createNumericalArray(df, 10)

numerical = df[numerical]

"""# **NUMERICAL DATA - DATA MINING**


"""

import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns

describe_num_df = numerical.describe()
describe_num_df.reset_index(inplace=True)
# To remove any variable from plot
describe_num_df = describe_num_df[describe_num_df["index"] != "count"]
for i in numerical:
  if i in ["index"]:
    continue
  sns.factorplot(x="index", y=i, data=describe_num_df)
  plt.show()

numerical.describe()
numerical_columns = numerical.columns

for category in numerical_columns:
  print(category)
  sns.histplot(data=numerical, x=category)
  plt.show()

To_Plot = numerical.columns
print("Reletive Plot Of Some Selected Features: A Data Subset")
plt.figure()
sns.pairplot(numerical[To_Plot], hue= "college mark")
#Taking hue 
plt.show()

#correlation matrix
corrmat = numerical.corr()
plt.figure(figsize=(20,20))  
sns.heatmap(corrmat,annot=True, center=0)

def createCategoricalArray(data, threshold):
  columns = df.columns
  categorical_columns = []
  for column in columns:
    x = df[column].nunique()
    if x <= threshold:
      categorical_columns.append(column)
  return categorical_columns

categorical_columns = createCategoricalArray(df, 8)
categorical_columns

categorical = df[categorical_columns]

for category in categorical:
  sns.countplot(data=categorical, x=category)
  plt.show()

"""# **CATEGORICAL DATA - DATA MINING**"""

#some code

"""# **NOMINAL DATA - ONE HOT ENCODING**"""

df_nominal = categorical

def OneHotEncoder (df_nominal):
  oneHotEncodedData = pd.get_dummies(df_nominal, prefix_sep = "_")
  return oneHotEncodedData

df_nominal = OneHotEncoder(df_nominal)
df_nominal

"""# **ORDINAL DATA - ORDINAL ENCODER**"""

df_ordinal = df[['daily studing time',
       'willingness to pursue a career based on their degree  ',
       'social medai & video', 'Travelling Time ', 'Stress Level ',
       'Financial Status']]

# leveraging the variables already created above
mapper = {'0 - 30 minute':1, '30 - 60 minute':2, '1 - 2 Hour':3, '2 - 3 hour':4,
       '3 - 4 hour':5, 'More Than 4 hour':6}
df_ordinal['daily studing time'] = df_ordinal['daily studing time'].replace({'0 - 30 minute':1, '30 - 60 minute':2, '1 - 2 Hour':3, '2 - 3 hour':4,
       '3 - 4 hour':5, 'More Than 4 hour':6})

mapper = {'50%':3, '75%':4, '25%':2, '100%':5, '0%':1}
df_ordinal[ 'willingness to pursue a career based on their degree  '] = df_ordinal[ 'willingness to pursue a career based on their degree  '].replace({'50%':3, '75%':4, '25%':2, '100%':5, '0%':1})

mapper = {'1.30 - 2 hour':2, '1 - 1.30 hour':3, 'More than 2 hour':1, '30 - 60 Minute':4, '1 - 30 Minute': 5, '0 Minute': 6}
df_ordinal['social medai & video'] = df_ordinal['social medai & video'].replace({'1.30 - 2 hour':2, '1 - 1.30 hour':3, 'More than 2 hour':1, '30 - 60 Minute':4, '1 - 30 Minute': 5, '0 Minute': 6})

mapper = {'30 - 60 minutes':6, '0 - 30 minutes':7, '1 - 1.30 hour':5,
       '2 - 2.30 hour':3, '1.30 - 2 hour':4, 'more than 3 hour':1,
       '2.30 - 3 hour':2}
df_ordinal['Travelling Time '] = df_ordinal['Travelling Time '].replace({'30 - 60 minutes':6, '0 - 30 minutes':7, '1 - 1.30 hour':5,
       '2 - 2.30 hour':3, '1.30 - 2 hour':4, 'more than 3 hour':1,
       '2.30 - 3 hour':2})

mapper = {'Bad':2, 'Awful':1, 'Good':3, 'fabulous':4}
df_ordinal["Stress Level "] = df_ordinal["Stress Level "].replace({'Bad':2, 'Awful':1, 'Good':3, 'fabulous':4})

mapper = {'Bad':2, 'good':3, 'Awful':1, 'Fabulous':4}
df_ordinal["Financial Status"] = df_ordinal["Financial Status"].replace({'Bad':2, 'good':3, 'Awful':1, 'Fabulous':4})

df_ordinal

"""# **LABEL ENCODING**"""

label = df["college mark"]

df = pd.concat([df_ordinal, df_nominal, numerical, label], axis = 1)

df

df.columns

"""# **Train-Test-Split**"""

X = df.drop(['college mark', 'Certification Course_No', 'Certification Course_Yes'],axis = 1)
y = df['college mark']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=1)

X_train,y_train

"""# ML - Linear Regression"""

from sklearn.linear_model import LinearRegression

lr = LinearRegression().fit(X_train,y_train)

lr.score(X_test, y_test)

lr.predict(X_test)

lr.coef_

"""# **Save Model with pickle**"""

import pickle

pickle.dump(lr, open('lr.pkl', 'wb'))

lr = pickle.load(open('lr.pkl', 'rb'))
lr.predict(X_test)

"""# **Regression Tree Classifier**"""

from sklearn.tree import DecisionTreeRegressor
from sklearn import metrics #Import scikit-learn metrics module for accuracy calculation
import seaborn as sns
import matplotlib.pyplot as plt

decReg = DecisionTreeRegressor()
decReg.fit(X_train, y_train)

importances = decReg.feature_importances_
#Predict the response for test dataset
y_pred = decReg.predict(X_test)

from sklearn.model_selection import cross_val_score


score = cross_val_score(decReg, X_test, y_test,cv=2)
score1 = decReg.score(X_test, y_test)
# print(score)
print(score1)
# checking difference between labled y and predicted y
sns.distplot(y_pred)
plt.scatter(y_test,y_pred)
# Model Accuracy, how often is the classifier correct?
# print("Accuracy:",decReg.score(y_test, y_pred))

print(importances)

names = X_train.columns
values = importances

import numpy as np
import matplotlib.pyplot as plt

plt.figure(figsize=(20, 3))
plt.bar(names, values)

plt.show()

d = {'Feature': names, 'importances': importances}
df_importances = pd.DataFrame(data=d)

#df_importances.drop_duplicates(subset=["importances"])

df_sorted = df_importances.sort_values(by = "importances", ascending=False)
df_sorted["Feature"].values

"""# **Frontend Information - Data Types**"""

df_feature_selection = df[['10th Mark', '12th Mark',
       'prefer to study in_Anytime', 'hobbies_Reading books', 'hobbies_Video Games', 'daily studing time',
       'social medai & video',
       'Travelling Time _1 - 1.30 hour', 'prefer to study in_Morning',
       'Gender_Female', 'Financial Status', 'college mark']]

df_feature_selection.dtypes

"""# **Categories**

# **Feature Information - Max-Min as Input Range per Category**
"""

df_feature_selection.describe()

"""# **Retrain Liner Regression**"""

df=df_feature_selection
df = df.loc[:,~df.T.duplicated(keep='first')]

df1.rename(columns={"tenthMark": "10th Mark", "twelfthMark": "12th Mark" ,"studyAnytime":"prefer to study in_Anytime" ,"readingBooks":"hobbies_Reading books",
                    "videoGames":"hobbies_Video Games" ,"dailystudingtime":"daily studing time" ,"socialMedia":"social medai & video",
                    "travellingTime":"Travelling Time _1 - 1.30 hour" ,"studyMorning":"prefer to study in_Morning" ,"gender":"Gender_Female" ,"financialStatus":"Financial Status",
                    "finalGrade":"college mark"}, inplace = True)

frames = [df, df1]
newDF = pd.concat(frames)
newDF

#Train Test Split - Drop less important features - tbd
y = newDF['college mark']

X = newDF.drop(['college mark'],axis = 1)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
X_train,y_train

lr = LinearRegression()
lr.fit(X_train,y_train)

lr.score(X_test, y_test)

lr.predict(X_test)

import pickle

pickle.dump(lr, open('lr.pkl', 'wb'))

lr = pickle.load(open('lr.pkl', 'rb'))
lr.predict(X_test)

df = pd.DataFrame(
    
        {
  "10th Mark": [85],
  "12th Mark": [74],
  "prefer to study in_Night": [0],
    "Financial Status": [3],
    "daily studing time": [1],
  "willingness to pursue a career based on their degree  ": [4],
  "Stress Level ": [1],
    "Travelling Time ":[7],
  "social medai & video": [1],
  "Gender_Female": [1],
  "hobbies_Cinema": [1],
  "prefer to study in_Anytime": [1],
    "prefer to study in_Morning": [0],
  "hobbies_Sports": [0],
    "Department_B.com ISM": [0],
}
)
df
# print(df)
rr.predict(df)