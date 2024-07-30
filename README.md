
# README

## Descrição
A aplicação foi desenvolvida utilizando Node.js na versão `v20.15.1` e o framework `NestJS`. Existem 3 camadas principais: Domain, Application e Infra, seguindo os princípios de arquitetura limpa, sem dependências das camadas externas e bibliotecas externas, etc., nas camadas internas. Não sou purista, deixo controllers e afins "sujos" intencionalmente para aproveitar o poder do NestJS.

Pensando em minimizar o número de requisições e também para não deixar o banco de dados com inconsistências, como produtores rurais sem fazenda, optei por inserções e remoções nested, utilizando transações para garantir a consistência.
O Mesmo serve para o Dashboard, mas como estou utilizando usecases e cara dash tem sua propria chamada, facilmente podemos criar uma rota para cada.

## Testes
A aplicação conta com testes unitários e de integração. Para os testes unitários, foi utilizado Jest e jest-mock-extended.

Para testes de integração, utilizei pg-mem para rodar o banco em memória e o poder do NestJS para subir toda a aplicação e apenas trocar o database provider para o in-memory.

Para executar os testes:
1. `npm install`
2. `npm run test`
3. Para coverage: `npm run test:cov`

![Alt Text](./tests.gif)

## Rodando localmente
A aplicação utiliza o Docker Compose para gerenciar os serviços necessários. Siga os passos abaixo para rodar a aplicação:

### 1. Configuração do Banco de Dados:
O Docker Compose irá subir um container com o PostgreSQL. O script de criação do banco de dados será executado automaticamente durante a criação do container. Além disso, um script para inserção de dados de exemplo também será executado.

### 2. Variáveis de Ambiente:
O Docker Compose está configurado para utilizar um arquivo `.env` para obter as variáveis de ambiente necessárias. Certifique-se de que o arquivo `.env` está corretamente configurado com as variáveis de ambiente necessárias antes de iniciar a aplicação.

### 3. Executando a Aplicação:
Após subir os containers, a aplicação estará disponível em: [http://localhost:3000/api](http://localhost:3000/api)

Para rodar a aplicação, basta seguir os comandos abaixo no terminal:
```sh
docker compose --env-file .env up
```

Uma collection exemplo para o Insomnia está em anexo.
