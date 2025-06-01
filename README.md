<p align="center">
Este projeto foi feito no desafio do Racoelho. <br/>
</p>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>
</p>

<br>

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- Express
- Nodejs
- JWT
- Typescript
- Prisma
- Zod
- Jest
- date-fns
- Swagger

## 💻 Projeto

Neste projeto eu realizei o backend de uma aplicação onde funcionários podem registrar seus horários de entrada e saída, e administradores podem acompanhar e gerenciar esses registros.

---

## 🤔 Instruções

### Variáveis de Ambiente:

Para rodar o backend, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

- `PORT=` (por padrão esta na 3333)
- `JWT_SECRET=`
- `DATABASE_URL="postgresql://[POSTGRESQL_USERNAME]:[POSTGRESQL_PASSWORD]@localhost:5433/[POSTGRESQL_DATABASE]?schema=public"`

### Primeiros passos:

Primeiramente baixe o arquivo back-end no [GitHub](https://github.com/pdro-h0/sistema-de-pontos-backend), no seu terminal, execute o seguinte comando na raiz da pasta criada:

`npm install`

E então rode o comando do [docker-compose](https://docs.docker.com/compose/):

`docker-compose up -d`
ou
`docker compose up -d`

Em seguida, rode:
`npx prisma generate`
e
`npx prisma db push`

Por fim:

`npm run dev`

---

### Requisitos funcionais

- Funcionários podem realizar login no sistema para autenticação.
- Funcionários podem registrar horários de entrada e saída.
- Funcionários podem consultar seu histórico de registros de ponto e total de horas trabalhadas.
- Administradores podem realizar login com privilégios elevados.
- Administradores podem visualizar e gerenciar registros de ponto de todos os funcionários.
- Administradores podem gerar relatórios com base em filtros como funcionário e intervalo de datas.
- Funcionários podem realizar login no sistema para autenticação.
- Funcionários podem registrar horários de entrada e saída.
- Funcionários podem consultar seu histórico de registros de ponto e total de horas trabalhadas.
- Administradores podem realizar login com privilégios elevados.
- Administradores podem visualizar e gerenciar registros de ponto de todos os funcionários.
- Administradores podem gerar relatórios com base em filtros como funcionário e intervalo de datas.

---

### Regras de negócio

- A autenticação deve ser segura, utilizando tokens JWT.
- O sistema deve persistir dados de forma consistente utilizando um banco de dados relacional, acessado via Prisma ORM.
- O sistema deve ter cobertura de testes automatizados com Vitest.
- A API deve ser documentada de forma clara e acessível utilizando Swagger.
- O sistema deve lidar corretamente com operações de data e hora utilizando a biblioteca date-fns.
- O código deve seguir boas práticas de validação e tipagem com TypeScript e Zod.

---

Feito com ♥ by Pedro Henrique
