# Código do Aluno

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