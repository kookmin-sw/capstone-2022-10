from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import urllib.request
from selenium.webdriver.common.by import By

#구글페이지에 기본적인 이미지 수는 50장
keyword = "eggplant"
count = 1

driver = webdriver.Chrome("/Users/dak_kiwon/Jun/Git_dir/KMU-2022/Capstone/Crawling/chromedriver")
driver.get("https://www.google.co.kr/imghp?hl=ko&ogbl")
elem = driver.find_element(by = By.NAME, value = "q")
elem.send_keys(keyword)
elem.send_keys(Keys.RETURN)

SCROLL_PAUSE_TIME = 3.0

last_height = driver.execute_script("return document.body.scrollHeight")
while True:         #stackoverflow
    # Scroll down to bottom
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

    # Wait to load page
    time.sleep(SCROLL_PAUSE_TIME)

    # Calculate new scroll height and compare with last scroll height
    new_height = driver.execute_script("return document.body.scrollHeight")
    if new_height == last_height:
        break
    last_height = new_height
    
images = driver.find_elements(by = By.CSS_SELECTOR, value = ".rg_i.Q4LuWd" ) #먼저 작은 이미지의 특정요소 가져오기

for image in images :
    try : 
        image.click()
        time.sleep(1) #시간지연을 위한 코드, 여기선 2초마다 imgae 저장
        # imgURL = driver.find_element_by_css_selector(".n3VNCb") ###selenium 3 version###
        # imgURL = driver.find_element(by = By.CSS_SELECTOR, value = ".n3VNCb").get_attribute("src") #src추출
        # 위의 css 추출은 중복된 class name이 많아서 부정확 할 수 있다.
        imgURL = driver.find_element(by=By.XPATH, value='/html/body/div[2]/c-wiz/div[3]/div[2]/div[3]/div/div/div[3]/div[2]/c-wiz/div/div[1]/div[1]/div[2]/div/a/img').get_attribute("src")
        # css추출의 대안으로 정확한 fullXPATH를 이용한다.
        urllib.request.urlretrieve(imgURL, keyword + str(count) + ".jpg")
        count += 1
        if(count==101):
            driver.close()
    except :
        pass

driver.close()