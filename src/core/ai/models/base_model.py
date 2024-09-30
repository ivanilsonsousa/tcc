from ..types.ai_interface import AIInterface
from ..types.types import RoleType
from ..__base__ import messages
from ...utils import read_file

class BaseModel(AIInterface):
  def __init__(self):
    self.base_messages = messages.copy()
    self.messages = messages.copy()
    self.completion = ""
    self.client = None
  
  def add_role(self, type: RoleType, content: str):
    self.messages.append({"role": type, "content": content})
  
  def add_role_by_file(self, type: RoleType, path_file: str):
    content = read_file(path_file)
    self.messages.append({"role": type, "content": content})
  
  def reset_messages(self):
    self.messages = self.base_messages.copy()

  def chat(self) -> str:
    return "impletar chat..."
  
  def show(self):
    print("implementar show...")
