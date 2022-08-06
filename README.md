# Amazon-Hackon
Hackon Hackathon

Python Scripts running:

For OCR model, please leave as it is a bit hardcoded now

For Photo extraction from ID, run the following commands:

cd ./Delivery_id/python_scripts/
//The next line is to only be done once
pip install -r requirements.txt
uvicorn image_server:app --reload