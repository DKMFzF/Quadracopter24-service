from fastapi import APIRouter, Body, HTTPException, Request, Response

from src.api.dependencies import UserIdDep
from src.database import async_session_maker
from src.repository.users import UsersRepository
from src.schemas.users import UserRequestRegister, UserRegister, LoginSchema, UserLoginByEmail
from src.services.auth import AuthService

router = APIRouter(prefix="/auth", tags=["Авторизация и аутентификация"])

@router.post("/register", summary="Регистрация пользователя")
async def register_user(
        data: UserRequestRegister,

):
    hashed_password = AuthService().hash_password(data.password)
    new_user = UserRegister(
        email=data.email,
        phone=data.phone,
        hashed_password=hashed_password,
        first_name=data.first_name,
        second_name=data.second_name
    )
    async with async_session_maker() as session:
        user = await UsersRepository(session).add(new_user)
        await session.commit()

    return {"data": user}

@router.post("/login", summary="Аутентификация пользователя")
async def login_user(
        data: LoginSchema,
        response: Response
):
    async with async_session_maker() as session:
        if isinstance(data, UserLoginByEmail):
            user = await UsersRepository(session).get_user_with_hashed_password(email=data.email)
        else:
            user = await UsersRepository(session).get_user_with_hashed_password(phone=data.phone)
        if not user:
            raise HTTPException(status_code=401, detail="Такой пользователь не зарегистрирован")
        if not AuthService().verify_password(data.password, user.hashed_password):
            raise HTTPException(status_code=401, detail="Пароль неверный")
        access_token = AuthService().create_access_token({"user_id": user.id})
        response.set_cookie("access_token", access_token)
        await session.commit()
    return {"access_token": access_token}
#
# # jwt.exceptions.ExpiredSignatureError: Signature has expired
#
#
@router.get("/me", summary="Получения текущего пользователя")
async def get_me(
        user_id: UserIdDep,
):
    async with async_session_maker() as session:
        user = await UsersRepository(session).get_one_or_none(id=user_id)
    return {"data": user}
#
#
#
@router.post("/logout", summary="Выход из профиля")
async def logout(response: Response):
    response.delete_cookie("access_token")
    return {"status": "OK"}