import numpy as np
import cv2
import dlib


min_confidence = 0.5
width = 800
height = 0
show_ratio = 1.0

path = "YOLO/"
file_name = path + "images/1.jpg" ## 또는 path + "images/2.jpeg" ##  
Weights = path + 'weights/custom-train-yolo_12000.weights'
test_cfg = path + "cfg/custom-test-yolo.cfg"
net = cv2.dnn.readNetFromDarknet(test_cfg,Weights)


classes = []
anw = []
with open(path + "classes.txt" , "r") as f:
	classes = [line.strip() for line in f.readlines()]
print(classes)
color_lists = np.random.uniform(0, 255, size= (len(classes), 3))

layer_names = net.getLayerNames()
# print(layer_names)
output_layers = [layer_names[i[0] -1] for i in net.getUnconnectedOutLayers()]
# print(net.getUnconnectedOutLayers())
print(output_layers)

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
  		


		
cv2.imshow("YOLOv3", img )
cv2.waitKey()
cv2.destroyAllWindows()