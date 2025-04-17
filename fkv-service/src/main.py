from contextlib import asynccontextmanager
import sys
from pathlib import Path

import uvicorn
from fastapi import FastAPI

sys.path.append(str(Path(__file__).parent.parent))


from fastapi.middleware.cors import CORSMiddleware

from src.database import create_tables



from src.api.flats import router as router_flats
from src.api.auth import router as router_users

@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_tables()
    print("Таблица создана")
    yield
    print("Закончили")

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8081"],  # Разрешенные origins
    allow_credentials=True,  # Разрешить куки и авторизацию
    allow_methods=["*"],  # Разрешить все методы (GET, POST, PUT, DELETE и т.д.)
    allow_headers=["*"],  # Разрешить все заголовки
)

app.include_router(router_flats)
app.include_router(router_users)

if __name__ == "__main__":
    # uvicorn.run("main:app", reload=True, host="0.0.0.0", port=8000)
    uvicorn.run("main:app", reload=True)
