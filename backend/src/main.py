import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))

from src.api.flats import router as router_flats

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://localhoct:8081"]
)


app.include_router(router_flats)

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
