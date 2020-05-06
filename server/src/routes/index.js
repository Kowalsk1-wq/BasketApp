const routes = require('express').Router();
const multer = require("multer");

const multerConfig = require("../config/multer");

const verifyJWT = require('../middlewares/verifyJWT');

const AppController = require('../controllers/AppController');
const AuthController = require('../controllers/AuthController');
const OngController = require('../controllers/OngController');
const ReqController = require('../controllers/RequestController');

routes.get('/', AppController.info);

routes.get('/users', verifyJWT, AuthController.list);
routes.post('/users', multer(multerConfig).single("file"), AuthController.create);
routes.post('/users/auth', AuthController.login);
routes.post('/users/auth/activate', AuthController.active);
routes.put('/users', verifyJWT, AuthController.update);
routes.delete('/users', verifyJWT, AuthController.delete);

routes.post('/ongs', multer(multerConfig).single("file"), OngController.create);
routes.post('/ongs/auth', OngController.login);
routes.post('/ongs/auth/activate', OngController.active);
routes.put('/ongs', verifyJWT, OngController.update);
routes.delete('/ongs', verifyJWT, OngController.delete);

routes.get('/requests', verifyJWT, ReqController.list);
routes.post('/requests', verifyJWT, ReqController.create);

module.exports = routes;
