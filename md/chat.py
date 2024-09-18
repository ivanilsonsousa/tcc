# -*- coding: utf-8 -*-

import openai
from dotenv import load_dotenv
import os

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()

# Obtém a chave da API a partir das variáveis de ambiente
api_key = os.getenv('OPENAI_API_KEY')

# Configura a chave da API
openai.api_key = api_key

# Define o modelo GPT-4
model = 'gpt-4'

def iniciar_chat():
    # Define o prompt de contexto inicial
    prompt_inicial = "Você é um assistente útil."

    # Define a conversa inicial
    conversa = [
        {"role": "system", "content": prompt_inicial},
    ]

    print("Chat iniciado. Digite 'sair' para encerrar.")
    
    while True:
        # Captura a entrada do usuário
        entrada_usuario = input("Você: ")

        if entrada_usuario.lower() == 'sair':
            print("Chat encerrado.")
            break

        # Adiciona a entrada do usuário à conversa
        conversa.append({"role": "user", "content": entrada_usuario})

        # Gera a resposta do modelo
        resposta = openai.ChatCompletion.create(
            model=model,
            messages=conversa
        )
  
        # Obtém a resposta do modelo
        resposta_texto = resposta['choices'][0]['message']['content']
        
        # Adiciona a resposta do modelo à conversa
        conversa.append({"role": "assistant", "content": resposta_texto})

        # Exibe a resposta do modelo
        print("Assistente: {}".format(resposta_texto))

if __name__ == "__main__":
    iniciar_chat()
