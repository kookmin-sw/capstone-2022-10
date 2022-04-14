import cv2
import numpy as np
import tensorflow as tf


min_confidence = 0.10
width = 800
height = 0
show_ratio = 1.0

file_name = "Keras/test_img/test2.jpg" #이미지 경로
classes_name ="Keras/classes.txt" # classes 이름이 담긴 파일
weight_name = "Keras/weights/capstone_custom.h5" # .h5파일

# with open(classes_name, 'r') as txt:
#     for line in txt:
#         name = line.replace("\n","")
#         classes.append(name)
classes = ["문어","새송이버섯","블루베리","방울토마토","무", "배", "콩나물"
           ,"꽃게","양배추", "양파", "새우", "시금치", "깻잎", "애호박", "밥", "옥수수"
           ,"마늘", "바지락", "감자", "수박", "브로콜리", "오이", "멜론", "파", "오징어"
           ,"당근", "복숭아", "상추","계란", "파프리카", "사과", "고추", "돼지고기", "참외"
           ,"멸치", "고등어", "조기", "배추", "감", "딸기", "가지", "소고기", "고구마"
           ,"버터", "귤", "닭고기", "두부" ,"양송이버섯", "키위", "갈치"]

# colors = [(0, 255, 0), (0, 0, 255),(255,0,0)] 클래스 갯수만큼


read_image = cv2.imread(file_name)
CW = 32
CH = 32
CD = 3

model = tf.keras.models.load_model(weight_name)

def detectAndDisplay():
    global read_image
    global classes
    test_images = []
    result_list =[]
    
    h,w = read_image.shape[:2]
    height = int( h * width/w )
    img = cv2.resize(read_image, (width, height))
    img = cv2.resize(img
                       ,(CW,CH), interpolation= cv2.INTER_AREA)
    
    test_images.append(img)
    test_images = np.array(test_images)
    test_images = test_images.astype("float32") / 255.0


    result = model.predict(test_images)

    for i in range(51):
        if((result[0][i] * 100)>= (min_confidence * 100)):
                result_list.append(classes[i])
    
    #result_number = np.argmax(result[0])    
    
    for i in result_list :
        print("인식된 재료는 " , i, "입니다.")
        
detectAndDisplay()
