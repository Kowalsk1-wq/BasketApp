import multer from 'multer';
import path from 'path';
const ImgurStorage = require('multer-storage-imgur');

import verifyJWT from '../middlewares/verifyJWT';

import { Router } from 'express';
const routes = Router();

const multerConfig = {
  dest: path.resolve(__dirname, "..", "..", "tmp"),
  storage: ImgurStorage({ clientId: process.env.IMGUR_CLIENT_ID }),
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req: any, file: any, cb: any) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif"
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  }
};

/**
* @Controllers
*/
import ProfileController from '../controllers/ProfileController';
import DonationController from '../controllers/DonationController';


/**
* @Routes
*/

routes.get('/api', (
    _request: any,
    response: any
  ) => response.status(200).json({ connected: true }))

routes.get('/sessions/pf', verifyJWT, ProfileController.listPf);
routes.post('/sessions/pf', multer(multerConfig).single('file'), ProfileController.createPf);
routes.post('/sessions/auth/pf', ProfileController.loginPf);
routes.put('/sessions/pf/active/:user_cpf', ProfileController.activePf);
routes.delete('/sessions/pf', verifyJWT, ProfileController.removePf);

routes.get('/sessions/pj', verifyJWT, ProfileController.listPj);
routes.post('/sessions/pj', multer(multerConfig).single('file'), ProfileController.createPj);
routes.post('/sessions/auth/pj', ProfileController.loginPj);
routes.put('/sessions/pj/active/:user_cnpj', ProfileController.activePj);
routes.delete('/sessions/pj', verifyJWT, ProfileController.removePj);

routes.get('/sessions/ong', verifyJWT, ProfileController.listONG);
routes.post('/sessions/ong', multer(multerConfig).single('file'), ProfileController.createONG);
routes.post('/sessions/auth/ong', ProfileController.loginONG);
routes.put('/sessions/ong/active', ProfileController.activeONG);
routes.delete('/sessions/ong', ProfileController.removeONG);

routes.get('/donation/all', verifyJWT, DonationController.listAll);
routes.get('/donation/approved', verifyJWT, DonationController.listAllApproved);
routes.get('/donation/:number', verifyJWT, DonationController.findIn);
routes.post('/donation/new', verifyJWT, DonationController.store);
routes.put('/donation/:number', verifyJWT, DonationController.update);
routes.delete('/donation/:number', verifyJWT, DonationController.remove);

routes.post('/donation/me', verifyJWT, DonationController.findMe);

routes.put('/donation/:number/accept', DonationController.accept);
routes.delete('/donation/:number/sent', verifyJWT, DonationController.sented);

export default routes;