from typing import Dict, Any

config: Dict[str, Any] = {
  "key": "3",
  "title": "Reconhecimento de Padrões",
  "evidences": {
    "6": {
      "title": "Os padrões do desafio foram identificados",
      "clues": {
        "6.1": {
          "title": "O código reutiliza soluções pré-existentes (ex.: funções/métodos genéricos ou padrões conhecidos de design de software).",
          "detection": "Verificar se o aluno reutilizou padrões ou soluções conhecidas para resolver o problema, como funções prontas ou estruturas típicas.",
          "output": """
            1. 1.Texto: "O aluno identificou e reutilizou padrões conhecidos na solução do desafio." (ou algo do gênero) 

            2. Trechos de Código: Marcar os padrões ou funções reutilizadas.

            3. Nota: 

              - Não se aplica
              - Nenhum indício
              - Baixo: Reaproveitamento de padrões é mínimo ou não eficaz.
              - Regular: Reaproveitamento de padrões ocorre de forma superficial.
              - Bom: Padrões são reutilizados de forma adequada.
              - Ótimo: Reaproveitamento de padrões é claro e altamente eficiente.
          """,
        },
        "6.2": {
          "title": "O aluno identificou similaridades entre diferentes partes do código e agrupou essas similaridades para otimizar a solução.",
          "detection": "Verificar se há agrupamento ou generalização de código semelhante em uma única função ou estrutura reutilizável.",
          "output": """
            1. Texto: "O aluno agrupou e otimizou trechos de código similares."

            2. Trechos de Código: Destacar as áreas do código onde a similaridade foi identificada e otimizada.

            3. Nota: 

              - Não se aplica
              - Nenhum indício
              - Baixo: Não houve agrupamento ou otimização de similaridades.
              - Regular: Agrupamento básico de código similar.
              - Bom: Agrupamento e otimização adequados de partes do código.
              - Ótimo: Agrupamento e otimização claros, com ganho significativo na solução.
          """,
        },
      }
    },
    "7": {
      "title": "Houve reaproveitamento de soluções.",
      "clues": {
        "7.1": {
          "title": "O aluno fez uso de trechos de código já desenvolvidos (reaproveitamento de blocos de código).",
          "detection": "Analisar se há reaproveitamento explícito de trechos de código em diferentes partes da solução.",
          "output": """
            1. Texto: "O aluno reaproveitou blocos de código para diferentes partes do desafio."

            2. Trechos de Código: Indicar blocos de código que foram reaproveitados.

            3. Nota: 

              - Não se aplica
              - Nenhum indício
              - Baixo: Blocos de código são repetidos sem adaptação.
              - Regular: Blocos de código são reaproveitados com pequenas adaptações.
              - Bom: Reaproveitamento adequado de blocos de código.
              - Ótimo: Reaproveitamento é eficiente e melhora a solução.
          """,
        },
        "7.2": {
          "title": "O código utiliza funções que resolvem problemas similares em múltiplas situações.",
          "detection": "Verificar se funções foram reutilizadas em diferentes contextos.",
          "output": """
            1. Texto: "O aluno reutilizou funções para resolver problemas similares em várias situações." 

            2. Trechos de Código: Marcar as funções reaproveitadas em diferentes contextos.

            3. Nota: 

              - Não se aplica
              - Nenhum indício
              - Baixo: Funções são reutilizadas, mas sem relevância para o contexto.
              - Regular: Funções são reutilizadas em contextos similares, mas com limitações.
              - Bom: Reaproveitamento funcional é adequado.
              - Ótimo: Reaproveitamento de funções é claro e altamente eficiente.
          """,
        },
      }
    },
    "8": {
      "title": "Houve reaproveitamento de instruções por meio de repetição e condição.",
      "clues": {
        "8.1": {
          "title": "Utilização de loops (for, while) para executar ações repetitivas.",
          "detection": "Analisar o uso correto de estruturas de repetição para evitar duplicação de código.",
          "output": """
            1. Texto: "O aluno utilizou estruturas de repetição para executar ações repetitivas."

            2. Trechos de Código: Marcar os loops que executam ações repetitivas.

            3. Nota: 

              - Não se aplica
              - Nenhum indício
              - Baixo: Uso mínimo de estruturas de repetição.
              - Regular: Estruturas de repetição utilizadas, mas sem otimização.
              - Bom: Uso adequado de estruturas de repetição.
              - Ótimo: Estruturas de repetição otimizadas para evitar duplicação de código.
          """,
        },
        "8.2": {
          "title": "Uso de condicionais (if, else) para evitar duplicação de lógica.",
          "detection": "Verificar o uso correto de estruturas condicionais para tratar múltiplos cenários.",
          "output": """
            1. Texto: "O aluno utilizou estruturas condicionais para evitar duplicação de lógica."

            2. Trechos de Código: Marcar as estruturas condicionais que lidam com múltiplos cenários.

            3. Nota: 

              - Não se aplica
              - Nenhum indício
              - Baixo: Uso inadequado ou mínimo de condicionais.
              - Regular: Uso básico de condicionais sem otimização.
              - Bom: Uso adequado de condicionais.
              - Ótimo: Condicionais são usadas de forma eficiente e otimizada.
          """,
        },
      }
    },
  }
}