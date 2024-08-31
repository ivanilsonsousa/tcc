> Aluno

# Código

```python
# Função para calcular a média de uma lista de números
def calcular_media(notas):
    """
    Calcula a média de uma lista de números.

    :param notas: Lista de números (notas de um estudante)
    :return: Média das notas
    """
    # Garantir que a lista não está vazia para evitar divisão por zero
    if not notas:
        return 0
    # Somar todas as notas e dividir pelo número de notas
    return sum(notas) / len(notas)

# Função para calcular a média geral de uma turma
def calcular_media_geral(turma):
    """
    Calcula a média geral de uma turma de estudantes.

    :param turma: Lista de listas de números (notas de cada estudante)
    :return: Média geral das notas de todos os estudantes
    """
    # Lista para armazenar as médias individuais dos estudantes
    medias_individuais = []
    # Iterar sobre cada lista de notas de estudante
    for notas in turma:
        # Calcular a média das notas do estudante e adicionar à lista de médias individuais
        medias_individuais.append(calcular_media(notas))
    # Calcular e retornar a média das médias individuais
    return calcular_media(medias_individuais)

# Teste das funções com dados de exemplo
turma_exemplo = [
    [75, 80, 92],
    [88, 76, 85],
    [90, 85, 85],
    [70, 75, 80]
]

media_geral = calcular_media_geral(turma_exemplo)
print(f"A média geral da turma é: {media_geral:.2f}")
```

# Descrição do Desafio
Título: Cálculo da Média Geral de Notas

Objetivo: Implementar uma solução em Python para calcular a média geral das notas de uma turma de estudantes, utilizando o conceito de abstração.

Contexto: A média de notas é uma métrica importante em ambientes educacionais, pois oferece uma visão do desempenho geral da turma. Este exercício visa treinar a habilidade de abstração ao criar funções que possam ser reutilizadas e que separem a lógica de diferentes níveis de cálculo.

Requisitos:

- Implementar uma função que calcule a média de uma lista de números.
- Implementar uma função que utilize a função de média para calcular a média geral de uma turma, dada uma lista de listas de notas.
- Comentar o código explicando as escolhas e estratégias adotadas.

> Professor

- Contexto do Problema
  O problema que será abordado é o de calcular a média de notas de uma turma de estudantes. Cada estudante tem uma lista de notas, e o objetivo é encontrar a média de todas as notas para fornecer uma visão geral do desempenho da turma. Este tipo de problema é comum em sistemas de gestão escolar e é importante para fornecer métricas de desempenho de forma agregada.