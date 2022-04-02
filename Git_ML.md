ML
- **YOLOv3**
###### 사용한 **YOLO V3**모델은 **You Only Look Once**의 약자로써, 객체 탐지(Object detection)분야에서 많이 알려져 있으며 이미지를 한 번 보는 것으로 물체의 종류와 위치를 추측한다.
###### **YOLO v3**는 이전v2버전을 더욱 개량하여 정확도를 향상시켰다.


##### 학습환경
- Google Colab  
(코랩에서 진행하는 이유)
    - ###### YOLO를 학습시키기 위해서는 Darknet을 사용해야하는데 설치 조건이 까다롭기 때문에 공통적인 환경을 위하여 
    - ###### Linux 환경
    - ###### GPU연산 가능  
##### #주의점 : Colab 무료버전은 최대 런타임 시간은 12시간이므로 구글 드라이브를 통한 데이터 백업 필요

### 필수 라이브러리 설치

<details>
<summary>  YOLO </summary>
<div markdown="1"> 

* YOLO테스트를 위한 필수 라이브러리 설치
```python
pip install opencv-python
pip install numpy as np
pip install cmake
pip install dlib
```

</div>
</details>

<details>
<summary>Tensorflow </summary>
<div markdown="1"> 

* Tensorflow를 위한 필수 라이브러리 설치
```python
pip install opencv-python
pip install tensorflow
pip install numpy
```

</div>
</details>


<details>
<summary>OCR </summary>
<div markdown="1"> 

* OCR을 위한 필수 라이브러리 설치

```python
sudo apt install tesseract-ocr 

pip install pytesseract
```

</div>
</details>

### How to start


<details>
<summary> 학습모델 사용 </summary>>
<div markdown="1"> 

<details>
<summary> YOLO </summary>>
<div markdown="1"> 


* Yolo모델을 사용하기 위한 코드
```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
import dlib
import time

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




<details>
<summary> Tensorflow </summary>>
<div markdown="1"> 

##### YOLO에서 학습한 Weight파일을 Google에서 제공하는 Tensorflow Keras 모델로 재학습하여 사용

##### 필요 라이브러리 설치

```python
pip install opencv-python
pip install tensorflow
pip install numpy
```
##### 다운로드 파일 설명

* classes.txt : 재료 리스트가 들어있는 txt파일 
* capstone_custom.h5 : YOLo 모델을 Keras 파일로 변환시킨 파일
* sweet.jpg : 테스를 위한 이미지 파일

#### 필요 파일을 다운받은 후 다음 코드를 실행
```python
##
import cv2
import numpy as np
import tensorflow as tf


min_confidence = 0.5 
width = 800
height = 0
show_ratio = 1.0

file_name = "keras/sweet.jpg" #이미지 경로
classes_name ="keras/classes.txt" # classes 이름이 담긴 파일
weight_name = "keras/capstone_custom.h5" # .h5파일
classes = []
# colors = [(0, 255, 0), (0, 0, 255),(255,0,0)] 클래스 갯수만큼


read_image = cv2.imread(file_name)
CW = 32
CH = 32
CD = 3

model = tf.keras.models.load_model(weight_name)
with open(classes_name, 'r') as txt:
    for line in txt:
        name = line.replace("\n","")
        classes.append(name)
print(classes)


def detectAndDisplay():
    global read_image
    global classes
    test_images = []
    
    h,w = read_image.shape[:2]
    height = int( h * width/w )
    img = cv2.resize(read_image, (width, height))
    
    box = cv2.selectROI("Select a ROI and then press SPACE or ENTER button!", img, fromCenter=False, showCrosshair=True)
    
    startX = int(box[0])
    startY = int(box[1])
    endX = int(box[0] + box[2])
    endY = int(box[1] + box[3])
    image = cv2.resize(img[startY:endY, startX:endX]
                       ,(CW,CH), interpolation= cv2.INTER_AREA)
    test_images.append(image)
    test_images = np.array(test_images)
    test_images = test_images.astype("float32") / 255.0
    
    result = model.predict(test_images)
    result_number = np.argmax(result[0])
    # print(result, result_number)
    print("%s : %.2f %2s" % (classes[result_number], result[0][result_number] * 100, "%"))
    
    text = "{} : {}%".format(classes[result_number], round(result[0][result_number]*100,2))
    y = startY - 10 if startY - 10 > 10 else startY + 10    
    cv2.rectangle(img, (startX, startY), (endX, endY),
                   (255,0,0), 2)
    cv2.putText(img, text, (startX, y)
                 ,cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255,0,0) ,2)
    
    img[0:CH, 0:CW] = image
    cv2.imshow("test", img)
    cv2.waitKey(0)
        
detectAndDisplay()

    
```


</div>
</details>


<details>
<summary> OCR </summary>>
<div markdown="1"> 

#### 영수증 인식을 광학문자인식 OCR 이용
* 구글에서 제공해주는 광학문자익식 tesseract-ocr을 이용
* kor.traineddata  : 한글 데이터가 있는 파일
##### # 해당파일을 OCR 데이터 팩에 옮겨넣음
* test.jpg : 영수증 인식을 위한 테스트 이미지 파일

#### 필요 라이브러리 설치
```python
sudo apt install tesseract-ocr
pip install pytesseract
```
### 이미지를 읽고 opencv을 이용하여 전처리 
* GRAY : 이미지를 Gray scale로 변환
* GRAY_enlarge : Gray scale로 변환시킨 이미지에 크기를 2배로
* denoised : 확장시킨 이미지에 노이지를 제거해줌

```python
image_name = "/content/4.jpeg"
min_conf = 0

image = cv2.imread(image_name)
GRAY = cv2.cvtColor(image , cv2.COLOR_BGR2GRAY)
height, width = GRAY.shape




GRAY_enlarge = cv2.resize(GRAY, (2*width, 2*height), interpolation=cv2.INTER_LINEAR)


###################### Denoising ######################
denoised = cv2.fastNlMeansDenoising(GRAY_enlarge, h=10, searchWindowSize=21, templateWindowSize=7)
###################### Denoising ######################

plt.imshow(image)
plt.show()

results = pytesseract.image_to_string(denoised ,lang='kor') ### /usr/share/tesseract-ocr/4.00/tessdata/kor.traineddata 원하는 데이터를 넣어줘야 함
# results = re.compile('[|가-힣|+').sub('', results)
print(results)

```

#### 텍스트 가공

```python
string = results

list = []
for i in string :
    if i.isalpha() :
        list.append(i)
result = "".join(list)


print(result)
```






</div>
</details>




어떻게 시작하는지 
환경설정
파일구조 
코랩에서 






