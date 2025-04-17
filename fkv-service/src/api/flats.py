from fastapi import Query, APIRouter, Body
from sqlalchemy import insert, select, func
from watchfiles import awatch

from src.models.flats import FlatsModel
from src.schemas.flats import FlatAdd
from src.database import async_session_maker

router = APIRouter(prefix="/flats", tags=["Квартиры"])

flats = [
    {"id": 1, "Тип": "Двухкомнатная"},
    {"id": 2, "Тип": "Однокомнатная"}
]




@router.post("/predict", summary="Предсказание стоимости квартиры")
async def predict_price(flat_data: FlatAdd = Body()):
    price = 5000
    return {"price": price}