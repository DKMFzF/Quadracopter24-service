from pydantic import BaseModel


class FlatAdd(BaseModel):
    all_square: int
    life_square: int
    kit_square: int
    center_dist: int
    metro_dist: int
    amount_rooms: int
    floor: int
    walk: bool


class FlatPATCH(BaseModel):
    ...