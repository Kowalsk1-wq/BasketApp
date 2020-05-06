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

## Config

#### Client
* Create a mapbox token [here](https://www.mapbox.com)
* Update client/.env with your mapbox token

#### Server
* Update server/.env with your google client id and secret

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
npm start
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

* [React](https://reactjs.org/)
* [socket.io-client](https://github.com/socketio/socket.io-client)
  * Realtime client


##### Mobile
* [Xamarin/C#](https://dotnet.microsoft.com/apps/xamarin)
