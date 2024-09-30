from .base_model import BaseModel
from ..clients.ollama import OllamaClient

class OllamaModel(BaseModel):
  def __init__(self):
    super().__init__()
    self.client = OllamaClient()
  
  def chat(self):
    self.completion = self.client.chat(
      model="llama3",
      messages=self.messages,
    )

    output = self.completion.get('message').get('content')

    return output
  
  def show(self):
    for choice in self.completion.choices:
      print(choice.message.content)
