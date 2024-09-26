import { Clue, Evidence, Dimension, IDimensionsList } from "@/types";

export const transformStructure = (data: { [key: string]: boolean }): IDimensionsList => {
  const dimensionsMap: {
    [dimensionKey: string]: {
      dimension: Dimension;
      evidencesMap: {
        [evidenceKey: string]: {
          evidence: Evidence;
          cluesMap: { [clueKey: string]: Clue };
        };
      };
    };
  } = {};

  // Itera sobre as chaves do objeto de dados
  Object.keys(data).forEach((key) => {
    if (!data[key]) return;

    const parts = key.split("-");

    if (parts.length === 1) {
      // É uma dimensão
      const dimensionKey = parts[0];

      if (!dimensionsMap[dimensionKey]) {
        dimensionsMap[dimensionKey] = {
          dimension: {
            key: dimensionKey,
            evidences: [],
          },
          evidencesMap: {},
        };
      }
    } else if (parts.length === 2) {
      // É uma evidência
      const dimensionKey = parts[0];
      const evidenceKey = parts[1];

      if (!dimensionsMap[dimensionKey]) {
        dimensionsMap[dimensionKey] = {
          dimension: {
            key: dimensionKey,
            evidences: [],
          },
          evidencesMap: {},
        };
      }

      const dimensionData = dimensionsMap[dimensionKey];

      if (!dimensionData.evidencesMap[evidenceKey]) {
        const evidence: Evidence = {
          key: evidenceKey,
          clues: [],
        };
        dimensionData.evidencesMap[evidenceKey] = {
          evidence: evidence,
          cluesMap: {},
        };
        dimensionData.dimension.evidences.push(evidence);
      }
    } else if (parts.length === 3) {
      // É uma pista (clue)
      const dimensionKey = parts[0];
      const evidenceKey = parts[1];
      const clueKey = parts[2];

      if (!dimensionsMap[dimensionKey]) {
        dimensionsMap[dimensionKey] = {
          dimension: {
            key: dimensionKey,
            evidences: [],
          },
          evidencesMap: {},
        };
      }

      const dimensionData = dimensionsMap[dimensionKey];

      if (!dimensionData.evidencesMap[evidenceKey]) {
        const evidence: Evidence = {
          key: evidenceKey,
          clues: [],
        };
        dimensionData.evidencesMap[evidenceKey] = {
          evidence: evidence,
          cluesMap: {},
        };
        dimensionData.dimension.evidences.push(evidence);
      }

      const evidenceData = dimensionData.evidencesMap[evidenceKey];

      if (!evidenceData.cluesMap[clueKey]) {
        const clue: Clue = {
          key: clueKey,
        };
        evidenceData.cluesMap[clueKey] = clue;
        evidenceData.evidence.clues.push(clue);
      }
    }
  });

  // Converte o dimensionsMap em um array de dimensões
  const dimensions: Dimension[] = Object.values(dimensionsMap).map((dimensionData) => {
    return dimensionData.dimension;
  });

  const result: IDimensionsList = {
    dimensions: dimensions,
  };

  return result;
};

export const getDadosFormatados = (data: IDimensionsList | null) => {
  if (data === null) return {};

  const items: { [key: string]: boolean } = {};

  Object.keys(data.dimensions).forEach((dimensionKey) => {
    items[dimensionKey] = false;

    Object.keys(data.dimensions[parseInt(dimensionKey)].evidences).forEach(
      (evidenceKey) => {
        const evidenceFullKey = `${dimensionKey}-${evidenceKey}`;
        items[evidenceFullKey] = false;

        Object.keys(
          data.dimensions[parseInt(dimensionKey)].evidences[
            parseInt(evidenceKey)
          ].clues
        ).forEach((clueKey) => {
          const clueFullKey = `${dimensionKey}-${evidenceKey}-${clueKey}`;
          items[clueFullKey] = false;
        });
      }
    );
  });

  return items;
};

export const updateNodeState = (
  data: { [key: string]: boolean },
  node: string,
  newValue: boolean
): { [key: string]: boolean } => {
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
};

/**
 * Converte a estrutura IDimensionsList de volta para o formato { [key: string]: boolean },
 * atualizando o objeto allKeys com base na estrutura.
 * @param structure - A estrutura de dimensões a ser convertida
 * @param allKeys - Objeto contendo todas as chaves possíveis com seus estados atuais
 * @returns Um objeto atualizado com as chaves dos nós e seus respectivos estados booleanos
 */
export const reverseTransformStructure = (
  structure: IDimensionsList,
  allKeys: { [key: string]: boolean }
): { [key: string]: boolean } => {
  // Cria uma cópia de allKeys para evitar mutações
  const updatedData: { [key: string]: boolean } = { ...allKeys };

  // Primeiro, define todas as chaves como false
  Object.keys(updatedData).forEach((key) => {
    updatedData[key] = false;
  });

  // Itera sobre as dimensões na estrutura
  structure.dimensions.forEach((dimension) => {
    const dimensionKey = dimension.key;
    updatedData[dimensionKey] = true; // Define a dimensão como true

    dimension.evidences.forEach((evidence) => {
      const evidenceKey = `${dimensionKey}-${evidence.key}`;
      updatedData[evidenceKey] = true; // Define a evidência como true

      evidence.clues.forEach((clue) => {
        const clueKey = `${dimensionKey}-${evidence.key}-${clue.key}`;
        updatedData[clueKey] = true; // Define a pista como true
      });
    });
  });

  return updatedData;
};
