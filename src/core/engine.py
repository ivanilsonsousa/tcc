from .ai.types.ai_interface import AIInterface
from .utils import save_md_file, get_absolute_path

class Engine:
  def __init__(self, ai: AIInterface):
    self.ai = ai
    self.dimension = None
    self.evidence = None
    self.clue = None
    self.code = None
    self.documentation = None
    self.clue_key = None

  def make_documentation(self, general_context) -> str:
    self.ai.reset_messages()

    prompt = f"""
              Contexto Geral:
              {general_context}
            """
    self.ai.add_role(type="user", content=prompt)
    prompt = """
              Gere um documento, baseado no modelo abaixo,
              a partir do contexto geral informado
              """
    self.ai.add_role(type="system", content=prompt)

    path_file = get_absolute_path("./../../md/prompt/teacher_documentation_scheme.md")
    self.ai.add_role_by_file(type="system", path_file=path_file)

    documentation = self.ai.chat()
    self.ai.reset_messages()

    return documentation

  def __update_ai_context(self):
    self.ai.reset_messages()

    if self.code:
      prompt = "O código do aluno segue abaixo"
      self.ai.add_role(type="system", content=prompt)
      self.ai.add_role(type="system", content=self.code)

    if self.documentation:
      prompt = "O documento do professor segue abaixo"
      self.ai.add_role(type="user", content=prompt)
      self.ai.add_role(type="user", content=self.documentation)

    if self.dimension:
      prompt = f'Análise da Dimensão {self.dimension["title"]}'
      self.ai.add_role(type="system", content=prompt)
    
    if self.evidence:
      prompt = f"Evidência: {self.evidence['title']}"
      self.ai.add_role(type="system", content=prompt)
    
    if self.clue:
      clue = self.clue
      clue_key = self.clue_key
      prompt = f"""
                Indício {clue_key}: {clue['title']}

                Detecção: {clue['detection']}

                Saídas: (O que me deve retornar EXATAMENTE OS CAMPOS ABAIXO)

                {clue['output']}
                """
      self.ai.add_role(type="system", content=prompt)

  def inputs(self, code, documentation):
    self.code = code
    self.documentation = documentation
    self.__update_ai_context()

  def get_dimension(self):
    return {
      "key": self.dimension["key"],
      "title": self.dimension["title"]
    }
  
  def get_evidence(self, evidence_key):
    evidence = self.dimension['evidences'].get(evidence_key)
    return {
      "key": evidence_key,
      "title": evidence["title"]
    }

  def get_clue(self, clue_key):
    clue = self.evidence['clues'].get(clue_key)
    return {
      "key": clue_key,
      "title": clue["title"]
    }

  def set_dimension(self, dimension):
    self.dimension = dimension
    self.__update_ai_context()

  def set_evidence(self, evidence_key):
    self.evidence = self.dimension['evidences'].get(evidence_key)

    if not self.evidence:
      raise ValueError(f"Evidência com a chave '{evidence_key}' não encontrada.")

    self.__update_ai_context()

  def set_clue(self, clue_key):
    if not self.evidence:
      raise ValueError("Nenhuma evidência foi definida. Use 'set_evidence' primeiro.")
    
    self.clue = self.evidence['clues'].get(clue_key)

    if not self.clue:
      raise ValueError(f"Indício com a chave '{clue_key}' não encontrado na evidência '{self.evidence['title']}'.")
    
    self.clue_key = clue_key
    self.__update_ai_context()

  def output(self, save_output=True, show_output=False):
    output = self.ai.chat()

    if show_output:
      self.ai.show()

    if save_output:
      path_file = get_absolute_path("./../../md/output/")
      save_md_file(content=output, path=path_file)

    return output
