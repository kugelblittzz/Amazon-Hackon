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