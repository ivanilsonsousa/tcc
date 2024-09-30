import requests

class OllamaClient:
  def __init__(self, base_url='http://localhost:11434'):
    self.base_url = base_url

  def chat(self, model, messages) -> str:
    url = f"{self.base_url}/api/chat"

    payload = {
      "model": model,
      "stream": False,
      "messages": messages,
      # "messages": [
      #   { "role": "user", "content": "Me conte uma piada brasileira famosa, uma curta" }
      # ],
    }

    try:
      response = requests.post(url, json=payload)
      response.raise_for_status()

      data = response.json()

      return data
    except requests.exceptions.RequestException as e:
      raise Exception(f"Erro na solicitação: {e}")
