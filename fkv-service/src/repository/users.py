from pydantic import EmailStr
from sqlalchemy import select

from src.models.users import UsersModel
from src.repository.base import BaseRepository
from src.schemas.users import User, UserWithHashedPassword


class UsersRepository(BaseRepository):
    model = UsersModel
    schema = User

    async def get_user_with_hashed_password(self, **filter_by):
        query = select(self.model).filter_by(**filter_by)
        result = await self.session.execute(query)
        model = result.scalars().one_or_none()
        if model is None:
            return None
        return UserWithHashedPassword.model_validate(model, from_attributes=True)