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

def order_points(pts):  ## 이미지에서 4개의 꼭지점 찾기
    rect = np.zeros((4, 2), dtype="float32")

    s = pts.sum(axis=1)
    rect[0] = pts[np.argmin(s)]
    rect[2] = pts[np.argmax(s)]

    diff = np.diff(pts, axis=1)
    rect[1] = pts[np.argmin(diff)]
    rect[3] = pts[np.argmax(diff)]

    return rect
    
def four_point_transform(image, pts): ## 찾은 꼭지점을 기준으로 변환
    rect = order_points(pts)
    (tl, tr, br, bl) = rect

    widthA = np.sqrt(((br[0] - bl[0]) ** 2) + ((br[1] - bl[1]) ** 2))
    widthB = np.sqrt(((tr[0] - tl[0]) ** 2) + ((tr[1] - tl[1]) ** 2))
    maxWidth = max(int(widthA), int(widthB))

    heightA = np.sqrt(((tr[0] - br[0]) ** 2) + ((tr[1] - br[1]) ** 2))
    heightB = np.sqrt(((tl[0] - bl[0]) ** 2) + ((tl[1] - bl[1]) ** 2))
    maxHeight = max(int(heightA), int(heightB))

    dst = np.array([
        [0, 0],
        [maxWidth - 1, 0],
        [maxWidth - 1, maxHeight - 1],
        [0, maxHeight - 1]], dtype="float32")

    M = cv2.getPerspectiveTransform(rect, dst)
    warped = cv2.warpPerspective(image, M, (maxWidth, maxHeight))

    return warped


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
    blob = cv2.dnn.blobFromImage(img, 0.00392, (416,416), swapRB=True, crop=False)
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
        img = cv2.imdecode(file_byte, cv2.IMREAD_COLOR)
        # img = cv2.imread("./ocr.jpeg")
        ##
        ratio = 500.0/img.shape[0]
        dim = (int(img.shape[1] * ratio), 500)
        img = cv2.resize(img, dim, interpolation= cv2.INTER_AREA)
        og_img = img.copy()
        GRAY = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        GRAY = cv2.GaussianBlur(GRAY, (3,3), 0)
        edged = cv2.Canny(GRAY, 70,200)

        cnts, _ = cv2.findContours(edged.copy(), cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
        cnts = sorted(cnts, key =cv2.contourArea, reverse= True)[:5]
        ## 반환받은 cnt중 면적인 큰 순서대로 5번까지 반환 
        check = False
        for c in cnts:
            ## 순차적으로 탐색
            peri = cv2.arcLength(c, True)
            ## 컨투어의 길이를 반환
            approx = cv2.approxPolyDP(c, 0.02 * peri, True)
            ## 길이의 오차 2퍼센트로 도형을 근사화
            if len(approx) == 4 and cv2.contourArea(c)>=20000:
                ## 근사화한 도형의 꼭지점이 4개라면 그것이 문서의 외곽
                screenCnt = approx
                check = True
                break
        if check == True:
            cv2.drawContours(img, [screenCnt], -1, (0,255,0), 2)
            warped = four_point_transform(og_img, screenCnt.reshape(4, 2))
            copy = warped.copy()
            # warped = cv2.cvtColor(warped, cv2.COLOR_BGR2GRAY)
            # result_with_blur = cv2.adaptiveThreshold(warped,255,cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 21,10)
            img = copy
        elif check == False:
            img = img
        ##
        gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
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
