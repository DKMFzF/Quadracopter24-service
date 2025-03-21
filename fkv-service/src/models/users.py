from sqlalchemy.orm import Mapped, mapped_column

from src.database import Base


class UsersModel(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    login: Mapped[str] = mapped_column(unique=True)
    hashed_password: Mapped[str]
