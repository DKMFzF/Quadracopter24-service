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


@router.get("", summary="Получение всех квартир")
async def get_all_flats():
    async with async_session_maker() as session:
        query = select(FlatsModel)
        res = await session.execute(query)
        hotels = res.scalars().all()
        return hotels


@router.post("", summary="Добавление квартиры")
async def add_flat(flat_data: FlatAdd = Body()):
    price = 5000
    async with async_session_maker() as session:
        add_flat_stmt = insert(FlatsModel).values(price=price, **flat_data.model_dump())
        await session.execute(add_flat_stmt)
        await session.commit()
    return {"status": "OK"}


@router.post("/predict", summary="Предсказание стоимости квартиры")
async def predict_price(flat_data: FlatAdd = Body()):
    price = 5000
    return {"price": price}