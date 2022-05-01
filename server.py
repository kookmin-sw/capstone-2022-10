from email import message
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from starlette.requests import Request
from pydantic import BaseModel
import numpy as np
import gdown
import sys, os
import io
import cv2
import pytesseract
import re

def readReceiptImg(img):
    pytesseract.pytesseract.tesseract_cmd = '/app/.apt/usr/bin/tesseract'
    results = pytesseract.image_to_string(img,lang="kor")

    classes = ["가지","감자", "깻잎", "버터", "당근",
            "대파","마늘", "무","배추","브로콜리",
            "상추","새송이버섯","시금치","애호박",
            "양배추", "양송이버섯","양파","오이",
            "고추","고구마", "콩나물", "귤","감",
            "딸기", "멜론", "참외", "배", "복숭아",
            "블루베리", "사과", "수박", "파프리카",
            "키위","방울토마토", "소고기","돼지고기",
            "닭고기", "달걀", "조기", "갈치","고등어",
            "문어", "꽃게", "새우", "오징어","바지락",
            "멸치", "두부", "옥수수","밥"]

            
    min_confidence = 0.6
    string = results

    list = []
    for i in string :
        if i.isalpha() :
            list.append(i)
        elif i == "\n" :
            list.append("\n")
        

    string = "".join(list)
    result = string


    result = result.replace("\n", " ")
    result = result.split(" ")
    recipe = []
    for i in result :
        if i != '' :
            recipe.append(i)
            #print(recipe)

    out = []
    for i in recipe:
        for j in classes:
            if j in i:
                #print("인식된 재료는 : ", j)
                out.append(j)




    return out

if not os.path.exists('custom-train-yolo_final.weights'):
    url = 'https://drive.google.com/uc?id=1ol3yLt2zao2ZQB_t4DSbmOU-BWUag6LV&export=download'
    gdown.download(url, 'custom-train-yolo_final.weights', quiet = False)


def readIngredientImg(img):

    Weights = 'custom-train-yolo_final.weights'
    test_cfg = 'custom-test-yolo.cfg'
    net = cv2.dnn.readNetFromDarknet(test_cfg,Weights)
    layer_names = net.getLayerNames()
    output_layers = ['yolo_82', 'yolo_94', 'yolo_106']
    classes = ["문어","새송이버섯","블루베리","방울토마토","무", "배", "콩나물"
           ,"꽃게","양배추", "양파", "새우", "시금치", "깻잎", "애호박", "밥", "옥수수"
           ,"마늘", "바지락", "감자", "수박", "브로콜리", "오이", "멜론", "파", "오징어"
           ,"당근", "복숭아", "상추","계란", "파프리카", "사과", "고추", "돼지고기", "참외"
           ,"멸치", "고등어", "조기", "배추", "감", "딸기", "가지", "소고기", "고구마"
           ,"버터", "귤", "닭고기", "두부" ,"양송이버섯", "키위", "갈치"]

    class_count = 50

    min_confidence = 0.5
    width = 800
    height = 0
    show_ratio = 1.0
    confidences = []
    names = []
    boxes = []
    h,w = img.shape[:2]
    height = int(h * width / w)
    blob = cv2.dnn.blobFromImage(img, 0.00392, (416,416), swapRB=True, crop=False
							 )
    net.setInput(blob)
    outs = net.forward(output_layers)
    
    for out in outs:
    	for detection in out:
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]
            if confidence > min_confidence:
                #print(detection)
                # Object detected
                center_x = int(detection[0] * width)
                center_y = int(detection[1] * height)
                w = int(detection[2] * width)
                h = int(detection[3] * height)

                # Rectangle coordinates
                x = int(center_x - w /2)
                y = int(center_y - h / 2)

                boxes.append([x, y, w, h])
                confidences.append(float(confidence))
                names.append(classes[class_id])

    indexes = cv2.dnn.NMSBoxes(boxes, confidences, min_confidence, 0.4)
    
    return set(names)



app = FastAPI()
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ImageType(BaseModel):
    url:str


@app.post("/receipt-image/")
def prediction(requset: Request, file: bytes = File(...)):
    if requset.method == "POST":
        image_stream = io.BytesIO(file)
        image_stream.seek(0)
        file_byte = np.asarray(bytearray(image_stream.read()), dtype = np.uint8)
        frame = cv2.imdecode(file_byte, cv2.IMREAD_COLOR)
        gray = cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)
        height, width = gray.shape
        gray = cv2.resize(gray,(2*width, 2*height), interpolation=cv2.INTER_LINEAR)
        frame = cv2.fastNlMeansDenoising(gray,h=10, searchWindowSize=21,templateWindowSize=7)
        label = readReceiptImg(frame)
        return label
    else :
        return "No post request found"


@app.post("/ingredint-image/")
def prediction(requset: Request, file: bytes = File(...)):
    if requset.method == "POST":
        image_stream = io.BytesIO(file)
        image_stream.seek(0)
        file_byte = np.asarray(bytearray(image_stream.read()), dtype = np.uint8)
        img = cv2.imdecode(file_byte, cv2.IMREAD_COLOR)
        ##### 이미지를 받는 부분 ##### 
        label = readIngredientImg(img)
        return label
    else :
        return "No post request found"