import os
import datetime

def read_file(path_file):
  try:
    with open(path_file, 'r', encoding='utf-8') as file:
      conteudo = file.read()
      return conteudo
  except FileNotFoundError:
    print(f"O arquivo {path_file} não foi encontrado.")
  except IOError:
    print(f"Ocorreu um erro ao ler o arquivo {path_file}.")

def create_file(content, path):
    # Expande o caminho relativo para um caminho absoluto
    absolute_path = os.path.abspath(path)
    
    # Cria as pastas se elas não existirem
    os.makedirs(os.path.dirname(absolute_path), exist_ok=True)
    
    # Cria e escreve o conteúdo no arquivo .md
    with open(absolute_path, "w") as file:
        file.write(content)

def get_timestamp():
  # Gera um timestamp atual no formato desejado
  timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")

  return timestamp

__all__ = ['read_file', 'create_file', 'get_timestamp']