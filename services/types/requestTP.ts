
export type CustomHeaders = {
    Authorization?: string; // Se precisar de autenticação
    'Content-Type'?: string; // Para o tipo de conteúdo, como 'application/json'
    [key: string]: string | undefined; // Para quaisquer outros headers dinâmicos
};

export type RequestTP<T> = {
    baseUrl?: string
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' ,
    headers?: CustomHeaders,
    data?: T,

}
