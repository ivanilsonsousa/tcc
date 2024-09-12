import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox"; // Checkbox do ShadCN UI

interface Clue {
  title: string;
  detection: string;
}

interface Evidence {
  title: string;
  clues: {
    [key: string]: Clue;
  };
}

interface Dimension {
  key: number;
  title: string;
  evidences: {
    [key: string]: Evidence;
  };
}

interface TransformResult {
  dimensions: {
    [key: string]: Dimension;
  };
}

// Dados estruturados conforme o exemplo fornecido
const data: TransformResult = {
  dimensions: {
    "2": {
      key: 2,
      title: "Decomposição",
      evidences: {
        "4": {
          title: "O desafio foi dividido em sub-desafios?",
          clues: {
            "4.1": {
              title:
                "Identificação de funções ou métodos separados, verificação se cada um resolve uma parte específica do problema.",
              detection:
                "Analisar se o código contém funções/métodos independentes, cada um com um nome que sugere uma responsabilidade específica, alinhada com a divisão do problema em partes menores.",
            },
            "4.2": {
              title:
                "Comentários no código que descrevem a lógica de divisão em sub-desafios.",
              detection:
                "Procurar comentários no código que expliquem como cada parte do código se relaciona com um sub-desafio específico.",
            },
            "4.3": {
              title:
                "Estrutura hierárquica do código (ex.: uso de classes, módulos) para organizar os sub-desafios.",
              detection:
                "Analisar a estrutura do código, verificando se há uma organização clara em módulos ou classes que representem sub-desafios maiores ou agrupamentos de sub-desafios menores.",
            },
          },
        },
        "5": {
          title:
            "Utiliza-se da resolução dos sub-desafios para compor a solução final?",
          clues: {
            "5.1": {
              title:
                "Chamadas a funções/métodos em uma sequência que demonstra a combinação dos sub-desafios.",
              detection:
                "Verificar a ordem e lógica das chamadas a funções/métodos no código principal, assegurando que eles são usados para compor a solução final.",
            },
            "5.2": {
              title:
                "Integração de resultados de sub-desafios para formar a solução completa.",
              detection:
                "Identificar se as saídas de sub-desafios (funções/métodos) são utilizadas e integradas corretamente na solução final.",
            },
            "5.3": {
              title:
                " Uso de estruturas de controle para coordenar a execução de sub-desafios (ex.: loops, condicionais).",
              detection:
                "Verificar se loops, condicionais, ou outras estruturas de controle são utilizadas para coordenar a execução e combinação de sub-desafios.",
            },
          },
        },
      },
    },
  },
};

const transformStructure = (data: {
  [key: string]: boolean;
}): TransformResult => {
  const dimensions: { [key: number]: Evidence[] } = {};

  // Itera sobre as chaves do objeto de dados
  Object.keys(data).forEach((key) => {
    if (!data[key]) return;

    const parts = key.split("-");

    if (parts.length === 1) {
      // É uma dimensão
      const dimensionKey = parseInt(parts[0], 10);
      if (!dimensions[dimensionKey]) {
        dimensions[dimensionKey] = [];
      }
    } else if (parts.length === 2) {
      // É uma evidência
      const dimensionKey = parseInt(parts[0], 10);
      const evidenceKey = parts[1];

      if (!dimensions[dimensionKey]) {
        dimensions[dimensionKey] = [];
      }

      const existingEvidence = dimensions[dimensionKey].find(
        (e) => e.key === evidenceKey
      );
      if (!existingEvidence) {
        dimensions[dimensionKey].push({ key: evidenceKey, clues: [] });
      }
    } else if (parts.length === 3) {
      // É uma pista (clue)
      const dimensionKey = parseInt(parts[0], 10);
      const evidenceKey = parts[1];
      const clueKey = parts[2];

      const evidence = dimensions[dimensionKey]?.find(
        (e) => e.key === evidenceKey
      );
      if (evidence) {
        evidence.clues.push({ key: clueKey });
      }
    }
  });

  // Converte o objeto para a estrutura final
  const result: TransformResult = {
    dimensions: Object.keys(dimensions).map((key) => {
      const dimensionKey = parseInt(key, 10);
      return {
        key: dimensionKey,
        evidences: dimensions[dimensionKey],
      };
    }),
  };

  return result;
};

const getDadosFormatados = (data: TransformResult) => {
  const items: { [key: string]: boolean } = {};

  Object.keys(data.dimensions).forEach((dimensionKey) => {
    items[dimensionKey] = false;

    Object.keys(data.dimensions[parseInt(dimensionKey)].evidences).forEach((evidenceKey) => {
      const evidenceFullKey = `${dimensionKey}-${evidenceKey}`;
      items[evidenceFullKey] = false;

      Object.keys(data.dimensions[parseInt(dimensionKey)].evidences[parseInt(evidenceKey)].clues).forEach(
        (clueKey) => {
          const clueFullKey = `${dimensionKey}-${evidenceKey}-${clueKey}`;
          items[clueFullKey] = false;
        }
      );
    });
  });

  return items;
};

