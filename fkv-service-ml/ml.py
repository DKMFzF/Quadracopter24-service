import uvicorn
from fastapi import FastAPI
from models import predict_cat
app = FastAPI()

@app.post("/predict")
async def predict(prompt: str):
    pr = predict_cat(prompt)
    return {"predict": pr}

if __name__ == "__main__":
    uvicorn.run("ml:app", reload=True, host='0.0.0.0', port=8001)