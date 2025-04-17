import asyncio
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import text

from src.config import settings

engine = create_async_engine(settings.DB_URL)
async_session_maker = async_sessionmaker(bind=engine, expire_on_commit=False)


# async def check_connection():
#     async with async_session_maker() as session:
#         try:
#             result = await session.execute(text("SELECT 1"))
#             print("Подключение успешно:", result.scalar())
#         except Exception as e:
#             print("Ошибка подключения:", e)
#
# asyncio.create_task(check_connection())

class Base(DeclarativeBase):
    pass

async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

