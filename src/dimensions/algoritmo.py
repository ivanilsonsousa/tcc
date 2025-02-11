from typing import Dict, Any

config: Dict[str, Any] = {
  "key": "4",
  "title": "Algoritmo",
  "evidences": {
    "9": {
      "title": "A solução fornece uma sequência de instruções para resolver o desafio.",
      "clues": {
        "9.1": {
          "title": "O código apresenta uma sequência lógica de instruções para resolver o problema.",
          "detection": "Verificar se o código segue uma ordem coerente de passos, desde a entrada de dados até a solução final.",
          "output": """
            1.Texto: "O aluno forneceu uma sequência lógica de instruções para resolver o desafio."
            
            2.Trechos de Código: Marcar as partes do código que demonstram a sequência de passos lógica.
            
            3.Nota:

              - Não se aplica
              - Nenhum indício
              - Baixo: A sequência de instruções está desorganizada ou incoerente.
              - Regular: A sequência de instruções é básica, mas contém alguns erros lógicos.
              - Bom: A sequência de instruções está correta, com poucos desvios lógicos.
              - Ótimo: A sequência de instruções é completamente lógica e bem estruturada.
          """
        },
        "9.2": {
          "title": "O algoritmo cobre todas as etapas do problema, desde a inicialização até a finalização.",
          "detection": "Verificar se o código contempla todas as etapas necessárias para resolver o desafio.",
          "output": """
            1.Texto: "O aluno forneceu um algoritmo que cobre todas as etapas do problema."

            2.Trechos de Código: Marcar as partes do código que representam o início, meio e fim da solução.
            
            3.Nota:

              - Não se aplica
              - Nenhum indício
              - Baixo: Algumas etapas essenciais não estão contempladas no algoritmo.
              - Regular: A maioria das etapas é coberta, mas há omissões.
              - Bom: Todas as etapas necessárias estão contempladas de forma adequada.
              - Ótimo: Todas as etapas são cobertas de forma clara e eficiente.
          """
        }
      }
    },
    "10": {
      "title": "As instruções estão detalhadas.",
      "clues": {
        "10.1": {
          "title": "O aluno detalhou as instruções no código por meio de comentários e explicações.",
          "detection": "Verificar se há comentários no código que expliquem claramente o que cada trecho de código faz.",
          "output": """
            1.Texto: "O aluno detalhou as instruções através de comentários no código."

            2.Trechos de Código: Marcar os comentários que fornecem explicações detalhadas.
            
            3.Nota:
            
              - Não se aplica
              - Nenhum indício
              - Baixo: Comentários ausentes ou superficiais.
              - Regular: Comentários fornecem explicações básicas, mas incompletas.
              - Bom: A maioria das instruções é bem explicada com comentários.
              - Ótimo: As instruções são detalhadas com comentários completos e esclarecedores.
          """
        },
        "10.2": {
          "title": "O código contém instruções detalhadas que permitem entender claramente cada passo da solução.",
          "detection": "Verificar se as instruções no código são claras e detalhadas, facilitando a compreensão do processo.",
          "output": """
            1.Texto: "O aluno forneceu instruções detalhadas que facilitam o entendimento do código."
            
            2.Trechos de Código: Marcar as partes do código que contêm as instruções detalhadas.
            
            3.Nota:
              
              - Não se aplica
              - Nenhum indício
              - Baixo: As instruções estão incompletas ou pouco detalhadas.
              - Regular: As instruções são compreensíveis, mas com detalhes limitados.
              - Bom: As instruções são claras e detalhadas o suficiente para entender a solução.
              - Ótimo: As instruções são completamente detalhadas e facilitam a compreensão de todos os passos da solução.
          """
        }
      }
    },
    "11": {
      "title": "A solução está completa.",
      "clues": {
        "11.1": {
          "title": "O código resolve todos os requisitos e funcionalidades descritos no desafio.",
          "detection": "Verificar se o código aborda todos os requisitos especificados no problema.",
          "output": """
            1.Texto: "O aluno implementou uma solução que resolve todos os requisitos do desafio."
            
            2.Trechos de Código: Marcar as partes do código que correspondem a cada requisito.
            
            3.Nota:
              - Não se aplica
              - Nenhum indício
              - Baixo: A solução está incompleta e não atende aos principais requisitos.
              - Regular: A solução atende aos requisitos principais, mas falta a resolução de alguns aspectos.
              - Bom: A solução cobre a maioria dos requisitos do desafio.
              - Ótimo: A solução atende a todos os requisitos de maneira clara e eficiente.
          """
        },
        "11.2": {
          "title": "O código lida com todas as possíveis entradas e cenários previstos no desafio.",
          "detection": "Verificar se a solução lida adequadamente com todos os tipos de entrada, incluindo cenários normais e excepcionais.",
          "output": """
            1.Texto: "O aluno implementou uma solução completa que lida com todos os cenários previstos."
            
            2.Trechos de Código: Marcar as partes do código que tratam entradas variadas ou exceções.
            
            3.Nota:
              
              - Não se aplica
              - Nenhum indício
              - Baixo: A solução não lida adequadamente com diferentes entradas ou cenários.
              - Regular: A solução trata os cenários principais, mas com falhas em cenários atípicos.
              - Bom: A solução lida com a maioria dos cenários de forma adequada.
              - Ótimo: A solução lida de maneira completa e eficaz com todos os cenários possíveis.
          """
        }
      }
    },
    "12": {
      "title": "Reconhece a diferença entre as estruturas de condição e repetição.",
      "clues": {
        "12.1": {
          "title": "O código utiliza corretamente estruturas de condição (if, else) e repetição (loops) de forma diferenciada.",
          "detection": "Verificar se o aluno aplicou corretamente estruturas de condição para decisões e estruturas de repetição para ações repetitivas.",
          "output": """
            1.Texto: "O aluno reconheceu a diferença entre estruturas de condição e repetição e as aplicou corretamente."
            
            2.Trechos de Código: Marcar os trechos que usam corretamente condicionais e loops.
            
            3.Nota:
              
              - Não se aplica
              - Nenhum indício
              - Baixo: Uso inadequado ou confuso de estruturas de condição e repetição.
              - Regular: Uso correto, mas limitado, de condicionais e loops.
              - Bom: Estruturas de condição e repetição são aplicadas de forma adequada.
              - Ótimo: Condicionais e loops são usados de forma clara, precisa e eficiente.
          """
        },
        "12.2": {
          "title": "O aluno diferenciou corretamente entre quando usar uma estrutura condicional e quando usar uma estrutura de repetição.",
          "detection": "Analisar se o código demonstra uma compreensão clara de quando é apropriado usar condicionais ou loops.",
          "output": """
            1.Texto: "O aluno diferenciou corretamente entre o uso de estruturas condicionais e de repetição."
            
            2.Trechos de Código: Marcar as áreas que demonstram o uso apropriado de cada estrutura.
            
            3.Nota:
              
              - Não se aplica
              - Nenhum indício
              - Baixo: As estruturas de condição e repetição são usadas de forma intercambiável e inadequada.
              - Regular: A distinção entre condicionais e loops está presente, mas com limitações.
              - Bom: A distinção entre o uso de condicionais e loops é clara.
              - Ótimo: A distinção é aplicada de maneira excelente e eficiente, sem confusões.
          """
        }
      }
    },
    "13": {
      "title": "Controla as repetições e condições.",
      "clues": {
        "13.1": {
          "title": "O aluno utilizou adequadamente estruturas de repetição (loops) com condições de saída (break, continue, etc.).",
          "detection": "Verificar se o aluno controla corretamente a execução de loops utilizando condições de parada ou iteração controlada.",
          "output": """
            1.Texto: "O aluno controlou adequadamente as repetições utilizando condições de saída ou iteração controlada."
            
            2.Trechos de Código: Marcar os loops que demonstram controle correto de repetições.
            
            3.Nota:
              
              - Não se aplica
              - Nenhum indício
              - Baixo: Controle inadequado ou inexistente das repetições.
              - Regular: Controle básico de repetições, mas com falhas.
              - Bom: Controle adequado e lógico das repetições.
              - Ótimo: Controle de repetições otimizado e eficiente.
          """
        },
        "13.2": {
          "title": "O código utiliza corretamente estruturas condicionais para controlar fluxos alternativos no algoritmo.",
          "detection": "Verificar se o código faz uso eficiente de condicionais para decidir o fluxo de execução baseado em diferentes condições.",
          "output": """
            1.Texto: "O aluno utilizou condicionais para controlar o fluxo de execução de maneira eficiente."
            
            2.Trechos de Código: Marcar as áreas onde as estruturas condicionais controlam o fluxo do algoritmo.
            
            3.Nota:
              
              - Não se aplica
              - Nenhum indício
              - Baixo: Uso inadequado ou excessivo de estruturas condicionais.
              - Regular: Uso básico de condicionais, mas com limitações.
              - Bom: Condicionais controlam o fluxo de forma adequada.
              - Ótimo: Condicionais são usadas de maneira clara e eficiente para controlar o fluxo de execução.
          """
        }
      }
    }
  }
}
