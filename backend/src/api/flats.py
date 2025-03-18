from fastapi import Query, APIRouter, Body
from sqlalchemy import insert, select, func


from src.schemas.flats import FlatAdd
from src.database import async_session_maker

router = APIRouter(prefix="/flats")

flats = [
    {"id": 1, "Тип": "Двухкомнатная"},
    {"id": 2, "Тип": "Однокомнатная"}
]


@router.get("")
def get_flats():
    return flats


@router.post("")
def add_flat(flat_data: FlatAdd = Body()):
    return flat_data
