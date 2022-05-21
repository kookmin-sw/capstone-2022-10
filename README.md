# capstone-2022-10
capstone-2022-45 created by GitHub Classroom. 

# ML


## YOLOv3

##### 사용한 **YOLO V3**모델은 **You Only Look Once**의 약자로써, 객체 탐지(Object detection)분야에서 많이 알려져 있으며 이미지를 한 번 보는 것으로 물체의 종류와 위치를 추측하며 이미지의 전체 맥락을 이해하므로 빠르고 정확하다..
##### **YOLO v3**는 이전v2버전을 더욱 개량하여 정확도를 향상시켰다.



## OCR(광학문자인식)
##### 광학 문자 인식(Optical character recognition; OCR)은 사람이 쓰거나 기계로 인쇄한 문자의 영상을 이미지 스캐너로 획득하여 기계가 읽을 수 있는 문자로 변환하는 것

- 테서랙트(Tesseract):     
  - 다양한 운영 체제를 위한 광학 문자 인식 엔진 이 소프트웨어는 Apache License, 버전 2.0 에 따라 배포되는 무료 소프트웨어이며 2006년부터 Google에서 개발을 후원

  - 2006년 테서랙트는 당시 가장 정확한 오픈 소스 OCR 엔진 중 하나로 간주되었다.

##### 한글인식이 상당히 좋지않은편이라 학습 또는 이미지 전처리 과정이 필요



## 학습환경
### Google Colab 
(코랩에서 진행하는 이유)

- ###### YOLO를 학습시키기 위해서는 Darknet을 사용해야하는데 설치 조건이 까다롭기 때문에 공통적인 환경을 위하여 
- ###### Linux 환경
- ###### GPU연산 가능  
##### #주의점 : Colab 무료버전은 최대 런타임 시간은 12시간이므로 구글 드라이브를 통한 데이터 백업 필요

## 파일구조
YOLO

```
...  
|── cfg/  
|   └──custom-test-yolo.cfg   
|── data/  
|   |── labels/  
|   |── dog.jpg  
|   └── fruit10.jpg  
|── images/  
|   └── test.jpg  
|── weights/    
|   └── chart_custom-train-yolo.png  
|── YOLOv3.py  
|── classes.txt  
|── requirements.txt  
...   
```
OCR
```
...  
|── test_img/  
|   └──test.jpeg
|── OCR.py
|── requirements.txt  
...  

```


## 필수 라이브러리 설치

<details>
<summary>  YOLO </summary>
<div markdown="1"> 

* YOLO테스트를 위한 필수 라이브러리 설치
```python
pip install opencv-python
pip install numpy as np 
https://drive.google.com/file/d/1ol3yLt2zao2ZQB_t4DSbmOU-BWUag6LV/view?usp=sharing  
	<해당 다운로드 파일을 YOLO/weights/ 경로에 넣어주세요>
```

</div>
</details>

<details>
<summary>OCR </summary>
<div markdown="1"> 

* OCR을 위한 필수 라이브러리 설치

```python
sudo apt install tesseract-ocr 
sudo apt-get install tesseract-ocr-kor
pip install opencv-python
pip install pytesseract
```

</div>
</details>

## How to start


<details>
<summary> YOLO </summary>>
<div markdown="1"> 
	


* Yolo모델을 사용하기 위한 코드
```python
import cv2
import numpy as np

min_confidence = 0.5
width = 800
height = 0
show_ratio = 1.0
path = ""  ##자신의 기본 경로
file_name = "" ## 모델 이미지 경로
Weights = path + '재료.W/' + "custom-train-yolo_12000.weights" ##욜로 학습 모델이 있는 경로
test_cfg = path +"cfg/custom-train-yolo.cfg" ## cfg파일이 있는경로  
net = cv2.dnn.readNetFromDarknet(test_cfg,Weights)

```
#### classes.txt파일에 있는 classes 가져옴
```python
classes = []
anw = []
#with open("$path/classes.nemes" , "r") as f:
with open(path + "재료/classes.names" , "r") as f:
	classes = [line.strip() for line in f.readlines()]
print(classes)
color_lists = np.random.uniform(0, 255, size= (len(classes), 3))

layer_names = net.getLayerNames()
# print(layer_names)
output_layers = [layer_names[i[0] -1] for i in net.getUnconnectedOutLayers()]
# print(net.getUnconnectedOutLayers())
```

