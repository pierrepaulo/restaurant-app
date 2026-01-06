# Restaurant App

### MVP de um sistema para restaurantes que centraliza a gestão do cardápio e o fluxo de pedidos. O administrador cadastra e organiza categorias e produtos, enquanto o garçom realiza os pedidos pelo celular. Assim que um pedido é enviado, ele é registrado no backend e exibido imediatamente no sistema, facilitando o acompanhamento e a operação do atendimento.

<p>
  <a href="screenshots/image-1.jpg.png">
    <img src="screenshots/image-1.jpg.png" alt="Image 1" width="33%" />
  </a>
  <a href="screenshots/image-2.jpg.png">
    <img src="screenshots/image-2.jpg.png" alt="Image 2" width="33%" />
  </a>
  <a href="screenshots/image-3.jpg.png">
    <img src="screenshots/image-3.jpg.png" alt="Image 3" width="33%" />
  </a>
</p>
<p>
  <a href="screenshots/image-4.jpg.png">
    <img src="screenshots/image-4.jpg.png" alt="Image 4" width="33%" />
  </a>
  <a href="screenshots/image-5.jpg.png">
    <img src="screenshots/image-5.jpg.png" alt="Image 5" width="33%" />
  </a>
  <a href="screenshots/image-6.jpg.png">
    <img src="screenshots/image-6.jpg.png" alt="Image 6" width="33%" />
  </a>
</p>
<p>
  <a href="screenshots/image-12.jpg.png">
    <img src="screenshots/image-12.jpg.png" alt="Image 12" width="33%" />
  </a>
  <a href="screenshots/image-13.jpg.png">
    <img src="screenshots/image-13.jpg.png" alt="Image 13" width="33%" />
  </a>
  <a href="screenshots/image-14.jpg.png">
    <img src="screenshots/image-14.jpg.png" alt="Image 14" width="33%" />
  </a>
</p>
<p>
  <a href="screenshots/image-7.jpg.png">
    <img src="screenshots/image-7.jpg.png" alt="Image 7" width="19%" />
  </a>
  <a href="screenshots/image-8.jpg.png">
    <img src="screenshots/image-8.jpg.png" alt="Image 8" width="19%" />
  </a>
  <a href="screenshots/image-9.jpg.png">
    <img src="screenshots/image-9.jpg.png" alt="Image 9" width="19%" />
  </a>
  <a href="screenshots/image-10.jpg.png">
    <img src="screenshots/image-10.jpg.png" alt="Image 10" width="19%" />
  </a>
  <a href="screenshots/image-11.jpg.png">
    <img src="screenshots/image-11.jpg.png" alt="Image 11" width="19%" />
  </a>
</p>

## Visao geral

Restaurant App e um sistema completo para restaurante com tres camadas:

- Backend: API REST que centraliza autenticacao, dados e regras de negocio.
- Frontend: painel desktop para admin criar categorias/produtos e acompanhar pedidos.
- Mobile: app do garcom para abrir mesas, criar pedidos e enviar para o front.

## Backend

### Funcionalidades

- Autenticacao JWT com roles (STAFF/ADMIN).
- Cadastro de usuarios.
- CRUD de categorias e produtos (com upload de imagem).
- Fluxo de pedidos: criar mesa, adicionar/remover itens, enviar e finalizar.
- Soft delete de produtos via flag `disabled`.

### Tech Stack

- Node.js, TypeScript, Express
- Prisma + PostgreSQL
- Zod (validacao)
- JWT (auth), bcryptjs (hash)
- Multer + Cloudinary (upload de imagens)

### Arquitetura

- Rotas -> Controllers -> Services -> Prisma.
- Middlewares para autenticacao, autorizacao (admin) e validacao de schema.
- Upload de imagens com Multer (memoria) e Cloudinary.

### Estrutura do repositorio

```text
backend/
  prisma/
    migrations/
    schema.prisma
  src/
    @types/
    config/
    controllers/
    generated/
    middlewares/
    prisma/
    routes.ts
    schemas/
    services/
    server.ts
  package.json
  prisma.config.ts
  tsconfig.json
```

### Pre-requisitos

- Node.js + npm
- PostgreSQL
- Conta no Cloudinary (para upload de imagens)

### Como rodar localmente

```bash
cd backend
npm install
```

Crie o arquivo `.env` com as variaveis abaixo, depois:

```bash
npx prisma migrate dev
npm run dev
```

Servidor em: `http://localhost:3333`.

### Variaveis de ambiente

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/restaurant?schema=public"

# JWT
JWT_SECRET="sua-chave-secreta-aqui"

# Cloudinary
CLOUDINARY_CLOUD_NAME="seu_cloud_name"
CLOUDINARY_API_KEY="sua_api_key"
CLOUDINARY_API_SECRET="seu_api_secret"

