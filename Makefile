dev:
	uvicorn src.api:app --reload

start:
	uvicorn src.api:app --host 0.0.0.0 --port 8000

# usar o start dentro do container, ativar o venv...
