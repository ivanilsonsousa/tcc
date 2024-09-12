from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import router

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

# Rota principal
@app.get("/")
def read_root():
  return {"message": "Bem-vindo à API FastAPI!"}

app.include_router(router)

if __name__ == "__main__":
  import uvicorn
  uvicorn.run(app, host="localhost", port=8000)
