from .base_model import BaseModel
from ..clients.open_ai import OpenaiClient

class OpenaiModel(BaseModel):
  def __init__(self):
    super().__init__()
    self.client = OpenaiClient
  
  def chat(self):
    self.completion = self.client.chat.completions.create(
      model="gpt-4o",
      messages=self.messages,
    )

    output = self.completion.choices[0].message.content

    return output
  
  def show(self):
    for choice in self.completion.choices:
      print(choice.message.content)
