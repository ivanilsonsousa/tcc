import { Dimension } from "@/pages/output/interfaces";

export const mockData: Dimension[] = [
  {
    key: "2",
    title: "Decomposição",
    evidences: [
      {
        key: "4",
        title: "O desafio foi dividido em sub-desafios?",
        clues: [
          {
            key: "4.1",
            title:
              "Identificação de funções ou métodos separados, verificação se cada um resolve uma parte específica do problema.",
            output:
              '1. Texto: O aluno utilizou funções para dividir o desafio em sub-desafios.\n\n2. Trechos de Código:\n\n```python\n# Função para calcular a média de uma lista de números\ndef calcular_media(notas):\n    """\n    Calcula a média de uma lista de números.\n\n    :param notas: Lista de números (notas de um estudante)\n    :return: Média das notas\n    """\n    # Garantir que a lista não está vazia para evitar divisão por zero\n    if not notas:\n        return 0\n    # Somar todas as notas e dividir pelo número de notas\n    return sum(notas) / len(notas)\n```\n\n```python\n# Função para calcular a média geral de uma turma\ndef calcular_media_geral(turma):\n    """\n    Calcula a média geral de uma turma de estudantes.\n\n    :param turma: Lista de listas de números (notas de cada estudante)\n    :return: Média geral das notas de todos os estudantes\n    """\n    # Lista para armazenar as médias individuais dos estudantes\n    medias_individuais = []\n    # Iterar sobre cada lista de notas de estudante\n    for notas in turma:\n        # Calcular a média das notas do estudante e adicionar à lista de médias individuais\n        medias_individuais.append(calcular_media(notas))\n    # Calcular e retornar a média das médias individuais\n    return calcular_media(medias_individuais)\n```\n\n3. Nota: Bom\n\nAs duas funções presentes no código (calcular_media e calcular_media_geral) dividem adequadamente o problema em sub-desafios. Cada função resolve uma parte específica do problema: a primeira função calcula a média de uma lista de notas, e a segunda utiliza essa função para calcular a média geral de uma turma com múltiplas listas de notas.',
          },
          {
            key: "4.2",
            title:
              "Comentários no código que descrevem a lógica de divisão em sub-desafios.",
            output:
              '1. Texto: "O aluno comentou as divisões de sub-desafios de maneira clara."\n\n2. Trechos de Código:\n   ```python\n   # Função para calcular a média de uma lista de números\n   def calcular_media(notas):\n       """\n       Calcula a média de uma lista de números.\n\n       :param notas: Lista de números (notas de um estudante)\n       :return: Média das notas\n       """\n       # Garantir que a lista não está vazia para evitar divisão por zero\n       if not notas:\n           return 0\n       # Somar todas as notas e dividir pelo número de notas\n       return sum(notas) / len(notas)\n\n   # Função para calcular a média geral de uma turma\n   def calcular_media_geral(turma):\n       """\n       Calcula a média geral de uma turma de estudantes.\n\n       :param turma: Lista de listas de números (notas de cada estudante)\n       :return: Média geral das notas de todos os estudantes\n       """\n       # Lista para armazenar as médias individuais dos estudantes\n       medias_individuais = []\n       # Iterar sobre cada lista de notas de estudante\n       for notas in turma:\n           # Calcular a média das notas do estudante e adicionar à lista de médias individuais\n           medias_individuais.append(calcular_media(notas))\n       # Calcular e retornar a média das médias individuais\n       return calcular_media(medias_individuais)\n\n   # Teste das funções com dados de exemplo\n   turma_exemplo = [\n       [75, 80, 92],\n       [88, 76, 85],\n       [90, 85, 85],\n       [70, 75, 80]\n   ]\n\n   media_geral = calcular_media_geral(turma_exemplo)\n   print(f"A média geral da turma é: {media_geral:.2f}")\n   ```\n\n3. Nota:\n   - Bom: Comentários explicam a maioria dos sub-desafios.',
          },
          {
            key: "4.3",
            title:
              "Estrutura hierárquica do código (ex.: uso de classes, módulos) para organizar os sub-desafios.",
            output:
              '1. Texto: "O código não foi estruturado em módulos/classes para organizar os sub-desafios."\n\n2. Trechos de Código: Não se aplica, pois não há estrutura hierárquica no código fornecido.\n\n3. Nota: \n  - Nenhum indício',
          },
        ],
      },
      {
        key: "5",
        title:
          "Utiliza-se da resolução dos sub-desafios para compor a solução final?",
        clues: [
          {
            key: "5.1",
            title:
              "Chamadas a funções/métodos em uma sequência que demonstra a combinação dos sub-desafios.",
            output:
              '1. Texto:\n"O aluno utilizou os sub-desafios para compor a solução final através de chamadas de funções/métodos."\n\n2. Trechos de Código:\n\n```python\n# Teste das funções com dados de exemplo\nturma_exemplo = [\n    [75, 80, 92],\n    [88, 76, 85],\n    [90, 85, 85],\n    [70, 75, 80]\n]\n\n# Chamando a função calcular_media_geral, que por sua vez chama calcular_media\nmedia_geral = calcular_media_geral(turma_exemplo)\nprint(f"A média geral da turma é: {media_geral:.2f}")\n```\n\n3. Nota:\n- Ótimo: Funções/métodos compõem a solução de forma otimizada e clara.',
          },
          {
            key: "5.2",
            title:
              "Integração de resultados de sub-desafios para formar a solução completa.",
            output:
              '1. Texto: "O aluno utilizou os sub-desafios para compor a solução final através de chamadas de funções/métodos."\n\n2. Trechos de Código:\n\n```python\n# Chamadas de funções para compor a solução final\nmedia_geral = calcular_media_geral(turma_exemplo)\nprint(f"A média geral da turma é: {media_geral:.2f}")\n```\n\n3. Nota: \n\n- Regular: Sequência básica de chamadas a funções/métodos. ',
          },
          {
            key: "5.3",
            title:
              " Uso de estruturas de controle para coordenar a execução de sub-desafios (ex.: loops, condicionais).",
            output:
              '### Evidência: Utiliza-se da resolução dos sub-desafios para compor a solução final?\n\n#### Indício 5.3: Uso de estruturas de controle para coordenar a execução de sub-desafios (ex.: loops, condicionais)\n\n1. **Texto:** O aluno utilizou estruturas de controle para coordenar a execução dos sub-desafios.\n\n2. **Trechos de Código:**\n\n```python\n# Função para calcular a média de uma lista de números\ndef calcular_media(notas):\n    """\n    Calcula a média de uma lista de números.\n\n    :param notas: Lista de números (notas de um estudante)\n    :return: Média das notas\n    """\n    # Garantir que a lista não está vazia para evitar divisão por zero\n    if not notas:\n        return 0\n    # Somar todas as notas e dividir pelo número de notas\n    return sum(notas) / len(notas)\n\n# Função para calcular a média geral de uma turma\ndef calcular_media_geral(turma):\n    """\n    Calcula a média geral de uma turma de estudantes.\n\n    :param turma: Lista de listas de números (notas de cada estudante)\n    :return: Média geral das notas de todos os estudantes\n    """\n    # Lista para armazenar as médias individuais dos estudantes\n    medias_individuais = []\n    # Iterar sobre cada lista de notas de estudante\n    for notas in turma:\n        # Calcular a média das notas do estudante e adicionar à lista de médias individuais\n        medias_individuais.append(calcular_media(notas))\n    # Calcular e retornar a média das médias individuais\n    return calcular_media(medias_individuais)\n\n# Teste das funções com dados de exemplo\nturma_exemplo = [\n    [75, 80, 92],\n    [88, 76, 85],\n    [90, 85, 85],\n    [70, 75, 80]\n]\n\nmedia_geral = calcular_media_geral(turma_exemplo)\nprint(f"A média geral da turma é: {media_geral:.2f}")\n```\n\nNo trecho de código, observa-se o uso de loops (`for`) e condicionais (`if`) para coordenar a execução dos sub-desafios:\n- O loop `for` na função `calcular_media_geral` itera sobre cada lista de notas de estudante para calcular a média individual e acumulá-las.\n- A condicional `if not notas:` na função `calcular_media` evita a divisão por zero ao conferir se a lista de notas não está vazia antes de realizar os cálculos.\n\n3. **Nota:**\n   - Ótimo: Estruturas de controle otimizadas para coordenar sub-desafios.',
          },
        ],
      },
    ],
  },
];
