FROM ubuntu:22.04
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y python3 python3-pip python3-venv && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copia todos os arquivos do diretório atual para /app no contêiner
# COPY . /app

# Mantém o contêiner rodando indefinidamente
CMD ["tail", "-f", "/dev/null"]

# configiguração

# docker build -t meu-python-dev .

# docker run -d --name meu-container-python -v "$(pwd)":/app -p 8000:8000 meu-python-dev

# docker exec -it meu-container-python bash

# python3 -m venv .venv

# source .venv/bin/activate

# pip install -r requirements.txt 

# pip install pip-autoremove
