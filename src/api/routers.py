from fastapi import APIRouter, File, UploadFile, Form, HTTPException, Depends
from ..core import Engine, make_documentation, save_md_file
from ..dimensions import decomposicao_config, dimensions
from pydantic import BaseModel
from typing import Any, Dict, List
import json

router = APIRouter()

# Modelo para os dados de evidências
class Clue(BaseModel):
  key: str

class Evidence(BaseModel):
  key: str
  clues: List[Clue]

class Dimension(BaseModel):
  key: int
  evidences: List[Evidence]

# Dependência personalizada para carregar e validar o JSON
def parse_dimensions(dimensions: str = Form(...)) -> List[Dimension]:
  try:
    dimensions_list = json.loads(dimensions)  # Converte a string JSON para um dict

    return [Dimension(**dimension) for dimension in dimensions_list]  # Converte cada dict para um objeto Dimension
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

  for idx, file in enumerate(files):
    code_content = await file.read()
    code_text = code_content.decode('utf-8')

  engine = Engine(dimension=decomposicao_config)
  documentation = make_documentation(general_context=general_context)
  save_md_file(content=documentation, path="./../../md/docs/")

  engine.inputs(code=code_text, documentation=documentation)

  response: Dict[str, Dict[str, Any]] = {}
  
  for dimension in dimensions:
    for evidence in dimension.evidences:
      engine.set_evidence(evidence_key=evidence.key)
      response[evidence.key] = {}

      for clue in evidence.clues:
        engine.set_clue(clue_key=clue.key)
        output = engine.output()

        detail = {}
        detail['output'] = output

        response[evidence.key][clue.key] = detail

  return {
    "output": response,
  }


# Rota para submissão de desafios
@router.get("/evidences")
async def get_evidences():

  return {
    "dimensions": dimensions,
  }