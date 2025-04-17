from fastapi import APIRouter

router = APIRouter(prefix="order/", tags=["Заказы"])

import httpx

async def get_prediction_from_ml():
    async with httpx.AsyncClient() as client:
        response = await client.post("http://localhost:8001/predict")
        return response.json()

@router.get("/predict")
async def get_prediction():
    return await get_prediction_from_ml()

@router.get("/")
def get_prompt(prompt: str):
    ...