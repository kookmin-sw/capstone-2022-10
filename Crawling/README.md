## MacOs기준
### Step1. Python가상환경 설정
1. python venv 가상환경
2. miniforge3 conda 가상환경
##### 가상환경을 만드는 2가지 방법 중 python venv를 이용
- python venv 가상환경 설정 방법.

```python
python -m venv /path/to/new/virtual/environment ## 가상환경 설정

ex) python -m venv Crawling
``` 
``` python
cd Crawling/Scripts # 가상환경 폴더로 이동 후
activate ## activate 명령어 사용
``` 

### Step3.   Selenium 설치

```python
pip install selenium
```
### Chrome Driver 설치

- 사용중인 Chrome 버전 확인
버전 99.0.4844.51(공식 빌드) (x86_64)
- Chromedriver 검색 후 버전에 맞게 설치
- 압축 해제 후 chromedriver을 크롤링 코드와 같은 폴더로 이동
- 코드 작성

```python
## 기본코드
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

driver = webdriver.Chrome("/Users/dak_kiwon/Jun/Git_dir/KMU-2022/Capstone/Crawling/chromedriver") # driver가 저장된 상대경로
driver.get("https://www.google.co.kr")

```

#### 만약 개발자를 확인할 수 없다는 메시지가 뜬다면 chromedriver가 있는 폴더로 가서 아래 명령어 실행
```
xattr -d com.apple.quarantine chromedriver
```

가장 일반적인 식재료 50가지 선정
재료 리스트

* 채소
    - 1.가지
    - 2.감자
    - 3.깻잎
    - 4.버섯▶버터
    - 5.당근
    - 6.대파
    - 7.마늘
    - 8.무
    - 9.배추
    - 10.브로콜리
    - 11.상추
    - 12.새송이버섯
    - 13.시금치
    - 14.애호박
    - 15.양배추
    - 16.양송이버섯
    - 17.양파
    - 18.오이
    - 19.고추
    - 20.고구마
    - 21.콩나물
* 과일
    - 22.귤
    - 23.감
    - 24.딸기
    - 25.멜론
    - 26.참외
    - 27.배
    - 28.복숭아
    - 29.블루베리
    - 30.사과
    - 31.수박
    - 32.포도▶파프리카
    - 33.키위
    - 34.방울토마토
* 육류
    - 35.소고기
    - 36.돼지고기
    - 37.닭고기
    - 38.달걀

* 생선
    - 39.조기
    - 40.갈치
    - 41.고등어
    - 42.문어
    - 43.꽃게
    - 44.새우
    - 45.오징어
    - 46.바지락
    - 47.멸치

* 기타 

    - 48.두부 
    - 49.옥수수 
    - 50.밥

