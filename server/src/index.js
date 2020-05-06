require('dotenv').config();
const express = require('express');
const app = express();
const bp = require('body-parser');
const chalk = require('chalk');
const cors = require('cors');
const figlet = require('figlet');
const { version } = require('../package.json');

const routes = require('./routes');

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(cors());
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json({ limit: '4mb' }));

app.use(routes);

io.on('connection', socket => {
  console.log(`Socket Connected: ${socket.id}`);
});

server.listen(4000, () => {
  console.log(`${chalk.green(figlet.textSync('BasketApp', {
    font: 'Doom',
    horizontalLayout: 'full'
  }))} ${chalk.green(version)}`)
});
