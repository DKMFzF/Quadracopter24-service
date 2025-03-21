from fastapi import APIRouter, Body

from src.schemas.users import UserRequestAdd

router = APIRouter(prefix="/auth", tags=["Авторизация и аутентификация"])

@router.post("/register")
def register(user_data: UserRequestAdd = Body()):
    ...
