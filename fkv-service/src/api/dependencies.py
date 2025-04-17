from typing import Annotated

from fastapi import Request, Depends, HTTPException

from src.services.auth import AuthService


def get_token(request: Request):
    token = request.cookies.get("access_token")
    return token

def get_curr_user_id(token: str = Depends(get_token)):
    if not token:
        raise HTTPException(status_code=401, detail="Вы не предоставили токен доступа")
    data = AuthService().decode_token(token)
    return data["user_id"]

UserIdDep = Annotated[int, Depends(get_curr_user_id)]