from .ai import AI
from .utils import save_md_file

class Engine:
  def __init__(self, dimension):
    self.ai = AI()
    self.dimension = dimension
    self.evidence = None  # Para armazenar a evidência atual
    self.clue = None  # Para armazenar o indício atual
    self.code = None  # Para armazenar o código do aluno
    self.documentation = None  # Para armazenar a documentação do professor

    prompt = f'Análise da Dimensão {dimension["title"]}'
    self.ai.add_role(type="system", content=prompt)

  def __reset_ai_except_context(self):
    """Reseta as mensagens na instância da IA, mantendo o contexto relevante."""
    self.ai.reset_messages()
    if self.code:
      self.__set_code(self.code)
    if self.documentation:
      self.__set_documentation(self.documentation)
    if self.evidence:
      self.__set_evidence(self.evidence)

  def __set_code(self, code):
    self.code = code
    prompt = "O código do aluno segue abaixo"
    self.ai.add_role(type="system", content=prompt)
    self.ai.add_role(type="system", content=code)

  def __set_documentation(self, documentation):
    self.documentation = documentation
    prompt = "O documento do professor segue abaixo"
    self.ai.add_role(type="user", content=prompt)
    self.ai.add_role(type="user", content=documentation)

  def __set_evidence(self, evidence):
    self.evidence = evidence
    prompt = f"Evidência: {self.evidence['title']}"
    self.ai.add_role(type="system", content=prompt)

  def inputs(self, code, documentation):
    """Método público para configurar o código e a documentação."""
    self.__set_code(code=code)
    self.__set_documentation(documentation=documentation)

  def set_evidence(self, evidence_key):
    """Define a evidência atual e reseta as mensagens anteriores."""
    self.evidence = self.dimension['evidence'].get(evidence_key)
    if not self.evidence:
      raise ValueError(f"Evidência com a chave '{evidence_key}' não encontrada.")
    self.__reset_ai_except_context()

  def set_clue(self, clue_key):
    """Define o indício atual, preservando o contexto relevante."""
    if not self.evidence:
      raise ValueError("Nenhuma evidência foi definida. Use 'set_evidence' primeiro.")
    
    clue = self.evidence['clue'].get(clue_key)
    if not clue:
      raise ValueError(f"Indício com a chave '{clue_key}' não encontrado na evidência '{self.evidence['title']}'.")

    self.__reset_ai_except_context()

    prompt = f"""
      Indício {clue_key}: {clue['title']}
      
      Detecção: {clue['detection']}

      Saídas: (O que me deve retornar EXATAMENTE OS CAMPOS ABAIXO)

      {clue['output']}
    """
    self.ai.add_role(type="system", content=prompt)

  def output(self, save_output=True, show_output=False):
    """Realiza a análise e mostra o resultado."""
    completion = self.ai.chat()

    if show_output:
      self.ai.show()

    output = completion.choices[0].message.content
    if save_output:
      save_md_file(content=output, path="./../../md/output/")

    return output
