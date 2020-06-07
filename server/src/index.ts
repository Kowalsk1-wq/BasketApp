import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import Routes from './routes';

import { prisma } from './config/prisma';

(async () => {
  const app = express();

  app.use(cors());
  app.use(cookieParser());
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(Routes);

  await prisma.connect().then(() => {
    console.log('Database Connected!!');
  }).catch(err => {
    console.log(`Erro no Banco || ${err}`);
  });

  app.listen(4040, () => {
    console.log('Server Running on Port 4040!');
  })
})();
