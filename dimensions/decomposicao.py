config = {
  "title": "Decomposição",
  "evidence": {
    "4": {
      "title": "O desafio foi dividido em sub-desafios?",
      "clue": {
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
    }
  }
}