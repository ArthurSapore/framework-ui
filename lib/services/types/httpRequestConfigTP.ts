export type httpRequestConfigTP<T> = {
    url: string
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    headers?: string
    params?: T
    responseType?: 'json'
}