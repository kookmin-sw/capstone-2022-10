# 캡스톤디자인 10팀 README.md
![Image](/img/main.png)
## 📝 <span style="color:#FF9F1C">프로젝트 소개</span>

**How Cook** : 재료 이미지 인식을 통한 레시피 추천 서비스

## 📜 <span style="color:#FF9F1C">프로젝트 기능</span>

1. 머신러닝을 이용한 **이미지 인식**
2. 레시피 **검색과 추천**
3. 레시피 공유 **커뮤니티**

## 📝 <span style="color:#FF9F1C">Project Abstract</span>
**How Cook** : Recipe recommendation service through material image recognition
## 📜 <span style="color:#FF9F1C">Project Function</span>

1. **Image recognition** using machine learning
2. Recipe **Search and Recommend**
3. Sharing recipes **Community**

## 💻 <span style="color:#FF9F1C">소개 자료</span>

- [How Cook 소개 페이지](https://kookmin-sw.github.io/capstone-2022-10/)
- [How Cook GitHub Wiki](https://github.com/kookmin-sw/capstone-2022-10/wiki)
- [How Cook 중간 발표 PDF]()(추후 업로드 예정)
- [How Cook 소개 영상]()(추후 업로드 예정)
- [How Cook 서비스]()(추후 배포 예정)

## 👨‍🍳 <span style="color:#FF9F1C">팀 소개 및 역할</span>

1. 👩 강지수

	- Role: 재료 이미지, 레시피 크롤링 및 라벨링, Frontend
	- Student ID: ****3460
	- Email: tn1078@kookmin.ac.kr
	- Github: [@kjsoo-1010](https://github.com/kjsoo-1010)

2. 👨 박준용

	- Role: 재료 이미지 데이터 구축, 이미지, 문자 인식 모델 학습
	- Student ID: ****5298
	- Email: Jypark93@kookmin.ac.kr
	- Github:[@junyong1111](https://github.com/junyong1111)

3. 👨 이원주

	- Role: DB 설계, Backend, Frontend
	- Student ID: ****1671
	- Email: wonjulee.dev@gmail.com
	- Github: [@WonjuLee](https://github.com/wonju-dev)

4. 👩 이세희

	- Role: Frontend, Backend, 인공지능 모델 서버 구축
	- Student ID: ****1987
	- Email: tpfktpgml24@gmail.com
	- Github: [@Sehee-Lee-01](https://github.com/Sehee-Lee-01)

## 🔎 <span style="color:#FF9F1C">사용 환경 설정 및 시작하기</span>

## 🛠 Frontend

### yarn package 설치
- yarn 설치 후 진행
- package.json 패키지 설치 

### 로컬 환경 실행
```shell
yarn start
```
## 🛠 Backend
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


## 🛠 Data Modeling Server
### 패키지 설치
```shell
pip install opencv-python
pip install tensorflow
pip install numpy
```
### 로컬 환경 실행
```shell
# 추후 업로드 예정
```