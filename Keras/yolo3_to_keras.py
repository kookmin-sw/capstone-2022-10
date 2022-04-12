import cv2
import numpy as np
import tensorflow as tf


min_confidence = 0.5 
width = 800
height = 0
show_ratio = 1.0

file_name = "Keras/test_img/test.jpg" #이미지 경로
classes_name ="Keras/classes.txt" # classes 이름이 담긴 파일
weight_name = "Keras/weights/capstone_custom.h5" # .h5파일
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
    print(img)
    cv2.imshow("YOLO3_TO_KERAS", img)
    cv2.waitKey(0)
        
detectAndDisplay()
