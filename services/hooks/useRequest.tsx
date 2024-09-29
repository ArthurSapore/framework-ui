import axios, { AxiosError } from 'axios'
import { RequestTP } from '../types/requestTP'

type UseRequestResponse<T, K> = {
   runRequest: (apiConfig: RequestTP<T>) => Promise<K | void>
}

/**
 * A função `useRequest` cria um hook para realizar requisições HTTP assíncronas utilizando axios.
 *
 * @template T - Tipo dos dados enviados na requisição. Esse tipo representa o corpo da requisição ou os parâmetros que serão passados na chamada da API.
 * @template K - Tipo dos dados esperados na resposta da requisição. Esse tipo representa os dados que você espera receber de volta da API.
 *
 * @returns {UseRequestResponse<T, K>} Um objeto contendo a função `runRequest`, que pode ser usada para disparar uma requisição HTTP.
 */
export function useRequest<T, K>(): UseRequestResponse<T, K> {
   async function runRequest<T>(apiConfig: RequestTP<T>): Promise<K | void> {
      try {
         const request = axios<K>(apiConfig)
         return (await request).data as K
      } catch (error) {
         const axiosError = error as AxiosError
         console.log(axiosError)
      }
   }

   return {
      runRequest
   }
}
