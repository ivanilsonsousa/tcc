from pydantic import BaseModel
from typing import List

class Clue(BaseModel):
  key: str

class Evidence(BaseModel):
  key: str
  clues: List[Clue]

class Dimension(BaseModel):
  key: int
  evidences: List[Evidence]
