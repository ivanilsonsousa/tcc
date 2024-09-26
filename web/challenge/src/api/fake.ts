import { mockData } from "./data";

/**
 * Simula uma chamada a uma API assíncrona com possibilidade de erro.
 *
 * @param data - Os dados que a API deve retornar.
 * @param delayInSeconds - Tempo em segundos que a requisição deve durar.
 * @param shouldFail - Indica se a requisição deve falhar.
 * @returns Uma Promise que resolve com os dados ou rejeita com um erro após o atraso especificado.
 */
export function fakeApi(
  // data: T,
  delayInSeconds: number,
  shouldFail: boolean = false
): Promise<any> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const response = {
        data: {
          output: mockData
        }
      }

      if (shouldFail) {
        reject(new Error("Falha na requisição à API falsa."));
      } else {
        resolve(response);
      }
    }, delayInSeconds * 1000);
  });
}
