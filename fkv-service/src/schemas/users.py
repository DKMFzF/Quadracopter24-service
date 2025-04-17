from typing import re, Union

from pydantic import BaseModel, EmailStr, validator, field_validator


class UserLogin(BaseModel):
    password: str


class UserLoginByEmail(UserLogin):
    email: EmailStr


class UserLoginByPhone(UserLogin):
    phone: str

LoginSchema = Union[UserLoginByEmail, UserLoginByPhone]

    # @field_validator('phone')
    # def validate_phone(cls, v):
    #     if not re.match(r'^\+?\d{10,15}$', v):
    #         raise ValueError('Invalid phone format')
    #     return v


class Register(BaseModel):
    email: EmailStr
    phone: str
    first_name: str
    second_name: str


class UserRequestRegister(Register):
    password: str


class UserRegister(Register):
    hashed_password: str


class User(Register):
    id: int

class UserWithHashedPassword(User):
    hashed_password: str