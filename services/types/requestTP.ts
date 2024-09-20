export type RequestTP<T> = {
    baseUrl?: string
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' ,
    headers?: {'Content-Type': 'application/json'},
    params?: T,

}

  