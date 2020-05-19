const routes = require('express').Router();
const multer = require("multer");

const multerConfig = require("../config/multer");

const verifyJWT = require('../middlewares/verifyJWT');

const AppController = require('../controllers/AppController');
const AuthController = require('../controllers/AuthController');
const OngController = require('../controllers/OngController');
const BasketController = require('../controllers/BasketController');
const DonationController = require('../controllers/DonationController/index.js');
const ApprovalController = require('../controllers/DonationController/ApprovalController.js');
const RejectionController = require('../controllers/DonationController/RejectionController.js');

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

routes.get('/baskets', verifyJWT, BasketController.list);
routes.get('/baskets/me', verifyJWT, BasketController.listMe);
routes.post('/baskets', verifyJWT, BasketController.create);
routes.delete('/baskets', verifyJWT, BasketController.delete);

routes.post('/baskets/:basket_id/donations', DonationController.store);

routes.post('/donations/:donation_id/approvals', ApprovalController.store);
routes.post('/donations/:donation_id/rejections', RejectionController.store);

module.exports = routes;
