import { useUserStore } from '@/store/UserStore'
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { compareAsc, fromUnixTime } from 'date-fns'
import { jwtDecode } from 'jwt-decode'
import { RequestTP } from '../types/requestTP'

const ABORT_SIGNAL_TIMEOUT = 3000 //ms
const axiosInstance = axios.create()

let isRefreshing = false
let pendingRequests: ((token: string) => void)[] = []

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

async function refreshTokenRequest(): Promise<string | undefined> {
   try {
      const response = await axios.get<string>('')
      return response.data
   } catch (error) {
      const axiosError = error as AxiosError
      console.error('Failed to refresh token:', axiosError)
   }
}


function newAbortSignal(timeoutMs: number): AbortSignal  {
   const abortController = new AbortController();
   setTimeout(() => abortController.abort(), timeoutMs || 0);
   return abortController.signal;
}

axiosInstance.interceptors.request.use(async (req: InternalAxiosRequestConfig) => {
   const { user, clearUser: logoutUser, setUser: refreshLoggedUserData } = useUserStore.getState()

   if (user?.accessToken) {
      const jwtExpirationDate = jwtDecode<{ exp: number }>(user.accessToken).exp
      const isJwtExpired = jwtExpirationDate && compareAsc(new Date(), fromUnixTime(jwtExpirationDate)) > 0

      if (isJwtExpired) {
         if (!isRefreshing) {
            isRefreshing = true
            const newUserAccessToken = await refreshTokenRequest()

            if (newUserAccessToken) {
               refreshLoggedUserData({ ...user, accessToken: newUserAccessToken })

               pendingRequests.forEach(callback => callback(newUserAccessToken))
               pendingRequests = [] 
               isRefreshing = false
            } else {
               logoutUser()
               isRefreshing = false
               return Promise.reject(new Error('Unauthorized: No access token'))
            }
         }

         return new Promise((resolve) => {
            pendingRequests.push((token: string) => {
               if (req.headers) {
                  req.headers['Authorization'] = `Bearer ${token}`
                  resolve(req)
               }
            })
         })
      }

      req.headers['Authorization'] = `Bearer ${user.accessToken}`
   }

   return req
}, (error) => {
   return Promise.reject(error)
})

axiosInstance.interceptors.response.use(
   (response) => response,
   async (error) => {
      const { user, clearUser: logoutUser, setUser: refreshLoggedUserData } = useUserStore.getState()
      const axiosError = error as AxiosError

      if (axiosError.response?.status === 401 && user?.accessToken) {
         const jwtExpirationDate = jwtDecode<{ exp: number }>(user.accessToken).exp
         const isJwtExpired = jwtExpirationDate && compareAsc(new Date(), fromUnixTime(jwtExpirationDate)) > 0

         if (isJwtExpired) {
            if (!isRefreshing) {
               isRefreshing = true
               const newUserAccessToken = await refreshTokenRequest()

               if (newUserAccessToken) {
                  refreshLoggedUserData({ ...user, accessToken: newUserAccessToken })

                  pendingRequests.forEach(callback => callback(newUserAccessToken))
                  pendingRequests = []
                  isRefreshing = false
               } else {
                  logoutUser()
                  isRefreshing = false
                  return Promise.reject(new Error('Unauthorized: No access token'))
               }
            }

            return new Promise((resolve) => {
               pendingRequests.push((token: string) => {
                  if (axiosError.config) {
                     axiosError.config.headers['Authorization'] = `Bearer ${token}`
                     resolve(axios(axiosError.config))
                  }
               })
            })
         }
      }

      return Promise.reject(error)
   }
)