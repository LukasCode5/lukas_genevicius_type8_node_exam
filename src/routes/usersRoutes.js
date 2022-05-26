const express = require('express');
const controller = require('../controllers/usersControllers');
const {
  validateUser,
  validateLoginUser,
  validateToken,
  validateTokenPost,
} = require('../middleWare');

const usersRoutes = express.Router();

usersRoutes.post('/users/register', validateUser, controller.registerUser);
usersRoutes.post('/users/login', validateLoginUser, controller.loginUser);
usersRoutes.post('/accounts', validateTokenPost, controller.addToAccounts);

module.exports = usersRoutes;
