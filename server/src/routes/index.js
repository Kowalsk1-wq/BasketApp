const routes = require('express').Router();
const multer = require("multer");

const multerConfig = require("../config/multer");

const verifyJWT = require('../middlewares/verifyJWT');
const ResizeFile = require('../middlewares/resize');

const AppController = require('../controllers/AppController');
const AuthController = require('../controllers/AuthController');
const EvpController = require('../controllers/EvpController');
const PostController = require('../controllers/PostController');

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

routes.get('/posts/all', verifyJWT, PostController.listAll);
routes.get('/posts', verifyJWT, PostController.listWithoutMe);
routes.get('/posts/me', verifyJWT, PostController.listMe);
routes.post('/posts', verifyJWT, ResizeFile, multer(multerConfig).single("file"), PostController.create);
routes.delete('/posts/:id', verifyJWT, PostController.delete);

module.exports = routes;
