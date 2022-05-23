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
