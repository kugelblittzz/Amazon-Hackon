from tesserocr import PyTessBaseAPI
import cv2 as cv
images = ['pan.jpg','aadhar1.jpg','anirudh_pan.jpeg','anirudh_driver.jpeg']

def preprocess_txt(txt,conf):
    cleaned_txt=[]
    cleaned_conf=[]
    for confidence,word in zip(conf,txt):
        if(len(word) >= 3):
            cleaned_txt.append(word)
            cleaned_conf.append(confidence)
    return cleaned_txt,cleaned_conf

def preprocess_passed_values(passed):
    act=passed.split(' ')
    for i in range(len(act)):
        act[i]=act[i].upper()
    return act

def get_value(value,txt,conf):
    print(value)
    found_values=[]
    mean_confidence=0
    for confidence,word in zip(conf,txt):
        cap_word=word.upper()
        if(cap_word in value and not (cap_word in found_values) ):
            found_values.append(cap_word)
            mean_confidence+=confidence
    if(mean_confidence!=0):
        mean_confidence/=len(found_values)
        mean_confidence=mean_confidence/len(value )*len(found_values)
    return found_values,mean_confidence

def extract_info(img,name_act,address,dob):
    with PyTessBaseAPI() as api:
        image=cv.imread(img)
        image=cv.cvtColor(image,cv.COLOR_BGR2RGB)
        image=cv.fastNlMeansDenoisingColored(image, None, hColor=10)
        cv.imwrite('temp.jpg',image)
        api.SetImageFile('temp.jpg')
        txt=api.GetUTF8Text().replace('\n',' ').split()
        txt=" ".join(txt).split(' ')
        conf=api.AllWordConfidences()

        cleaned_txt,cleaned_conf=preprocess_txt(txt,conf)
        print(cleaned_txt)
        name_act=preprocess_passed_values(name_act)
        address=preprocess_passed_values(address)
        dob=[dob]

        found_name,conf_name=get_value(name_act,cleaned_txt,cleaned_conf)
        found_addr,conf_addr=get_value(address,cleaned_txt,cleaned_conf)
        found_dob,conf_dob=get_value(dob,cleaned_txt,cleaned_conf)
        readibility_score=conf_addr+conf_name+conf_dob
        values=(conf_addr>0)+(conf_name>0)+(conf_dob>0)
        if(values>0):
            readibility_score=readibility_score/values 
        
        print(found_name,found_addr,found_dob,readibility_score)
# use system arguments for file path

extract_info(images[0],'Neetigya Poddar', '17B Merlin Cambridge 24 Prince Anwar Shah Road','06/02/2002')
print('\n\n')
extract_info(images[2],'Anirudh Murthy', '17B Merlin Cambridge 24 Prince Anwar Shah Road','13/01/2002')
print('\n\n')
extract_info(images[1],'Neetigya Poddar', '17B Merlin Cambridge 24 Prince Anwar Shah Road','06/02/2002')
print('\n\n')
extract_info(images[3],'Anirudh Murthy', '17B Merlin Cambridge 24 Prince Anwar Shah Road','13/01/2002')
