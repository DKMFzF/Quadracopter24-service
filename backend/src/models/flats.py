from sqlalchemy.orm import Mapped, mapped_column

from src.database import Base


class FlatsModel(Base):
    __tablename__ = "flats"

    id: Mapped[int] = mapped_column(primary_key=True)
    price: Mapped[int]
    all_square: Mapped[int]
    life_square: Mapped[int]
    kit_square: Mapped[int]
    center_dist: Mapped[int]
    metro_dist: Mapped[int]
    amount_rooms: Mapped[int]
    floor: Mapped[int]
    walk: Mapped[bool]