import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import SkeletonNestedCheckboxList from "@/components/custom/SkeletonNestedCheckboxList";

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

const getDadosFormatados = (data: TransformResult | null) => {
  if (data === null) return {};

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
  data: TransformResult | null;
  onValueChange: (value: TransformResult) => void;
};

// Função principal do componente
const NestedCheckboxList: React.FC<Props> = ({ data, onValueChange }) => {
  const [baseItems, setBaseItems] = useState<{ [key: string]: boolean }>({});
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    const itemsBase = getDadosFormatados(data);

    setBaseItems(itemsBase);
  }, [data]);

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

  const renderList = () => {
    if (data === null) {
      return <SkeletonNestedCheckboxList />;
    }

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
