from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers.challenge_router import router

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
