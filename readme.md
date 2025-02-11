# Guia

git clone em "https://github.com/ivanilsonsousa/tcc.git"
```bash
git clone https://github.com/ivanilsonsousa/tcc.git
```

entrar na pasta tcc
```bash
cd tcc
```

instalar as depedências do projeto backend python
```bash
pip install
```

instalar as depedências do projeto web
```bash
cd web/challenge

npm install
```

rodar aplicação frontend (estando no diretório tcc/web/challenge)
```bash
npm run dev
```

rodar aplicação backend (estando no diretório tcc/)
```bash
make dev (caso não pussua o 'make')

tentar

uvicorn src.api:app --reload
```

uvicorn dotenv fastapi pydantic requests openai

pip freeze > requirements.txt