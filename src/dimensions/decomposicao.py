from typing import Dict, Any

config: Dict[str, Any] = {
  "key": 2,
  "title": "Decomposição",
  "evidences": {
    "4": {
      "title": "O desafio foi dividido em sub-desafios?",
      "clues": {
        "4.1": {
          "title": "Identificação de funções ou métodos separados, verificação se cada um resolve uma parte específica do problema.",
          "detection": "Analisar se o código contém funções/métodos independentes, cada um com um nome que sugere uma responsabilidade específica, alinhada com a divisão do problema em partes menores. ",
          "output": """
            1. Texto: "O aluno utilizou funções para dividir o desafio em sub-desafios." (ou algo do gênero) 

            2. Trechos de Código: Marcar as funções/métodos (informar o quantitativo de funções/métodos, caso exista) específicos que representam sub-desafios. 

            3. Nota: 

              - Não se aplica 

              - Nenhum indício

              - Baixo: Funções existem, mas não estão claramente divididas. 

              - Regular: Funções dividem o problema, mas há sobreposição ou falta de clareza. 

              - Bom: Funções dividem o problema adequadamente. 

              - Ótimo: Funções claramente dividem e solucionam partes específicas do desafio. 
          """,
        },
        "4.2": {
          "title": "Comentários no código que descrevem a lógica de divisão em sub-desafios.",
          "detection": "Procurar comentários no código que expliquem como cada parte do código se relaciona com um sub-desafio específico.",
          "output": """
            1. Texto: "O aluno comentou as divisões de sub-desafios de maneira clara." 

            2. Trechos de Código: Indicar as linhas de comentários que fazem essa explicação. 

            3. Nota: 

              - Não se aplica 

              - Nenhum indício 

              - Baixo: Comentários existem, mas são genéricos. 

              - Regular: Comentários explicam partes, mas de forma superficial.

              - Bom: Comentários explicam a maioria dos sub-desafios. 

              - Ótimo: Comentários detalham claramente cada sub-desafio e sua função. 
          """,
        },
        "4.3": {
          "title": "Estrutura hierárquica do código (ex.: uso de classes, módulos) para organizar os sub-desafios.",
          "detection": "Analisar a estrutura do código, verificando se há uma organização clara em módulos ou classes que representem sub-desafios maiores ou agrupamentos de sub-desafios menores.",
          "output": """
            1. Texto: "O código foi estruturado em módulos/classes que organizam os sub-desafios." 

            2. Trechos de Código: Indicar a estrutura hierárquica no código. 

            3. Nota: 

              - Não se aplica 

              - Nenhum indício 

              - Baixo: Estrutura hierárquica pouco clara. 

              - Regular: Estrutura hierárquica básica e pouco detalhada. 

              - Bom: Estrutura hierárquica clara para a maioria dos sub-desafios. 

              - Ótimo: Estrutura hierárquica detalhada e bem definida. 
          """,
        }
      }
    },
    "5": {
      "title": "Utiliza-se da resolução dos sub-desafios para compor a solução final?",
      "clues": {
        "5.1": {
          "title": "Chamadas a funções/métodos em uma sequência que demonstra a combinação dos sub-desafios.",
          "detection": "Verificar a ordem e lógica das chamadas a funções/métodos no código principal, assegurando que eles são usados para compor a solução final.",
          "output": """
            1. Texto: "O aluno utilizou os sub-desafios para compor a solução final através de chamadas de funções/métodos." 

            2. Trechos de Código: Destacar a sequência de chamadas de funções que compõem a solução final. 

            3. Nota: 

              - Não se aplica 

              - Nenhum indício 

              - Baixo: Chamadas a funções/métodos são desorganizadas. 

              - Regular: Sequência básica de chamadas a funções/métodos. 

              - Bom: Funções/métodos organizados em sequência lógica para compor a solução. 

              - Ótimo: Funções/métodos compõem a solução de forma otimizada e clara. 
          """,
        },
        "5.2": {
          "title": "Integração de resultados de sub-desafios para formar a solução completa.",
          "detection": "Identificar se as saídas de sub-desafios (funções/métodos) são utilizadas e integradas corretamente na solução final.",
          "output": """
            1. Texto: "O aluno integrou corretamente os resultados dos sub-desafios na solução final." 

            2. Trechos de Código: Mostrar onde e como os resultados são integrados. 

            3. Nota: 

              - Não se aplica 

              - Nenhum indício 

              - Baixo: Integração fraca ou inconsistente dos sub-desafios. 

              - Regular: Integração básica com algumas falhas. 

              - Bom: Integração adequada, com boa coesão. 

              - Ótimo: Integração impecável dos sub-desafios na solução final. 
          """,
        },
        "5.3": {
          "title": " Uso de estruturas de controle para coordenar a execução de sub-desafios (ex.: loops, condicionais).",
          "detection": "Verificar se loops, condicionais, ou outras estruturas de controle são utilizadas para coordenar a execução e combinação de sub-desafios.",
          "output": """
            1. Texto: "O aluno utilizou estruturas de controle para coordenar a execução dos sub-desafios." 

            2. Trechos de Código: Indicar as estruturas de controle que realizam essa coordenação. 

            3. Nota: 

              - Não se aplica 

              - Nenhum indício 

              - Baixo: Uso inadequado ou ausência de estruturas de controle. 

              - Regular: Uso básico de estruturas de controle. 

              - Bom: Estruturas de controle utilizadas de forma coerente. 

              - Ótimo: Estruturas de controle otimizadas para coordenar sub-desafios. 
          """,
        },
      }
    }
  }
}