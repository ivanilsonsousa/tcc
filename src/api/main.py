from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from .routers import router

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_methods=["*"],
  allow_headers=["*"],
  allow_credentials=True,
)

# Rota principal
@app.get("/")
def read_root():
  return {"message": "Bem-vindo à API", "status": "ok"}

app.include_router(router)

if __name__ == "__main__":
  import uvicorn
  uvicorn.run(app, host="localhost", port=8000)
