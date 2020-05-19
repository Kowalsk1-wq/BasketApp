require('dotenv').config();
const express = require('express');
const app = express();
const bp = require('body-parser');
const chalk = require('chalk');
const cors = require('cors');
const figlet = require('figlet');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const Mongoose = require('mongoose');

const { version } = require('../package.json');

const routes = require('./routes');

Mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}, function (error) {
  if (!error) return;
  console.log('Falha na Conexão!', error);
});

let driver = Mongoose.connection;

driver.once('open', () => console.log('Database Connected!'));

io.on('connection', socket => {
	console.log('a user is connected', socket.id);
});

app.use(cors());
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json({ limit: '4mb' }));
app.use(routes);

app.listen(4000, () => {
  console.log(`${chalk.green(figlet.textSync('BasketApp', {
    font: 'Doom',
    horizontalLayout: 'full'
  }))} ${chalk.green(version)}`)
});
