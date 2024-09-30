import os
import datetime
import inspect

def get_absolute_path(relative_path):
  # Obter o frame do chamador
  caller_frame = inspect.stack()[1]
  # Obter o módulo do chamador
  caller_module = inspect.getmodule(caller_frame[0])
  # Diretório do chamador
  base_dir = os.path.dirname(os.path.abspath(caller_module.__file__))
  # Caminho absoluto
  absolute_path = os.path.join(base_dir, relative_path)

  return absolute_path

def read_file(file_path):
  try:
    with open(file_path, 'r', encoding='utf-8') as file:
      content = file.read()
      return content
  except FileNotFoundError:
    print(f"O arquivo {file_path} não foi encontrado.")
  except IOError:
    print(f"Ocorreu um erro ao ler o arquivo {file_path}.")


def save_md_file(content, path):
  timestamp = get_timestamp()
  filename = f"arquivo_{timestamp}.md"
  path_final = f"{path}/{filename}"

  create_file(content=content, path=path_final)


def create_file(content, path):
  try:
    # Cria as pastas se elas não existirem
    os.makedirs(os.path.dirname(path), exist_ok=True)

    # Cria e escreve o conteúdo no arquivo
    with open(path, "w", encoding='utf-8') as file:
      file.write(content)
  except PermissionError:
    print(f"Permissão negada para escrever no arquivo {path}.")
  except OSError as e:
    print(f"Erro ao criar diretórios ou manipular o arquivo: {e}")
  except IOError as e:
    print(f"Ocorreu um erro de E/S ao escrever no arquivo {path}: {e}")
  except Exception as e:
    print(f"Ocorreu um erro inesperado: {e}")

def get_timestamp():
  # Gera um timestamp atual no formato desejado
  timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")

  return timestamp

__all__ = ['read_file', 'create_file', 'get_absolute_path', 'get_timestamp']