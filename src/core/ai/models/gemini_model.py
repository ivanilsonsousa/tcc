from .base_model import BaseModel
from ..clients.gemini import GeminiClient

class GeminiModel(BaseModel):
  def __init__(self):
    super().__init__()
    self.client = GeminiClient
  
  def chat(self):
    self.completion = self.client.models.generate_content(
      model="gemini-2.0-flash",
      contents=self.messages_as_text(),
    )

    output = self.completion.text

    return output
  
  def show(self):
    print(self.completion.text)

