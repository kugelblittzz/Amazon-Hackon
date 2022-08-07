<<<<<<< HEAD
import uvicorn
if __name__=="__main__":
    uvicorn.run("image_server:app",host="127.0.0.1",port=8000,reload=True)
=======
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
 
app =FastAPI()

origins=['https://localhost:300']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentails = True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return{"hello":"hi"}
>>>>>>> 99b04a78f34a6dca67f09d40c1127601d6bf2165
