import matplotlib.pyplot as plt
import cv2
import os
import numpy as np
import pytesseract
from pytesseract import Output
from PIL import Image
import re


image_name = "OCR/test_img/4.jpeg/content/5.jpg"
min_conf = 0

image = cv2.imread(image_name)
GRAY = cv2.cvtColor(image , cv2.COLOR_BGR2GRAY)
height, width = GRAY.shape

GRAY_enlarge = cv2.resize(GRAY, (2*width, 2*height), interpolation=cv2.INTER_LINEAR)
denoised = cv2.fastNlMeansDenoising(GRAY_enlarge, h=10, searchWindowSize=21, templateWindowSize=7)

plt.imshow(image)
plt.show()
results = pytesseract.image_to_string(denoised ,lang='kor')
print(results)