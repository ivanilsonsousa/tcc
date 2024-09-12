export const objectToFormData = (data: { [key: string]: any }): FormData => {
  const formData = new FormData();

  // Itera sobre cada chave do objeto
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key];

      // Se o valor for um FileList, iterar sobre ele e adicionar cada arquivo ao FormData
      if (value instanceof FileList) {
        for (let i = 0; i < value.length; i++) {
          formData.append(key, value[i]); // Adiciona o arquivo ao FormData
        }
      } else if (typeof value === 'object' && value !== null) {
        // Se o valor for um objeto, mas não FileList, converte para string JSON
        formData.append(key, JSON.stringify(value));
      } else {
        // Para outros tipos (string, number, boolean, etc.)
        formData.append(key, value);
      }
    }
  }

  return formData;
};

export const showFormData = (formData: FormData) => {
  // Iterar sobre cada entrada do FormData
  for (const [key, value] of formData.entries()) {
    // Verifica se o valor é um arquivo
    if (value instanceof File) {
      console.log(`Key: ${key}, File Name: ${value.name}, File Size: ${value.size} bytes`);
    } else {
      console.log(`Key: ${key}, Value: ${value}`);
    }
  }
};

export const formatOutput = (data: any) => {
  let result = ''; // Armazena o resultado final

  // Função recursiva para percorrer os dados
  function traverse(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          // Se for um objeto, chamamos a função recursiva para percorrê-lo
          traverse(obj[key], `${key}`);
        } else if (key === 'output') {
          // Quando chegamos ao 'output', formatamos e adicionamos ao resultado
          result += `output\n`;
          result += '-------------------------------------------------\n';
          result += `${obj[key]}\n\n`;
        }
      }
    }
  }

  traverse(data);

  return result;
};

