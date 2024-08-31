> Aluno

# Código

```python
def imc(p, a):
  return p / (a * a)

peso = 70
altura = 1.75
resultado = imc(peso, altura)
print("Seu IMC é:", resultado)
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