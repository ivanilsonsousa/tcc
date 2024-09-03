from fastapi import FastAPI
from .routers import router

app = FastAPI()

# Rota principal
@app.get("/")
def read_root():
  return {"message": "Bem-vindo à API FastAPI!"} 

app.include_router(router)

if __name__ == "__main__":
  import uvicorn
  uvicorn.run(app, host="127.0.0.1", port=8000)