# Server (opcional)
PORT=3333
```

### Banco de dados

- PostgreSQL com Prisma (`backend/prisma/schema.prisma`).
- Tabelas: `users`, `categories`, `products`, `orders`, `items`.
- Relacoes: Category 1:N Product, Order 1:N Item, Product 1:N Item.
- `products.disabled` controla soft delete.
- `orders.draft` indica pedido em rascunho e `orders.status` pedido finalizado.

### Documentacao da API (rotas + exemplos)

Base URL: `http://localhost:3333`

Autenticacao:

- Todas as rotas, exceto `/users` e `/session`, exigem header:
  `Authorization: Bearer <token>`
- Rotas admin: `POST /category`, `POST /product`, `DELETE /product`.

#### Usuarios

**POST /users**

```json
{
  "name": "Pierre Paulo",
  "email": "pierre@example.com",
  "password": "senha123"
}
```

Resposta:

```json
{
  "id": "uuid",
  "name": "Pierre Paulo",
  "email": "pierre@example.com",
  "role": "STAFF",
  "createdAt": "2025-01-01T10:00:00.000Z"
}
```

**POST /session**

```json
{
  "email": "pierre@example.com",
  "password": "senha123"
}
```

Resposta:

```json
{
  "id": "uuid",
  "name": "Pierre Paulo",
  "email": "pierre@example.com",
  "role": "STAFF",
  "token": "jwt_token"
}
```

**GET /me**
Resposta:

```json
{
  "id": "uuid",
  "name": "Pierre Paulo",
  "email": "pierre@example.com",
  "role": "STAFF",
  "createdAt": "2025-01-01T10:00:00.000Z"
}
```

#### Categorias

**POST /category** (admin)

```json
{
  "name": "Pizzas"
}
```

Resposta:

```json
{
  "id": "uuid",
  "name": "Pizzas",
  "createdAt": "2025-01-01T10:00:00.000Z"
}
```

**GET /category**
Resposta:

```json
[{ "id": "uuid", "name": "Pizzas", "createdAt": "2025-01-01T10:00:00.000Z" }]
```

#### Produtos

**POST /product** (admin, multipart/form-data)
Campos:

- `name` (string)
- `price` (string com valor em centavos, ex: "4500")
- `description` (string)
- `category_id` (string)
- `file` (imagem jpg/png)

Resposta:

```json
{
  "id": "uuid",
  "name": "Pizza Calabresa",
  "price": 4500,
  "description": "Pizza com calabresa",
  "category_id": "uuid",
  "banner": "https://...",
  "createdAt": "2025-01-01T10:00:00.000Z"
}
```

**GET /products?disabled=false**
Resposta:

```json
[
  {
    "id": "uuid",
    "name": "Pizza Calabresa",
    "price": 4500,
    "description": "Pizza com calabresa",
    "banner": "https://...",
    "category_id": "uuid",
    "disabled": false,
    "createdAt": "2025-01-01T10:00:00.000Z",
    "category": { "id": "uuid", "name": "Pizzas" }
  }
]
```

**DELETE /product?product_id=uuid** (admin)
Resposta:

```json
{ "message": "Produto deletado/arquivado com sucesso!" }
```

**GET /category/product?category_id=uuid**
Resposta:

```json
[
  {
    "id": "uuid",
    "name": "Pizza Calabresa",
    "price": 4500,
    "description": "Pizza com calabresa",
    "banner": "https://...",
    "category_id": "uuid",
    "disabled": false,
    "createdAt": "2025-01-01T10:00:00.000Z",
    "category": { "id": "uuid", "name": "Pizzas" }
  }
]
```

#### Pedidos

**POST /order**

```json
{
  "table": 12,
  "name": "Mesa 12"
}
```

Resposta:

```json
{
  "id": "uuid",
  "table": 12,
  "status": false,
  "draft": true,
  "name": "Mesa 12",
  "createdAt": "2025-01-01T10:00:00.000Z"
}
```

**GET /orders?draft=false**
Resposta:

```json
[
  {
    "id": "uuid",
    "table": 12,
    "name": "Mesa 12",
    "draft": false,
    "status": false,
    "createdAt": "2025-01-01T10:00:00.000Z",
    "items": [
      {
        "id": "uuid",
        "amount": 2,
        "product": {
          "id": "uuid",
          "name": "Pizza Calabresa",
          "price": 4500,
          "description": "Pizza com calabresa",
          "banner": "https://..."
        }
      }
    ]
  }
]
```

**GET /order/detail?order_id=uuid**
Resposta:

