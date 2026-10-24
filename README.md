# EncurtadorURLs

API REST para encurtar URLs, feita com Node.js, Express, MongoDB e Mongoose.
Cada URL cadastrada recebe um código curto de 8 caracteres e guarda quantas vezes foi acessada e pesquisada.

Projeto de estudo de desenvolvimento backend.

## Tecnologias

- Node.js (ES Modules)
- Express 5
- MongoDB + Mongoose
- dotenv

## Como rodar

**Pré-requisitos:** Node.js 20+ e um MongoDB (local ou [Atlas](https://www.mongodb.com/atlas)).

```bash
git clone https://github.com/HigorBackend-Devloper/EncurtadorURLs.git
cd EncurtadorURLs
npm install
cp .env.example .env   # depois edite o .env
npm run dev
```

O servidor sobe em `http://localhost:3000`.

### Variáveis de ambiente

| Variável      | Descrição                       | Exemplo                                       |
|---------------|---------------------------------|-----------------------------------------------|
| `PORT`        | Porta do servidor               | `3000`                                        |
| `MONGODB_URI` | String de conexão com o MongoDB | `mongodb://localhost:27017/url-shortener`     |

Para o Atlas, o formato é:

```
mongodb+srv://USUARIO:SENHA@cluster.xxxxx.mongodb.net/url-shortener
```

### Scripts

| Comando       | O que faz                                              |
|---------------|--------------------------------------------------------|
| `npm run dev` | Inicia com `node --watch` (reinicia ao salvar arquivos) |
| `npm start`   | Inicia o servidor                                      |

## Endpoints

| Método | Rota                         | Descrição                                         | Sucesso |
|--------|------------------------------|---------------------------------------------------|---------|
| POST   | `/urls`                      | Cria uma URL encurtada                            | 201     |
| GET    | `/urls`                      | Lista todas as URLs                               | 200     |
| GET    | `/urls/buscar?termo=texto`   | Pesquisa URLs pelo termo (incrementa `pesquisas`) | 200     |
| GET    | `/urls/:id`                  | Busca uma URL pelo id                             | 200     |
| DELETE | `/urls/:id`                  | Exclui uma URL                                    | 204     |
| GET    | `/:codigo`                   | Busca a URL pelo código (incrementa `cliques`)    | 200     |

### Exemplo: criar uma URL

```bash
curl -X POST http://localhost:3000/urls \
  -H "Content-Type: application/json" \
  -d '{"urlOriginal": "https://nodejs.org/docs"}'
```

Resposta:

```json
{
  "mensagem": "Url criada com sucesso",
  "url": {
    "_id": "6add1e4029f84a7661d088be",
    "urlOriginal": "https://nodejs.org/docs",
    "codigo": "f2c28157",
    "cliques": 0,
    "pesquisas": 0
  }
}
```

### Erros

Os erros retornam um JSON com `mensagem` e `erro`:

| Status | Quando                                         |
|--------|------------------------------------------------|
| 400    | URL inválida, protocolo diferente de http/https ou id inválido |
| 404    | URL ou código não encontrado                   |
| 500    | Erro inesperado no servidor                    |

## Estrutura do projeto

```text
src/
├── config/database.js          # conexão com o MongoDB
├── models/Url.js               # schema da URL
├── services/urlService.js      # regras de negócio
├── controllers/urlController.js # recebe req/res e chama o service
├── routes/urlRoutes.js         # define as rotas
├── utils/generateCode.js       # gera o código curto
├── app.js                      # configuração do Express
└── server.js                   # conecta ao banco e sobe o servidor
```

## Próximos passos

- [ ] Redirecionar `GET /:codigo` para a URL original
- [ ] Ordenar a listagem por cliques (`/urls?ordenar=cliques`)
- [ ] Preencher `createdAt` automaticamente