// Função para verificar e atualizar o estado dos nós
function updateNodeState(
  data: { [key: string]: boolean },
  node: string,
  newValue: boolean
): { [key: string]: boolean } {
  // Atualiza o nó específico
  data[node] = newValue;

  // Função para preencher todos os descendentes de um nó com o novo valor
  const updateDescendants = (parent: string, value: boolean) => {
    Object.keys(data).forEach((key) => {
      if (key.startsWith(parent) && key !== parent) {
        data[key] = value;
      }
    });
  };

  // Função para atualizar todos os ancestrais de um nó
  const updateAncestors = (currentNode: string, value: boolean) => {
    const parts = currentNode.split("-");

    // Subir um nível (para o pai) e continuar até o nível mais alto
    while (parts.length > 1) {
      parts.pop();
      const parentNode = parts.join("-");
      data[parentNode] = value;
    }
  };

  // Verifica se todos os filhos de um nó específico são falsos
  const checkChildren = (parent: string): boolean => {
    return Object.keys(data)
      .filter((key) => key.startsWith(parent) && key !== parent)
      .every((key) => !data[key]); // Verifica se todos os filhos são falsos
  };

  // Atualiza recursivamente os pais com base nos filhos (caso todos os filhos sejam falsos)
  const updateParentsIfChildrenFalse = (currentNode: string) => {
    const parts = currentNode.split("-");

    // Remover a última parte para subir um nível (para o pai)
    if (parts.length > 1) {
      parts.pop();
      const parentNode = parts.join("-");

      // Se todos os filhos desse pai são falsos, atualiza o pai para falso
      if (checkChildren(parentNode)) {
        data[parentNode] = false;
        updateParentsIfChildrenFalse(parentNode); // Atualiza o próximo nível (avô, etc.)
      }
    }
  };

  // Atualiza tanto os ancestrais quanto os descendentes
  if (newValue === true) {
    updateAncestors(node, true); // Atualiza os ancestrais para `true`
    updateDescendants(node, true); // Atualiza todos os descendentes para `true`
  } else {
    // Atualiza os descendentes e verifica os pais quando o valor for `false`
    updateDescendants(node, false); // Atualiza todos os descendentes para `false`
    updateParentsIfChildrenFalse(node); // Verifica e atualiza pais para `false` se todos os filhos forem `false`
  }

  // Retorna o objeto data atualizado
  return data;
}

type Props = {
  onValueChange: (value: TransformResult) => void;
};

// Função principal do componente
const NestedCheckboxList: React.FC<Props> = ({ onValueChange }) => {
  const [baseItems, setBaseItems] = useState<{ [key: string]: boolean }>({});
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    console.log("useEffect::list");
    const itemsBase = getDadosFormatados(data);

    setBaseItems(itemsBase);
  }, []);

  const handleUpdateNodeState = (key: string, isChecked: boolean, old: any) => {
    const itemsBase = baseItems;
    const items = { ...itemsBase, ...old };

    const updatedItems = updateNodeState(items, key, isChecked);

    return updatedItems;
  };

  const handleCheckboxChange = (key: string, isChecked: boolean) => {
    const newCheckedItems = handleUpdateNodeState(key, isChecked, checkedItems);

    setCheckedItems(newCheckedItems);
    const transformedData = transformStructure(newCheckedItems);
    onValueChange(transformedData);
  };

  // console.log("data.dimensions", data.dimensions);

  // Função para renderizar o conteúdo
  const renderList = () => {
    return Object.keys(data.dimensions).map((dimensionKey) => {
      const dimension = data.dimensions[parseInt(dimensionKey)];

      return (
        <div key={dimensionKey}>
          <div className="flex items-center">
            <label
              key={dimensionKey}
              htmlFor={dimensionKey}
              className="flex items-center"
            >
              <Checkbox
                id={dimensionKey}
                checked={checkedItems[dimensionKey] || false}
                onCheckedChange={(isChecked: boolean) =>
                  handleCheckboxChange(dimensionKey, isChecked)
                }
              />
              <span className="select-none ml-2">{dimension.title}</span>
            </label>
          </div>
          <div className="ml-4">
            {Object.keys(dimension.evidences).map((evidenceKey) => {
              const evidence = dimension.evidences[parseInt(evidenceKey)];
              const evidenceFullKey = `${dimensionKey}-${evidenceKey}`;

              return (
                <div key={evidenceFullKey}>
                  <div className="flex items-center my-1">
                    <label
                      htmlFor={evidenceFullKey}
                      className="flex items-center"
                    >
                      <Checkbox
                        id={evidenceFullKey}
                        checked={checkedItems[evidenceFullKey] || false}
                        onCheckedChange={(isChecked: boolean) =>
                          handleCheckboxChange(evidenceFullKey, isChecked)
                        }
                      />
                      <span className="select-none ml-2">{evidence.title}</span>
                    </label>
                  </div>
                  <div className="ml-4">
                    {Object.keys(evidence.clues).map((clueKey) => {
                      const clue = evidence.clues[Number(clueKey)];
                      const clueFullKey = `${dimensionKey}-${evidenceKey}-${clueKey}`;

                      return (
                        <div
                          key={clueFullKey}
                          className="flex items-center my-1"
                        >
                          <label
                            htmlFor={clueFullKey}
                            className="flex items-center"
                          >
                            <Checkbox
                              id={clueFullKey}
                              checked={checkedItems[clueFullKey] || false}
                              onCheckedChange={(isChecked: boolean) =>
                                handleCheckboxChange(clueFullKey, isChecked)
                              }
                            />
                            <span className="select-none ml-2">
                              {clue.title}
                            </span>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };

  return <div>{renderList()}</div>;
};

export default NestedCheckboxList;
