from pydantic import BaseModel


class UserRequestAdd(BaseModel):
    login: str
    password: str


class UserAdd(BaseModel):
    login: str
    hashed_password: str


class User(BaseModel):
    id: int
    login: str