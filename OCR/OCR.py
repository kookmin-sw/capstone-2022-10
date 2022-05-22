from cv2 import INTER_AREA, INTER_LINEAR
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

img = cv2.imread('test_img/test2.jpg')
ratio = 600.0/img.shape[0]
dim = (int(img.shape[1] * ratio), 600)
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
if check == False:
      img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
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
GRAY  = img.copy()
h,w = GRAY.shape
GRAY = cv2.resize(GRAY, (2*w, 2*h), interpolation= INTER_LINEAR)
GRAY = cv2.fastNlMeansDenoising(GRAY,h=10, searchWindowSize=21,templateWindowSize=7)




min_confidence = 0.6
result = results = pytesseract.image_to_string(GRAY,lang="kor")
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
print(set(out))