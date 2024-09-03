import os
import datetime
import inspect

def read_file(path):
  try:
    # Obter o caminho absoluto do script que está chamando esta função
    caller_frame = inspect.stack()[1]
    caller_module = inspect.getmodule(caller_frame[0])
    caller_path = os.path.abspath(os.path.dirname(caller_module.__file__))

    # Combinar o caminho do chamador com o caminho fornecido
    full_path = os.path.join(caller_path, path)

    # Ler o arquivo
    with open(full_path, 'r', encoding='utf-8') as file:
      conteudo = file.read()
      return conteudo
  except FileNotFoundError:
    print(f"O arquivo {path} não foi encontrado.")
  except IOError:
    print(f"Ocorreu um erro ao ler o arquivo {path}.")

def create_file(content, path):
  # Obter o caminho do módulo que está chamando esta função
  caller_frame = inspect.stack()[1]
  caller_module = inspect.getmodule(caller_frame[0])
  caller_path = os.path.abspath(os.path.dirname(caller_module.__file__))

  # Combinar o caminho do chamador com o caminho fornecido
  full_path = os.path.join(caller_path, path)
    
  # Cria as pastas se elas não existirem
  os.makedirs(os.path.dirname(full_path), exist_ok=True)
    
  # Cria e escreve o conteúdo no arquivo
  with open(full_path, "w") as file:
    file.write(content)

def get_timestamp():
  # Gera um timestamp atual no formato desejado
  timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")

  return timestamp

__all__ = ['read_file', 'create_file', 'get_timestamp']