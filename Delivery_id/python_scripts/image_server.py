import uvicorn
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import os
import cv2 
import sys
import shutil
import base64
app=FastAPI()

origins=["http://localhost:3000",
"localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post("/img")
async def create_file(file:UploadFile):
    with open(f"{file.filename}","wb") as buf:
        shutil.copyfileobj(file.file,buf)
    
    image = cv2.imread(os.path.join(os.getcwd(),file.filename))
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    faceCascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
    faces = faceCascade.detectMultiScale(
        gray,
        scaleFactor=1.3,
        minNeighbors=3,
        minSize=(30, 30)
    )

    print("[INFO] Found {0} Faces!".format(len(faces)))
    k=10
    print(image.shape)
    for (x, y, w, h) in faces:
        startx=int(max(x-k,0))
        endx=int(min(x+w+k,image.shape[0]))
        starty=int(max(y-k,0))
        endy=int(min(y+h+k,image.shape[1]))
        cv2.imwrite('faces_cropped.jpg', image[starty:endy,startx:endx])
        cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)

    status = cv2.imwrite('faces_detected.jpg', image)
    imgpath=os.path.join(os.getcwd(),'faces_cropped.jpg')
    with open(imgpath,'rb') as f:
        base64image=base64.b64encode(f.read())
    return base64image

# the tesseract part, would suggest not to touch this :)
from tesserocr import PyTessBaseAPI


def preprocess_txt(txt,conf):
    cleaned_txt=[]
    cleaned_conf=[]
    for confidence,word in zip(conf,txt):
        if(len(word) >= 3):
            cleaned_txt.append(word)
            cleaned_conf.append(confidence)
    return cleaned_txt,cleaned_conf


@app.post('\extract-details')
async def teser_details(file:UploadFile):
    with open(f"{file.filename}","wb") as buf:
        shutil.copyfileobj(file.file,buf)
    with PyTessBaseAPI() as api:
        image=cv2.imread(file.filename)
        image=cv2.cvtColor(image,cv2.COLOR_BGR2RGB)
        image=cv2.fastNlMeansDenoisingColored(image, None, hColor=10)
        cv2.imwrite('temp.jpg',image)
        api.SetImageFile('temp.jpg')
        txt=api.GetUTF8Text().replace('\n',' ').split()
        txt=" ".join(txt).split(' ')
        conf=api.AllWordConfidences()

        cleaned_txt,cleaned_conf=preprocess_txt(txt,conf)
        return_value=" ".join(cleaned_txt)
        return {"data":return_value}