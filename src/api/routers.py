from fastapi import APIRouter, File, UploadFile, Form, HTTPException, Depends
from ..core import Engine, make_documentation, save_md_file
from ..dimensions import dimensions as base_dimensions
from pydantic import BaseModel
from typing import List
import json

router = APIRouter()

class Clue(BaseModel):
  key: str

class Evidence(BaseModel):
  key: str
  clues: List[Clue]

class Dimension(BaseModel):
  key: int
  evidences: List[Evidence]

def parse_dimensions(dimensions: str = Form(...)) -> List[Dimension]:
  try:
    dimensions_list = json.loads(dimensions)

    return [Dimension(**dimension) for dimension in dimensions_list]
  except json.JSONDecodeError:
    raise HTTPException(status_code=400, detail="Invalid JSON format in dimensions")
  except ValueError as e:
    raise HTTPException(status_code=422, detail=str(e))

# Rota para submissão de desafios
@router.post("/challenge-submissions")
async def submit_challenge(
  general_context: str = Form(...),
  files: List[UploadFile] = File(...),  # Aceita múltiplos arquivos
  dimensions: List[Dimension] = Depends(parse_dimensions),  # Usando 'dimensions' ao invés de 'params'
):
  
  try:

    for idx, file in enumerate(files):
      code_content = await file.read()
      code_text = code_content.decode('utf-8')

    documentation = make_documentation(general_context=general_context)
    save_md_file(content=documentation, path="./../../md/docs/")

    engine = Engine()
    engine.inputs(code=code_text, documentation=documentation)

    response = []
  
    for dimension in dimensions:
      dimension_config = base_dimensions[str(dimension.key)]
      engine.set_dimension(dimension=dimension_config)

      dimension_item = engine.get_dimension()
      dimension_item['evidences'] = []

      for evidence in dimension.evidences:
        engine.set_evidence(evidence_key=evidence.key)

        evidence_item = engine.get_evidence(evidence_key=evidence.key)
        evidence_item['clues'] = []

        for clue in evidence.clues:
          engine.set_clue(clue_key=clue.key)
          output = engine.output()
          # output = "mocking data..."

          clue_item = engine.get_clue(clue_key=clue.key)
          clue_item['output'] = output

          evidence_item['clues'].append(clue_item)
        
        dimension_item['evidences'].append(evidence_item)

      response.append(dimension_item)

  except Exception as e:
    raise HTTPException(status_code=422, detail=str(e))

  return {
    'output': response,
  }


# Rota para submissão de desafios
@router.get("/evidences")
async def get_evidences():

  return {
    "dimensions": base_dimensions,
  }