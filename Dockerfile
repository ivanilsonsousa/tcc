FROM ubuntu:22.04
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copia todos os arquivos do diretório atual para /app no contêiner
# COPY . /app

# Mantém o contêiner rodando indefinidamente
CMD ["tail", "-f", "/dev/null"]
