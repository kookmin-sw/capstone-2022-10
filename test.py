import pyrebase

firebaseConfig = {
   'apiKey': "AIzaSyCwUYL-yvBqnDatdPdz0_qkRWtO5AFtvdU",
    'authDomain': "first-test-ad145.firebaseapp.com",
    'databaseURL': "https://first-test-ad145-default-rtdb.asia-southeast1.firebasedatabase.app",
    'projectId': "first-test-ad145",
    'storageBucket': "first-test-ad145.appspot.com",
    'messagingSenderId': "168242732465",
    'appId': "1:168242732465:web:b11f6f4e17b1a297abb190",
    'measurementId': "G-V2C5703WKY"
}

firebase = pyrebase.initialize_app(firebaseConfig)

## set up storage

storage = firebase.storage()
# file = input("enther file name\n")
# cloud_file = input("enther cloud name\n")
# i = 0
## Img/test.jpg 
#storage.child(cloud_file).put(file)

url = storage.child("4.jpeg").get_url(None) ## 특정 부분 가져오기
print(url)
