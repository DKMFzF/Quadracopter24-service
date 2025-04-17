from sqlalchemy.orm import Mapped, mapped_column

from src.database import Base


class BASTypes(Base):
    __tablename__ = 'bastypes'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    type: Mapped[str]
