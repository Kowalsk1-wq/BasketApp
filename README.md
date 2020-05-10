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

* [ ] Criação, Remoção, Validação e Atualização de Requests por parte das ONGs
* [ ] Doações referentes aos itens de cada Request feita pelos Usuários Cadastrados
* [ ] Live-Chat Para que os Usuários troquem informações com a ONG acerca de sua Doação
* [ ] ONG deve verificar as doações e fechar os Pacotes.
* [ ] em resposta as Requests das ONGs, Os Usuários deve criar Receituários Contendo os itens que eles (Usuários) vão doar para as ONGs.

## Config

#### Server
* Update server/.env with your imgur client ID and others Credentials

## Setup / Run

#### Server

```sh
cd server
npm install
npm run dev
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
* [Express](http://expressjs.com/)
* [Knex.js](http://knexjs.org/)
  * A "batteries included" SQL query builder for Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle, and Amazon Redshift designed to be flexible, portable, and fun to use
* [Socket.io](https://socket.io/)
  * Realtime server events
* [Multer](https://github.com/expressjs/multer)
  * Node.js middleware for handling multipart/form-data.
* [Sharp](https://sharp.pixelplumbing.com/)
  * High performance Node.js image processing

#### Front-end


##### Web

* [Vue.JS](https://vuejs.org/)
* [Quasar](https://quasar.dev/)
* [socket.io-client](https://github.com/socketio/socket.io-client)
  * Realtime client
