import os
import uvicorn
from dotenv import load_dotenv

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()

from .main import app

if __name__ == "__main__":
  API_URL: str = os.getenv('API_URL', 'localhost')
  API_PORT: int = int(os.getenv('API_PORT', '8000'))

  uvicorn.run(app, host=API_URL, port=API_PORT)