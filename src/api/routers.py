from fastapi import APIRouter, File, UploadFile, Form, HTTPException, Depends
from ..core import Engine, make_documentation, save_md_file
from ..dimensions import decomposicao_config, dimensions
from pydantic import BaseModel
from typing import Any, Dict, List
import json

router = APIRouter()

# Modelo para os dados de evidências
class Evidence(BaseModel):
  key: str
  clues: List[str]

class Params(BaseModel):
  evidences: List[Evidence]

# Dependência personalizada para carregar e validar o JSON
def parse_params(params: str = Form(...)) -> Params:
  try:
    params_dict = json.loads(params)  # Converte a string JSON para um dict

    return Params(**params_dict)  # Valida e converte para o modelo Pydantic
  except json.JSONDecodeError:
    raise HTTPException(status_code=400, detail="Invalid JSON format in params")
  except ValueError as e:
    raise HTTPException(status_code=422, detail=str(e))

# Rota para submissão de desafios
@router.post("/challenge-submissions/")
async def submit_challenge(
  general_context: str = Form(...),
  code_file: UploadFile = File(...),
  params: Params = Depends(parse_params),
):
  code_content = await code_file.read()
  code_text = code_content.decode('utf-8')

  engine = Engine(dimension=decomposicao_config)
  evidences = params.evidences

  documentation = make_documentation(general_context=general_context)
  save_md_file(content=documentation, path="./../../md/docs/")

  engine.inputs(code=code_text, documentation=documentation)

  response: Dict[str, Dict[str, Any]] = {}
  for evidence in evidences:
    engine.set_evidence(evidence_key=evidence.key)
    
    response[evidence.key] = {}

    for clue_key in evidence.clues:
      engine.set_clue(clue_key=clue_key)
      output = engine.output()

      response[evidence.key][clue_key] = output

  return {
    "output": response,
  }


# Rota para submissão de desafios
@router.get("/evidences/")
async def get_evidences():

  return {
    "dimensions": dimensions,
  }