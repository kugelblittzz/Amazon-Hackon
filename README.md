# Amazon-Hackon
Hackon Hackathon

=======
# Delivery id
1) Agent scanning the id card of the person collecting the delivery, the details automatically coming up on the delivery portal, hence reducing identity theft.
 
# Fraud Detection
1)Gaussian models help us to create more potential fraud cases, thus increasing the dataset along with fitting it.
2)Will want to Train it on the location data, IP address of AMAZON PAY alongside the amount of each transaction with the frequency of transactions to determine if the account has been hacked or being used for fraudulent activity

# QRcode_ Tamperproof sticker
1) Attaching tamper-proof stickers and assigning unique numbers to each sticker( hence product) storing the details of the products( photos, specific features) on the portal, powering it by blockchain hence not allowing the seller to change it, makes sure the product sent to the customer is the one that is returned
2)Will move towards making this decentralised using Blockchain


# Tesseract
Please download the tesseract model from online before running requirements.txt

# Python Scripts running:

For OCR model, please leave as it is a bit hardcoded now

For Photo extraction from ID, run the following commands:

cd ./Delivery_id/python_scripts/
//The next line is to only be done once
pip install -r requirements.txt
uvicorn image_server:app --reload
