from sqlalchemy.orm import Mapped, mapped_column

from src.database import Base


class UsersModel(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(unique=True)
    hashed_password: Mapped[str]
    phone: Mapped[str]
    first_name: Mapped[str]
    second_name: Mapped[str]
