import json
from typing import List
from fastapi import HTTPException, Form

from src.core import (
  Engine,
  OpenaiModel,
  OllamaModel,
  GeminiModel,
  DeepSeekModel
)

from ..utils import save_md_file, get_absolute_path
from ...dimensions import dimensions as base_dimensions
from src.api.models.challenge_models import Dimension

def parse_dimensions(dimensions: str = Form(...)) -> List[Dimension]:
  try:
    dimensions_list = json.loads(dimensions)

    return [Dimension(**dimension) for dimension in dimensions_list]
  except json.JSONDecodeError:
    raise HTTPException(status_code=400, detail="Invalid JSON format in dimensions")
  except ValueError as e:
    raise HTTPException(status_code=422, detail=str(e))

def get_llm_model(llm: str):
  """
  Retorna a instância do modelo LLM correspondente ao valor de 'llm'.
  """
  llm = llm.lower()
  models = {
    "gpt": OpenaiModel,
    "ollama": OllamaModel,
    "gemini": GeminiModel,
    "deepseek": DeepSeekModel,
  }
  if llm not in models:
    raise HTTPException(status_code=400, detail=f"LLM '{llm}' não é suportado.")
  return models[llm]()


def process_challenge_submission(
  general_context: str,
  code_text: str,
  dimensions: List[Dimension],
  ai_model,
) -> List[dict]:
  """
  Processa a submissão do desafio:
    1. Gera a documentação com base no contexto geral.
    2. Salva o documento gerado.
    3. Alimenta a engine com o código e a documentação.
    4. Para cada dimensão, evidência e indício, chama o output da engine.
  """
  engine = Engine(ai_model)

  # 1. Gera a documentação
  documentation = engine.make_documentation(general_context)

  # 2. Salva o documento
  docs_path = get_absolute_path("./../../../md/docs/")
  save_md_file(content=documentation, path=docs_path)

  # 3. Alimenta a engine
  engine.inputs(code=code_text, documentation=documentation)

  # 4. Itera sobre cada dimensão, evidência e indício
  response = []
  for dimension in dimensions:
    dimension_config = base_dimensions[str(dimension.key)]
    engine.set_dimension(dimension_config)

    dimension_item = engine.get_dimension()
    dimension_item['evidences'] = []

    for evidence in dimension.evidences:
      engine.set_evidence(evidence.key)
      evidence_item = engine.get_evidence(evidence.key)
      evidence_item['clues'] = []

      for clue in evidence.clues:
        engine.set_clue(clue.key)
        output = engine.output()
        clue_item = engine.get_clue(clue.key)
        clue_item['output'] = output
        evidence_item['clues'].append(clue_item)

      dimension_item['evidences'].append(evidence_item)

    response.append(dimension_item)

  return response
