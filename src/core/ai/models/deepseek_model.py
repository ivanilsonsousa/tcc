from .base_model import BaseModel
from ..clients.deepseek import DeepSeekClient

class DeepSeekModel(BaseModel):
  def __init__(self):
    super().__init__()
    self.client = DeepSeekClient
  
  def chat(self):
    self.completion = self.client.chat.completions.create(
      model="deepseek-chat",
      messages=self.messages,
      stream=False
    )

    output = self.completion.choices[0].message.content

    return output
  
  def show(self):
    for choice in self.completion.choices:
      print(choice.message.content)
