import uvicorn
from fastapi import FastAPI


import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))

from src.api.flats import router as router_flats

app = FastAPI()


app.include_router(router_flats)

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True, host="0.0.0.0", port=8000)
