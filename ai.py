from open_ai import client, messages, MODEL
from utils import read_file
from enum import Enum

class RoleType(Enum):
    SYSTEM = "system"
    USER = "user"

class AI:
  def __init__(self):
    self.client = client
    self.base_messages = messages
    self.messages = messages
    self.completion = ""

  def add_role(self, type, content):
    self.messages.append({"role": type, "content": content})
  
  def add_role_by_file(self, type, path_file):
    content = read_file(path_file)

    self.messages.append({"role": type, "content": content})

  def chat(self):
    self.completion = self.client.chat.completions.create(
      model=MODEL,
      messages=self.messages,
    )

    return self.completion

  def reset_messages(self):
    self.messages = self.base_messages

  def show(self):
    for choice in self.completion.choices:
      print(choice.message.content)