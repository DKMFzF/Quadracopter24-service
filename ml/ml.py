import uvicorn
from fastapi import FastAPI

app = FastAPI()

@app.post("/predict")
async def predict():
    return {"prediction": "12345"}

if __name__ == "__main__":
    uvicorn.run("ml:app", reload=True, port=8001)