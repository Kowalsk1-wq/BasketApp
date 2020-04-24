# EnvX

Share images in real time, join the community and do good to the environment!

## Features

* [x] JWT Auth
  * [x] Cadastro de Usuário
  * [x] Confirmação do Email do Usuário (Ativação) 
  * [x] Login de Usuário
  * [x] Listagem de Usuários (excluindo o usuário vigente)
  * [x] Atualização de Dados Cadastrais do Usuário
  * [x] LogOut do Usuário
  * [x] Remoção da Conta do Usuário
* [ ] Visualizar um Mapa com sua localização atual (em tempo real)
  * [ ] Interação entre Usuários em um Mapa - Com Organização em ChatRooms
* [ ] Live Chat
  * [ ] Quando a tarefa que estiver no EnvPoint for concluida, o prêmio proposto será divido entre os Usuários da ChatRoom.

## Config

#### Client
* Create a mapbox token [here](https://www.mapbox.com)
* Update client/.env with your mapbox token

#### Server
* Create a google client id and secret [here](https://console.developers.google.com/)
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
* [socket.io](https://socket.io/)
  * Realtime server events

#### Front-end
* [React](https://reactjs.org/)
* [socket.io-client](https://github.com/socketio/socket.io-client)
  * Realtime client
* [reactn](https://github.com/CharlesStover/reactn)
  * React, but with built-in global state management.
* [figbird](https://humaans.github.io/figbird/)
  * Declarative data fetching for Feathers and React
* [react-map-gl](https://uber.github.io/react-map-gl/#/)
  * React components for Mapbox GL JS
* [react-bootstrap](https://react-bootstrap.github.io) with [bootswatch](https://bootswatch.com/) [lux theme](https://bootswatch.com/lux/)
