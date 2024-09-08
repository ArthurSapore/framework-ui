export type httpReponseConfigTP<T> = {
     // `data` é a resposta que foi fornecida pelo servidor
  data: T,

  // `status` é o código de status HTTP da resposta do servido
  status: number,

  // `statusText` is the HTTP status message from the server response
  statusText: string,

  // `headers` os cabeçalhos HTTP com os quais o servidor respondeu
  // Todos os nomes de cabeçalho estão em letras minúsculas e podem ser acessados ​​usando a notação de colchetes.
  // Exemplo: `response.headers['content-type']`
  headers: {},

  // `config` é a configuração que foi fornecida ao `axios` para a requisição
  config: {},

  // `request` é a requisição que gerou esta resposta
  // É a última instância da requisição do cliente em node.js (em redirecionamentos)
  // e uma instância XMLHttpRequest no navegador
  request: {}
}