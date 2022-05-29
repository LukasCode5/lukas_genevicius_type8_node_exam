const express = require('express');
const controller = require('../controllers/usersControllers');
const {
  validateUser,
  validateLoginUser,
  validateToken,
  validateTokenPost,
  validateBill,
  validateGroup,
} = require('../middleWare');

const usersRoutes = express.Router();

usersRoutes.post('/users/register', validateUser, controller.registerUser);
usersRoutes.post('/users/login', validateLoginUser, controller.loginUser);
usersRoutes.post('/accounts', validateTokenPost, controller.addToAccounts);
usersRoutes.get('/accounts', validateToken, controller.getAccountsAndGroups);
usersRoutes.post('/bills', validateBill, validateTokenPost, controller.postBill);
usersRoutes.get('/bills/:group_id', validateToken, controller.getBillsOfGroup);
// Extra routes
usersRoutes.get('/groups', controller.getGroups);
usersRoutes.post('/groups', validateGroup, validateTokenPost, controller.postGroup);

module.exports = usersRoutes;
