import uvicorn
from fastapi import FastAPI
from models import predict_cat

app = FastAPI()
import json


@app.post("/predict")
async def predict(prompt: str):
    data = json.loads(prompt)
    correct_prompt = data["text"]
    pr = predict_cat(correct_prompt)
    return {"predict": pr}


if __name__ == "__main__":
    uvicorn.run("ml:app", reload=True, host='0.0.0.0', port=8001)
