import numpy as np
import sys, os
from fastapi import FastAPI, UploadFile, File
from starlette.requests import Request
import io
import cv2
import pytesseract
import re
from pydantic import BaseModel




Weights = 'custom-train-yolo_final.weights'
test_cfg = 'custom-test-yolo.cfg'
##### 위 두 파일을 어디서 받아오지...
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



def read_img(img):
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

class ImageType(BaseModel):
    url:str


@app.post("/predict/")
def prediction(requset: Request, file: bytes = File(...)):
    if requset.method == "POST":
        image_stream = io.BytesIO(file)
        image_stream.seek(0)
        file_byte = np.asarray(bytearray(image_stream.read()), dtype = np.uint8)
        img = cv2.imdecode(file_byte, cv2.IMREAD_COLOR)
        ##### 이미지를 받는 부분 ##### 
        label = read_img(img)
        return label
    else :
        return "No post request found"