from fastapi import APIRouter, File, UploadFile, Form, Depends
from typing import List

from src.core.services.challenge_service import (
  parse_dimensions,
  get_llm_model,
  process_challenge_submission,
)
from src.dimensions import dimensions as base_dimensions
from src.api.models.challenge_models import Dimension

router = APIRouter()

@router.post("/challenge-submissions")
async def submit_challenge(
  general_context: str = Form(...),
  files: List[UploadFile] = File(...),
  dimensions: List[Dimension] = Depends(parse_dimensions),
  llm: str = Form(...),
):
  """
  Endpoint para submissão de desafios.
  Recebe:
    - general_context: contexto geral
    - llm: modelo LLM a ser utilizado (openai, ollama, gemini, deepseek)
    - dimensions: JSON em string com dimensões, evidências e indícios
    - files: arquivos com o código enviado
  """

  # 2. Lê todo o conteúdo dos arquivos enviados
  code_text = ""
  for file in files:
    content = await file.read()
    code_text += content.decode("utf-8") + "\n"

  # 3. Seleciona o modelo LLM
  ai_model = get_llm_model(llm)

  print(ai_model);

  # 4. Processa e retorna a resposta
  result = process_challenge_submission(general_context, code_text, dimensions, ai_model)
  return {"output": result}


@router.get("/evidences")
async def get_evidences():
  """
  Retorna as dimensões pré-definidas em 'base_dimensions'.
  """
  return {"dimensions": base_dimensions}