``` python
img = cv2.imread(file_name)

h,w = img.shape[:2]
height = int(h * width / w)
print(height, width)

blob = cv2.dnn.blobFromImage(img, 0.00392, (416,416), swapRB=True, crop=False
							 )

net.setInput(blob)
outs = net.forward(output_layers)

confidences = []
names = []
boxes = []
colors = []

```

```python
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
			colors.append(color_lists[class_id])

indexes = cv2.dnn.NMSBoxes(boxes, confidences, min_confidence, 0.4)

```
#### Detection한 이미지에 텍스트를 입력하는 코드 
```python
font = cv2.FONT_HERSHEY_PLAIN
for i in range(len(boxes)):
	if i in indexes:
		x, y, w, h = boxes[i]
		label = str( names[i] )
		anw = (str(names[i]))
		con = (confidences[i] * 100)
		con = "{:.1f}".format(con)
	
    #print (type(con))
		color = colors[i]
		#print(i, label, color, x, y, w, h)
		cv2.rectangle(img, (x, y), (x+w, y+h), color, 2)
		cv2.putText(img, con + "%", (x, y +80), font, 3, color, 3)
		cv2.putText(img, label, (x, y + 30), font, 3, color, 3)
```
#### 결과이미지를 보여주는 코드
```python
plt.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
#cv2.imshow("Custom Yolo", file_name, img)
plt.show()
end_time = time.time()
process_time = end_time - start_time
print("===A frame took {:.3f} sec".format(process_time))
```

</div>
</details>


</div>
</details>


<details>
<summary> OCR </summary>>
<div markdown="1"> 

 

#### 영수증 인식을 광학문자인식 OCR 이용
* 구글에서 제공해주는 광학문자익식 tesseract-ocr을 이용
* kor.traineddata  : 한글 데이터가 있는 파일
##### # 해당파일을 OCR 데이터 팩에 옮겨넣음

OpenCV를 이용하여 왜곡 이미지를 원근변환 이후 pytesseract를 이용하여 영수증에서 해당 텍스트 검출


```python
import pytesseract
import numpy as np
import cv2

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

def order_points(pts): ## 4개의 꼭지점을 찾는 함수
    rect = np.zeros((4, 2), dtype="float32")

    s = pts.sum(axis=1)
    rect[0] = pts[np.argmin(s)]
    rect[2] = pts[np.argmax(s)]

    diff = np.diff(pts, axis=1)
    rect[1] = pts[np.argmin(diff)]
    rect[3] = pts[np.argmax(diff)]

    return rect
    
def four_point_transform(image, pts): ##4개의 꼭지점을 기준으로 투영변환
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

####### 이미지 읽기

img = cv2.imread('test_img/test.jpeg')
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
    if len(approx) == 4:
        ## 근사화한 도형의 꼭지점이 4개라면 그것이 문서의 외곽
        screenCnt = approx
        check = True
        break
if check == False:
      img = img
    # cv2.imshow("IMG", img)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()
else :
    cv2.drawContours(img, [screenCnt], -1, (0,255,0), 2)
    warped = four_point_transform(og_img, screenCnt.reshape(4, 2))
    copy = warped.copy()
    img = cv2.cvtColor(copy, cv2.COLOR_BGR2GRAY)
    
#### TEST ####
# cv2.imshow("IMG", img)
# cv2.imshow("warped", copy)
# cv2.waitKey(0)
# cv2.destroyAllWindows()



min_confidence = 0.6
result = results = pytesseract.image_to_string(img,lang="kor")
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
                print("인식된 재료는 : ", j)
                out.append(j)
```





</div>
</details>
