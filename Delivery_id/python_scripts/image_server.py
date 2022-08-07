import pytesseract
pytesseract.pytesseract.tesseract_cmd = 'C:\\Program Files (x86)\\Tesseract-OCR\\tesseract.exe'
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse,StreamingResponse
import os
import cv2 
import sys
import shutil
import io
app=FastAPI()

def make_img(filename):
    pass

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
    bytes_image=io.BytesIO()
    cropped_img=cv2.imread('faces_cropped.jpg')
    cropped_img=cv2.cvtColor(cropped_img,cv2.COLOR_BGR2RGB)
    cropped_img.save(bytes_image, format='JPG')
    status = cv2.imwrite('faces_detected.jpg', image)
    return StreamingResponse(bytes_image.getvalue(),headers= {'Name':'Neetigya Poddar'}, 
    media_type='image/jpg')
    # return FileResponse(os.path.join(os.getcwd(),'faces_cropped.jpg'))
