import os
from openai import OpenAI
from dotenv import load_dotenv

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()

# MODEL = 'gpt-3.5-turbo'
MODEL = 'gpt-4o'
API_KEY = os.getenv('OPENAI_API_KEY')

prompt = """
O contéudo se trata de uma verificação para avaliação do pensamento computacional
A idéia é avaliar desafios propostos por professores a alunos
Cada um (aluno e professor) ficará responsável por enviar alguns inputs, como é descrito abaixo

# Aluno
- Código (com comentários pertinentes)

# Professor
- Documento, com uma série de pontos a serem considerados, o formato do documento segue abaixo

> Formado do Documento:

Definição: O documento fornecido pelo professor consite em uma descrição completa do desafio.
Um conjunto de diretrizes, exemplos e informações detalhadas que ajudam na avaliação das evidências que formam o pensamento computacional. 

Componentes:

- Casos de Uso: Exemplos de situações práticas onde o desafio pode ser aplicado, descrição das funcionalidades esperadas, cenários de uso detalhados. 

- Lista de Requisitos do Desafio: Requisitos essenciais que os alunos devem considerar ao resolver o problema. 

- Exemplos de Entrada e Saída Esperados: Exemplos específicos de dados de entrada e os resultados esperados para esses dados. 

- Sequência de Passos Esperada para a Solução: Uma sequência lógica de passos que a solução deve seguir para resolver o problema. 

- Nível de Detalhamento Esperado para as Instruções: Orientações sobre o nível de detalhamento esperado nas instruções do código. 

- Critérios de Completude: Diretrizes sobre o que constitui uma solução completa, incluindo todas as partes necessárias do desafio. 

- Exemplos de Uso Correto de Estruturas de Condição e Repetição: Exemplos de como utilizar corretamente estruturas como loops (for, while) e condicionais (if-else). 

- Exemplos de Controle de Repetições e Condições: Exemplos de estratégias para controlar a execução de loops e condições de forma eficiente. 

# Contextualização

Dentro de cada dimensão serão analisados "Evidências", e dentro de cada
"Evidência" serão analisados "Indícios".

Estrutura
  Dimensão > Evidência > Indício
"""

messages=[
  {"role": "system", "content": prompt},
]

client = OpenAI(
  api_key=API_KEY
)

__all__ = ['client', 'messages', 'MODEL']