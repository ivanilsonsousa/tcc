from typing import Dict, Any

config: Dict[str, Any] = {
  "key": "1",
  "title": "Abstração",
  "evidences": {
    "1": {
      "title": "A solução apresenta a contextualização do desafio.",
      "clues": {
        "1.1": {
          "title": "O aluno forneceu uma introdução clara e completa ao problema no código ou nos comentários.",
          "detection": "Verificar se há uma explicação inicial, seja no cabeçalho do código ou em comentários, que contextualiza o desafio e explica sua importância.",
          "output": """
            1. Texto: "O aluno apresentou uma contextualização clara do desafio." (ou algo do gênero) 

            2. Trechos de Código: Marcar o comentário ou seção que fornece a contextualização. 

            3. Nota: 

              - Não se aplica 
              - Nenhum indício
              - Baixo: Contextualização mínima ou inexistente.
              - Regular: A contextualização é vaga ou incompleta. 
              - Bom: A contextualização é clara e cobre a maior parte do desafio.
              - Ótimo: A contextualização é completa e explica totalmente o propósito e a importância do desafio.
          """,
        },
        "1.2": {
          "title": "O aluno relacionou a solução ao contexto real ou a cenários práticos.",
          "detection": "Analisar se o aluno conectou a solução com problemas ou aplicações reais, seja no código ou em explicações.",
          "output": """
            1. Texto: "O aluno relacionou a solução com cenários práticos do mundo real." 

            2. Trechos de Código: Marcar os trechos de código ou comentários que fazem essa conexão. 

            3. Nota: 

              - Não se aplica 
              - Nenhum indício 
              - Baixo: Pouca ou nenhuma relação com o contexto real.
              - Regular: Relação básica com cenários práticos.
              - Bom: Conexão clara com o contexto real. 
              - Ótimo: Relação detalhada e bem fundamentada com o contexto prático. 
          """,
        },
      }
    },
    "2": {
      "title": "Foram identificados os requisitos essenciais para a solução.",
      "clues": {
        "2.1": {
          "title": "O aluno mencionou os requisitos essenciais no código ou nos comentários.",
          "detection": "Verificar se o aluno identificou e descreveu claramente os requisitos essenciais do desafio, incluindo as funcionalidades esperadas.",
          "output": """
            1. Texto: "O aluno identificou e descreveu os requisitos essenciais da solução". 

            2. Trechos de Código: Marcar os comentários ou trechos onde os requisitos estão descritos. 

            3. Nota: 

              - Não se aplica 
              - Nenhum indício 
              - Baixo: Requisitos essenciais não foram descritos ou estão incompletos.
              - Regular: Requisitos essenciais são mencionados, mas de forma superficial.
              - Bom: A maioria dos requisitos essenciais é identificada. 
              - Ótimo: Todos os requisitos essenciais são identificados e descritos de maneira clara.
          """,
        },
        "2.2": {
          "title": "O código implementa diretamente os requisitos essenciais mencionados.",
          "detection": "Verificar se os requisitos mencionados são implementados corretamente na solução.",
          "output": """
            1. Texto: "O aluno implementou os requisitos essenciais identificados na solução." 

            2. Trechos de Código: Marcar as partes do código que implementam esses requisitos.

            3. Nota: 

              - Não se aplica 
              - Nenhum indício 
              - Baixo: Implementação dos requisitos está incompleta ou incorreta. 
              - Regular: Implementação básica dos requisitos, mas com algumas falhas.
              - Bom: Requisitos são implementados de forma adequada.
              - Ótimo: Requisitos são implementados de forma otimizada e eficiente.
          """,
        },
        "2.3": {
          "title": "O aluno priorizou corretamente os requisitos mais importantes.",
          "detection": "Analisar se o código ou os comentários indicam uma priorização clara dos requisitos mais importantes para a solução.",
          "output": """
            1. Texto: "O aluno priorizou corretamente os requisitos mais importantes." 

            2. Trechos de Código: Marcar as áreas onde os requisitos mais importantes são implementados ou destacados. 

            3. Nota: 

              - Não se aplica 
              - Nenhum indício
              - Baixo: Prioridades não foram identificadas ou implementadas corretamente. 
              - Regular: Algumas prioridades são identificadas, mas há falhas. 
              - Bom: Prioridades são corretamente identificadas e implementadas. 
              - Ótimo: As prioridades são claras, bem fundamentadas e implementadas de forma eficiente. 
          """,
        },
      }
    },
    "3": {
      "title": "Foi atingido o resultado esperado pelo desafio.",
      "clues": {
        "3.1": {
          "title": "A solução gera a saída correta para os casos de teste fornecidos no desafio.",
          "detection": "Verificar se a solução gera as saídas corretas de acordo com os exemplos de entrada e saída fornecidos no desafio.",
          "output": """
            1. Texto: "O aluno atingiu o resultado esperado nos casos de teste fornecidos.". 

            2. Trechos de Código: Marcar as seções que produzem os resultados corretos. 

            3. Nota: 

              - Não se aplica 
              - Nenhum indício 
              - Baixo: A solução não produz os resultados esperados.
              - Regular: A solução produz resultados corretos para alguns casos de teste, mas falha em outros.
              - Bom: A solução produz resultados corretos para a maioria dos casos de teste.
              - Ótimo: A solução gera consistentemente os resultados corretos para todos os casos de teste.
          """,
        },
        "3.2": {
          "title": "A solução lida adequadamente com cenários de borda ou casos excepcionais.",
          "detection": "Verificar se o código trata corretamente casos especiais, como entradas inesperadas ou limites do problema.",
          "output": """
            1. Texto: "O aluno lidou adequadamente com cenários de borda e casos excepcionais." 

            2. Trechos de Código: Marcar as seções onde são tratados cenários de borda ou exceções.

            3. Nota: 

              - Não se aplica 
              - Nenhum indício 
              - Baixo: A solução não lida com cenários de borda ou falha em lidar com exceções.
              - Regular: A solução trata alguns cenários de borda, mas de forma limitada.
              - Bom: A solução lida adequadamente com a maioria dos cenários de borda.
              - Ótimo: A solução trata de forma completa e eficiente todos os cenários de borda e exceções.
          """,
        },
        "3.3": {
          "title": "A solução foi otimizada para desempenho e eficiência.",
          "detection": "Verificar se o código foi otimizado para eficiência em termos de tempo de execução e uso de recursos.",
          "output": """
            1. Texto: "O aluno otimizou a solução para desempenho e eficiência." 

            2. Trechos de Código: Marcar as partes do código que foram otimizadas ou que demonstram eficiência.

            3. Nota: 

              - Não se aplica 
              - Nenhum indício
              - Baixo: A solução é ineficiente ou possui problemas de desempenho.
              - Regular: A solução é funcional, mas apresenta problemas de desempenho em alguns casos.
              - Bom: A solução é otimizada para a maioria dos cenários.
              - Ótimo: A solução é altamente eficiente, tanto em termos de tempo de execução quanto no uso de recursos.
          """,
        },
      }
    },
  }
}