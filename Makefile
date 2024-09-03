run:
	/bin/python3.9 -m src.api.main

dev:
	uvicorn src.api.main:app --reload