from .ai import AI

def make(general_context):
  ai = AI()

  prompt = f"""
              Contexto Geral:
              {general_context}
            """
  ai.add_role(type="user", content=prompt)
  prompt = """
            Gere um documento, baseado no modelo abaixo,
            a partir do contexto geral informado
            """
  ai.add_role(type="system", content=prompt)
  ai.add_role_by_file(type="system", path_file="./../../md/prompt/teacher_documentation_scheme.md")

  completion = ai.chat()
  documentation = completion.choices[0].message.content

  return documentation

__all__ = ['make']