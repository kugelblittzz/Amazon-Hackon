from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
 
app =FastAPI()

origins=['http://localhost:3000','localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# @app.get("/add")
# def add_files():
#     image_path= _services.select_random_image("CroppedPics")
#     return _responses.FileResponse(image_path)


todos = [
    {
        "id": "1",
        "item": "Read a book."
    },
    {
        "id": "2",
        "item": "Cycle around town."
    }
]


@app.post("/todo")
async def get_todos() -> dict:
    print("Inh = here")
    return { "data": todos }

    
@app.get("/")
async def read_root() ->dict:
    return {"Hello": "World check"}


