import uvicorn
from fastapi import FastAPI

app = FastAPI()

@app.post("/predict")
async def predict(prompt: str):
    return {}

if __name__ == "__main__":
    uvicorn.run("ml:app", reload=True, host='0.0.0.0', port=8001)