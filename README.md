# Projeto Fullstack (Backend NestJS & Frontend Next.js)

Este projeto é uma aplicação fullstack que combina um backend robusto construído com NestJS e um frontend moderno desenvolvido com Next.js. Ele foi projetado para ser escalável, eficiente e fácil de manter, utilizando as melhores práticas de desenvolvimento.

## Sumário

- [Características](#características)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Primeiros Passos](#primeiros-passos)
  - [Configuração do Backend](#configuração-do-backend)
  - [Configuração do Frontend](#configuração-do-frontend)
- [Executando a Aplicação](#executando-a-aplicação)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [API Endpoints](#api-endpoints)
- [Banco de Dados](#banco-de-dados)
- [Testes](#testes)
- [Implantação (Deployment)](#implantação-deployment)

## Características

### Backend
- **Arquitetura Modular:** Organizado em módulos para facilitar a manutenção e escalabilidade.
- **Autenticação e Autorização:** Implementação de mecanismos de segurança para proteger as rotas da API.
- **Integração com Banco de Dados:** Utiliza Prisma ORM para interação com PostgreSQL.
- **GraphQL API:** Exposição de endpoints GraphQL para consultas e mutações eficientes.
- **REST API:** Possibilidade de exposição de endpoints RESTful para comunicação tradicional.
- **Validação de Dados:** Utilização de DTOs e validação robusta para garantir a integridade dos dados.

### Frontend
- **Desenvolvimento Rápido:** Baseado em Next.js para renderização do lado do servidor (SSR) e geração de sites estáticos (SSG).
- **Componentes Reutilizáveis:** Estrutura de componentes para uma UI consistente e modular.
- **Gerenciamento de Estado:** (Assumindo React Context/Hooks ou similar)
- **Estilização Moderna:** (Assumindo Tailwind CSS ou similar)
- **Navegação Intuitiva:** Rotas bem definidas para uma experiência de usuário fluida.

## Tecnologias Utilizadas

### Backend
- **NestJS:** Framework Node.js progressivo para construir aplicações eficientes e escaláveis do lado do servidor.
- **TypeScript:** Linguagem de programação que adiciona tipagem estática ao JavaScript.
- **Prisma ORM:** ORM de próxima geração para Node.js e TypeScript, facilitando a interação com o banco de dados.
- **PostgreSQL:** Sistema de gerenciamento de banco de dados relacional de código aberto.
- **GraphQL:** Linguagem de consulta para APIs e um runtime para preencher essas consultas com seus dados existentes.
- **Docker & Docker Compose:** Para orquestração e gerenciamento de ambientes de desenvolvimento e produção.
- **JWT (JSON Web Tokens):** Para autenticação baseada em tokens.

### Frontend
- **Next.js:** Framework React para aplicações web de produção.
- **React:** Biblioteca JavaScript para construir interfaces de usuário.
- **TypeScript:** Para tipagem estática e melhor desenvolvimento.
- **(Possível) Tailwind CSS:** Framework CSS utilitário para construção rápida de designs personalizados.
- **(Possível) Shadcn UI / Radix UI:** Biblioteca de componentes para React.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/en/) (versão 18.x ou superior recomendada)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/) (gerenciador de pacotes)
- [Docker Desktop](https://www.docker.com/products/docker-desktop) (para rodar o banco de dados e o backend em contêineres)
- [Git](https://git-scm.com/) (para clonar o repositório)

## Primeiros Passos

Siga estas instruções para configurar e executar o projeto em sua máquina local.

### 1. Clonar o Repositório

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd teste_ddc
```

### 2. Configuração do Backend

Navegue até o diretório `backend`:

```bash
cd backend
```

#### 2.1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do diretório `backend` com base no `.env.example` (se existir, caso contrário, crie as variáveis necessárias para o banco de dados e JWT):

```dotenv
DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase?schema=public"
JWT_SECRET="sua_chave_secreta_jwt"
# Outras variáveis de ambiente necessárias
```

#### 2.2. Instalar Dependências

```bash
npm install # ou yarn install
```

#### 2.3. Configurar e Rodar o Banco de Dados com Docker Compose

Certifique-se de que o Docker Desktop esteja em execução. No diretório `backend`, execute:

```bash
docker-compose up -d
```

Isso iniciará um contêiner PostgreSQL. Aguarde alguns segundos para que o banco de dados esteja totalmente operacional.

#### 2.4. Rodar Migrações do Prisma

Após o banco de dados estar pronto, aplique as migrações do Prisma para criar o esquema do banco de dados:

```bash
npx prisma migrate dev --name init
```

Se você tiver um script `database.sh` ou `setup-env.sh` para configuração inicial, pode ser necessário executá-lo:

```bash
./database.sh # Se aplicável
./setup-env.sh # Se aplicável
```

#### 2.5. Gerar o Cliente Prisma

```bash
npx prisma generate
```

### 3. Configuração do Frontend

Abra um novo terminal e navegue até o diretório `front`:

```bash
cd ../front
```

#### 3.1. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do diretório `front` com base no `.env` (se existir, caso contrário, crie as variáveis necessárias para a API do backend):

```dotenv
NEXT_PUBLIC_BACKEND_URL="http://localhost:3000/graphql" # Ou a URL da sua API REST
```

#### 3.2. Instalar Dependências

```bash
npm install # ou yarn install
```

## Executando a Aplicação

### Backend

No diretório `backend`, inicie o servidor de desenvolvimento:

```bash
npm run start:dev # ou yarn start:dev
```

O backend estará disponível em `http://localhost:3000` (ou a porta configurada).

### Frontend

No diretório `front`, inicie o servidor de desenvolvimento:

```bash
npm run dev # ou yarn dev
```

O frontend estará disponível em `http://localhost:3001` (ou a porta padrão do Next.js).

## Estrutura do Projeto

```
. (raiz do projeto)
├── backend/               # Contém o código do backend (NestJS)
│   ├── src/               # Código fonte da aplicação NestJS
│   │   ├── modules/       # Módulos de domínio (e.g., auth, user, post)
│   │   ├── @shared/       # Módulos compartilhados (e.g., guards, decorators, types)
│   │   └── infra/         # Infraestrutura (e.g., database)
│   ├── prisma/            # Esquemas e migrações do Prisma
│   ├── docker-compose.yml # Configuração do Docker Compose
│   └── package.json       # Dependências e scripts do backend
└── front/                 # Contém o código do frontend (Next.js)
    ├── src/               # Código fonte da aplicação Next.js
    │   ├── app/           # Páginas e layouts da aplicação
    │   ├── components/    # Componentes reutilizáveis da UI
    │   └── lib/           # Funções utilitárias, hooks, etc.
    ├── public/            # Ativos estáticos (imagens, etc.)
    └── package.json       # Dependências e scripts do frontend
```

## API Endpoints

### Backend (NestJS)

- **GraphQL Playground:** Geralmente disponível em `http://localhost:3000/graphql` (se configurado).
- **Rotas REST:** (Se houver, liste aqui exemplos como `/api/users`, `/api/posts`).

Consulte os arquivos de `*.controller.ts` e `*.resolver.ts` nos módulos do backend para detalhes específicos dos endpoints.

## Banco de Dados

O projeto utiliza PostgreSQL com Prisma ORM. As migrações são gerenciadas pelo Prisma. Para criar novas migrações ou aplicar as existentes, utilize os comandos `npx prisma migrate`.

- **`prisma/schema.prisma`:** Define o esquema do banco de dados.
- **`prisma/migrations/`:** Contém o histórico das migrações aplicadas.

## Testes

### Backend

Para executar os testes do backend (no diretório `backend`):

```bash
npm run test # ou yarn test
npm run test:e2e # para testes end-to-end
```

### Frontend

(Assumindo Jest/React Testing Library ou similar. Se não houver, remova esta seção ou adicione instruções para configurar)

Para executar os testes do frontend (no diretório `front`):

```bash
npm run test # ou yarn test
```

## Implantação (Deployment)

Instruções para implantação em ambientes de produção (e.g., Vercel para frontend, Docker/Kubernetes para backend) podem ser adicionadas aqui. Por exemplo:

### Backend (Build para Produção)

```bash
cd backend
npm run build # ou yarn build
```

### Frontend (Build para Produção)

```bash
cd front
npm run build # ou yarn build
```

---