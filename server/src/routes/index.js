const routes = require('express').Router();
const verifyJWT = require('../utils/verifyJWT');

const AppController = require('../controllers/AppController');
const AuthController = require('../controllers/AuthController');
const EvpController = require('../controllers/EvpController');

routes.get('/', AppController.info);

routes.get('/users', verifyJWT, AuthController.list);
routes.post('/users', AuthController.create);
routes.post('/users/auth', AuthController.login);
routes.post('/users/auth/activate', AuthController.active);
routes.put('/users', verifyJWT, AuthController.update);
routes.delete('/users', verifyJWT, AuthController.delete);

routes.get('/evps', verifyJWT, EvpController.list);
routes.post('/evps', verifyJWT, EvpController.create);
routes.delete('/evps/:id', verifyJWT, EvpController.delete);

module.exports = routes;
