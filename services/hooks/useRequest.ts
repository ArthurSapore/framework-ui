import { useUserStore } from '@/store/UserStore'
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { compareAsc, fromUnixTime } from 'date-fns'
import { jwtDecode } from 'jwt-decode'
import { RequestTP } from '../types/requestTP'

const ABORT_SIGNAL_TIMEOUT = 3000 //ms

function newAbortSignal(timeoutMs: number): AbortSignal  {
   const abortController = new AbortController();
   setTimeout(() => abortController.abort(), timeoutMs || 0);
 
   return abortController.signal;
}

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(async (req: InternalAxiosRequestConfig) => {
   const user = useUserStore.getState().user
   const refreshLoggedUserData = useUserStore.getState().setUser
   const logoutUser = useUserStore.getState().clearUser

   if (user?.accessToken) {
      const jwtExpirationDate = jwtDecode(user.accessToken).exp

      const isJwtExpired =
         jwtExpirationDate && compareAsc(new Date(), fromUnixTime(jwtExpirationDate)) > 0

      if (isJwtExpired) {
         const newUserAccessToken = await refreshTokenRequest()

         if (!newUserAccessToken) {
            logoutUser()
            return Promise.reject(new Error('Unauthorized: No access token'))
         }

         refreshLoggedUserData({ ...user, accessToken: newUserAccessToken! })
         if (req.headers) req.headers['Authorization'] = `Bearer ${newUserAccessToken}`
      }

      if (req.headers) req.headers['Authorization'] = `Bearer ${user.accessToken}`

      return req
   }

   logoutUser()
   return Promise.reject(new Error('Unauthorized access'))
})

axiosInstance.interceptors.response.use(
   (response) => {
      return response
   },
   async (error) => {
      const axiosError = error as AxiosError

      const user = useUserStore.getState().user
      const refreshLoggedUserData = useUserStore.getState().setUser
      const logoutUser = useUserStore.getState().clearUser

      if (axiosError.response?.status === 401) {
         if (user?.accessToken) {
            const jwtExpirationDate = jwtDecode(user.accessToken).exp

            const isJwtExpired =
               jwtExpirationDate &&
               compareAsc(new Date(), fromUnixTime(jwtExpirationDate)) > 0

            if (isJwtExpired) {
               const newUserAccessToken = await refreshTokenRequest()
               if (newUserAccessToken) {
                  refreshLoggedUserData({ ...user, accessToken: newUserAccessToken! })

                  if (axiosError.config) {
                     axiosError.config.headers['Authorization'] =
                        `Bearer ${newUserAccessToken}`

                     return axios(axiosError.config)
                  }
               }

               logoutUser()
               return Promise.reject(new Error('Unauthorized: No access token'))
            }

            if (axiosError.config) {
               return axios(axiosError.config)
            }
         }

         logoutUser()
         return Promise.reject(new Error('Unauthorized: No access token'))
      }

      return Promise.reject(error)
   }
)


type UseRequestResponse<T, K> = {
   runRequest: (apiConfig: RequestTP<T>) => Promise<K | void>
}

export function useRequest<T, K>(): UseRequestResponse<T, K> {

   async function runRequest(apiConfig: RequestTP<T>): Promise<K | void> {
      try {
         const request = axiosInstance<K>({
            ...apiConfig,
            signal: newAbortSignal(ABORT_SIGNAL_TIMEOUT) 
         });

         return (await request).data as K;
      } catch (error: unknown) {
         const axiosError = error as AxiosError;

         if(axios.isCancel(axiosError)) 
            console.log('Request was canceled manually by the client.');

         console.log('Error:', axiosError.message);
      }
   }

   return {
      runRequest
   }
}

export async function refreshTokenRequest(): Promise<string | undefined> {
   try {
      const response = await axios<string | undefined>({
         baseURL: '',
         method: 'GET',
         url: ''
      })

      return response.data
   } catch (error) {
      const axiosError = error as AxiosError
      console.error('Failed to resend the request:', axiosError)
   }
}
