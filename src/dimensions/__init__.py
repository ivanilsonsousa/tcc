from .abstracao import config as abstracao_config
from .decomposicao import config as decomposicao_config
from .reconhecimento_padroes import config as reconhecimento_padroes_config
from .algoritmo import config as algoritmo_config

dimensions = {
  "1": abstracao_config,
  "2": decomposicao_config,
  "3": reconhecimento_padroes_config,
  "4": algoritmo_config,
}