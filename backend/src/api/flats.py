from fastapi import Query, APIRouter, Body
from sqlalchemy import insert, select, func



router = APIRouter(prefix="/flats")

flats = [
    {"id": 1, "Тип": "Двухкомнатная"},
    {"id": 2, "Тип": "Однокомнатная"}
]


@router.get("")
def get_flats():
    return flats

