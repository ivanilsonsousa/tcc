from . import get_absolute_path
from .ai.models.openai_model import OpenaiModel

def make(general_context):
  ai = OpenaiModel()

  prompt = f"""
              Contexto Geral:
              {general_context}
            """
  ai.add_role(type="user", content=prompt)
  prompt = """
            Gere um documento, baseado no modelo abaixo,
            a partir do contexto geral informado
            """
  ai.add_role(type="system", content=prompt)

  path_file = get_absolute_path("./../../md/prompt/teacher_documentation_scheme.md")
  ai.add_role_by_file(type="system", path_file=path_file)

  documentation = ai.chat()

  return documentation

__all__ = ['make']