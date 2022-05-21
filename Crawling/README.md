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

