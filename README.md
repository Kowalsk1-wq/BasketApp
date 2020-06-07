# BasketApp

Doe Cestas Básicas, Faça a Diferença, Salve Vidas!

## Features

* [x] JWT Auth
  * [x] Cadastro de Usuário / ONG
  * [x] Confirmação do Email do Usuário (Ativação) 
  * [x] Login de Usuário / ONG
  * [x] Listagem de Usuários (excluindo o usuário vigente)
  * [x] Atualização de Dados Cadastrais do Usuário
  * [x] LogOut do Usuário
  * [x] Remoção da Conta do Usuário

* [x] O Usuário poderá fazer doações

* [x] A ONG Receberá estas doações

* [x] A ONG Entrará em contato com o doador para acertar os parâmetros de entrega das doações

* [x] A ONG Notificará ao BasketApp que a doação foi entregue com sucesso

## Config

#### Server
* Update server/.env with your imgur client ID and others Credentials

## Setup / Run

#### Server

```sh
cd server
yarn
yarn start
```

#### Client

```sh
cd client
npm install
quasar dev
```

## Stack

#### Back-end
* [Node.js](https://nodejs.org/en/)
  * Node.js JavaScript runtime
* [Express](http://expressjs.com/)
  * Fast, unopinionated, minimalist web framework for Node.js
* [Prisma 2](https://www.prisma.io/)
  * Prisma is an open-source database toolkit. It replaces traditional ORMs and makes database access easy with an auto-generated query builder for TypeScript & Node.js.
* [Multer](https://github.com/expressjs/multer)
  * Node.js middleware for handling multipart/form-data.

#### Front-end


##### Web

* [Vue.JS](https://vuejs.org/)
  * The Progressive JavaScript Framework
* [Quasar](https://quasar.dev/)
  * Build high-performance VueJS user interfaces in record time
