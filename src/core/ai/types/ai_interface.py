from abc import ABC, abstractmethod
from .types import RoleType

class AIInterface(ABC):
  @abstractmethod
  def add_role(self, type: RoleType, content):
      pass

  @abstractmethod
  def add_role_by_file(self, type: RoleType, path_file):
    pass

  @abstractmethod
  def chat(self):
    pass

  @abstractmethod
  def reset_messages(self):
    pass

  @abstractmethod
  def show(self):
    pass
