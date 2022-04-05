# 캡스톤디자인 10팀 README.md
**＊ 코드는 위쪽 branch를 참고해주세요!**

![Image](/img/mainLogoOrange.png)
## 📝 <span style="color:#FF9F1C">프로젝트 소개</span>

**How Cook** : 재료 이미지 인식을 통한 레시피 추천 서비스

최근 코로나19 펜데믹 이후로 사람들은 가정 내에서 직접 요리를 하고 싶어하는 욕구가 늘어나고 있습니다. 
하지만 1인가구는 보통 가정 내에서 혼자 머무르는 경우가 많기 때문에 건강한 식문화에 대한 교류 및 접근성이 낮은 상황입니다. 
이에 대한 문제를 의식하게 되어 본 프로젝트는 예상 수요층인 1인 가구가 좀 더 쉽게 건강한 식문화에 접근할 수 있도록 도와주는 플랫폼을 기획하게 되었습니다. 
이미지 속 재료 인식을 기반으로 레시피를 검색해주는 기능과 레시피를 추천해주는 기능을 구현하고자 합니다. 또한 이러한 레시피를 공유할 수 있도록 공유 커뮤니티를 구현하게 되었습니다.
**이 서비스를 통해 1인 가구 및 가정 내에서 사진 촬영 한 번으로 건강한 식문화에 접근할 수 있는 환경을 구현하고자 합니다.**


## 📝 <span style="color:#FF9F1C">Project Abstract</span>
**How Cook** : Recipe recommendation service through material image recognition

Since the recent COVID-19 pandemic, people have a growing desire to cook at home.
However, since single-person households usually stay alone in the home, exchanges and access to healthy food culture are low.
Being conscious of this problem, this project came to plan a platform that helps single-person households, the expected demand group, to more easily access healthy food culture.
We want to implement a function that searches for a recipe based on the recognition of ingredients in an image and a function that recommends a recipe. We've also implemented a sharing community to help you share these recipes.
**Through this service, we want to create an environment where single-person households and other households can access healthy food culture with just one photo shoot.**

## 🎥프로젝트 소개 동영상

https://user-images.githubusercontent.com/85275893/161413783-7137025c-5081-4e2d-8399-81392d9f2109.mp4

## 💻 <span style="color:#FF9F1C">소개 자료</span>

- 📎 [How Cook 소개 페이지](https://kookmin-sw.github.io/capstone-2022-10/)
- 📎 [How Cook GitHub Wiki⭐](https://github.com/kookmin-sw/capstone-2022-10/wiki)
- 📎 [How Cook 중간 발표 PDF](https://docs.google.com/viewer?url=https://github.com/kookmin-sw/capstone-2022-10/blob/master/img/%ED%8C%8010-%EC%A4%91%EA%B0%84%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C.pdf?raw=True)
- 📎 [How Cook 소개 영상 원본](https://drive.google.com/file/d/1XycH4Z82Xn06QCra3Sg6E4PctV6QyFq5/view?usp=sharing)
- 📎 [How Cook 서비스]()(추후 배포 예정)

## 👨‍🍳 <span style="color:#FF9F1C">팀 소개 및 역할</span>

1. 👩 강지수

	- Role: 재료 이미지, 레시피 크롤링 및 라벨링, Frontend
	-  Student ID: ****3460
	-  Email: tn1078@kookmin.ac.kr
	-  Github: [@kjsoo-1010](https://github.com/kjsoo-1010)

2. 👨 박준용

	-  Role: 재료 이미지 데이터 구축, 이미지, 문자 인식 모델 학습
	- Student ID: ****5298
	-  Email: Jypark93@kookmin.ac.kr
	-  Github:[@junyong1111](https://github.com/junyong1111)

3. 👨 이원주

	-  Role: DB 설계, Backend, Frontend
	-  Student ID: ****1671
	-  Email: wonjulee.dev@gmail.com
	- Github: [@WonjuLee](https://github.com/wonju-dev)

4. 👩 이세희

	- Role: Frontend, Backend, 인공지능 모델 서버 구축
	- Student ID: ****1987
	- Email: tpfktpgml24@gmail.com
	- Github: [@Sehee-Lee-01](https://github.com/Sehee-Lee-01)

## 🔎 <span style="color:#FF9F1C">사용 환경 설정 및 시작하기</span>

<details>
<summary >🛠 Frontend</summary>

##### [📎Code 보러가기](https://github.com/kookmin-sw/capstone-2022-10/tree/frontend)

### yarn package 설치
- yarn 설치 후 진행
- package.json 패키지 설치 
```shell
yarn install
```
### 로컬 환경 실행
```shell
yarn start
```

</details>

<details>
<summary >🛠 Backend</summary>


##### [📎Code 보러가기](https://github.com/kookmin-sw/capstone-2022-10/tree/backend)

### yarn package 설치
- yarn 설치 후 진행
- package.json 패키지 설치 
```shell
yarn install
```
### API 테스트 환경 설정

- vscode extensions [rest client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) 설치
- `.rest` 파일 생성
- [API 명세서](https://coal-bee-2c7.notion.site/API-0f1484a8eeb648d3b3b9cbc1fc5542b9) 참고하여 확인
```shell
### 유저 정보 확인  
POST http://localhost:4000/users HTTP/1.1
Content-Type: application/json

{
    "userId": 1,
    ...
}
```
### DB(MySQL) 연동 설정 방법
- MySQL 설치 후 서버 연동 
- `root`에 `.env` 환경변수 파일 생성 후 작성

```shell
DB_LOCAL_HOST = localhost # IP address
DB_LOCAL_PORT = 3306 # Port number
DB_LOCAL_USERNAME = root # Username
DB_LOCAL_PASSWORD = 0000 # Password of DB
DB_LOCAL_DATABASENAME = capstone # DB name
```

### 로컬 환경 실행

```shell
yarn local
```

</details>

<details>
<summary >🛠 Data Modeling</summary>

##### [📎Code 보러가기](https://github.com/kookmin-sw/capstone-2022-10/tree/Datamodel)
### 필수 라이브러리 설치

### 1. YOLO 설치

```shell
pip install opencv-python
pip install numpy as np
pip install cmake
pip install dlib
```

### 2. Tensorflow 설치

```shell
pip install opencv-python
pip install tensorflow
pip install numpy
```
	
### 3. OCR 설치

```shell
sudo apt install tesseract-ocr 
pip install pytesseract
```

###  4. 로컬 환경 실행

```shell
# 추후 업로드 예정
```

</details>

### 📌[더 알고싶다면?](https://github.com/kookmin-sw/capstone-2022-10/wiki)