```json
{
  "id": "uuid",
  "table": 12,
  "name": "Mesa 12",
  "draft": false,
  "status": false,
  "createdAt": "2025-01-01T10:00:00.000Z",
  "updatedAt": "2025-01-01T10:10:00.000Z",
  "items": [
    {
      "id": "uuid",
      "amount": 2,
      "createdAt": "2025-01-01T10:05:00.000Z",
      "product": {
        "id": "uuid",
        "name": "Pizza Calabresa",
        "price": 4500,
        "description": "Pizza com calabresa",
        "banner": "https://..."
      }
    }
  ]
}
```

**POST /order/add**

```json
{
  "order_id": "uuid",
  "product_id": "uuid",
  "amount": 2
}
```

Resposta:

```json
{
  "id": "uuid",
  "amount": 2,
  "order_id": "uuid",
  "product_id": "uuid",
  "createdAt": "2025-01-01T10:05:00.000Z",
  "product": {
    "id": "uuid",
    "name": "Pizza Calabresa",
    "price": 4500,
    "description": "Pizza com calabresa",
    "banner": "https://..."
  }
}
```

**DELETE /order/remove?item_id=uuid**
Resposta:

```json
{ "message": "Item removido com sucesso" }
```

**PUT /order/send**

```json
{
  "order_id": "uuid",
  "name": "Mesa 12"
}
```

Resposta:

```json
{
  "id": "uuid",
  "table": 12,
  "draft": false,
  "status": false,
  "createdAt": "2025-01-01T10:00:00.000Z"
}
```

**PUT /order/finish**

```json
{
  "order_id": "uuid"
}
```

Resposta:

```json
{
  "id": "uuid",
  "table": 12,
  "name": "Mesa 12",
  "draft": false,
  "status": true,
  "createdAt": "2025-01-01T10:00:00.000Z"
}
```

**DELETE /order?order_id=uuid**
Resposta:

```json
{ "message": "Pedido deletado com sucesso" }
```

### Como realizar os testes manuais das rotas (Insomnia/Postman)

- Crie um ambiente com `base_url = http://localhost:3333` e `token`.
- Cadastre um usuario via `POST /users`.
- Altere o role para ADMIN no banco (exemplo SQL):
  ```sql
  UPDATE users SET role = 'ADMIN' WHERE email = 'pierre@example.com';
  ```
- Faca login com `POST /session` e salve o `token` no ambiente.
- Para rotas protegidas, envie `Authorization: Bearer {{token}}`.
- Fluxo sugerido:
  1. `POST /category`
  2. `POST /product` (multipart/form-data com imagem)
  3. `POST /order`
  4. `POST /order/add`
  5. `PUT /order/send`
  6. `GET /orders?draft=false`
  7. `PUT /order/finish`
  8. `GET /order/detail`
  9. `DELETE /order/remove` e `DELETE /order`

## Frontend

### Funcionalidades

- Login e registro de usuarios.
- Painel admin para criar categorias e produtos (com imagem).
- Visualizacao de pedidos ativos e finalizacao.

### Tech Stack

- Next.js (App Router), React, TypeScript
- Tailwind CSS + shadcn/ui + Radix UI
- Lucide icons

### Arquitetura

- Paginas em `src/app` (App Router).
- Server Actions em `src/actions` para mutacoes.
- Cliente API em `src/lib/api` e auth por cookie HTTP-only.
- Componentes reutilizaveis em `src/components`.

### Estrutura do repositorio

```text
frontend/
  src/
    actions/
    app/
    components/
    lib/
  public/
  next.config.ts
  package.json
  tsconfig.json
```

### Pre-requisitos

- Node.js + npm
- Backend rodando localmente

### Como rodar localmente

```bash
cd frontend
npm install
```

Crie o arquivo `.env.local`:

```bash
NEXT_PUBLIC_API_URL="http://localhost:3333"
```

Depois:

```bash
npm run dev
```

Frontend em: `http://localhost:3000`.

### Variaveis de ambiente

- `NEXT_PUBLIC_API_URL`: URL base da API.

## Mobile

### Funcionalidades

- Login do garcom.
- Abrir mesa (criar pedido).
- Selecionar categoria/produto, definir quantidade e adicionar itens.
- Remover itens e enviar pedido para a cozinha.

### Tech Stack

- Expo + React Native + TypeScript
- Expo Router
- Axios + AsyncStorage

### Arquitetura

- Rotas em `app/` (Expo Router).
- Contexto de autenticacao em `context/`.
- Cliente HTTP em `services/api.ts`.
- Componentes reutilizaveis em `components/`.

### Estrutura do repositorio

```text
mobile/
  app/
  assets/
  components/
  config/
  constants/
  context/
  services/
  types/
  utils/
  package.json
```

### Pre-requisitos

- Node.js + npm
- Expo Go (ou emulador Android/iOS)
- Backend acessivel na mesma rede

### Como rodar localmente

```bash
cd mobile
npm install
```

Atualize a URL da API em `mobile/config/api.config.ts` com o IP da sua maquina.

Depois:

```bash
npm run start
```
