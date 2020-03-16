const express = require('express');

const UserController = require('../controllers/user.controller');

const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.get('', UserController.fetchAllUsers);

router.post('/googleAuth', UserController.googleSSO);

router.post('/login', UserController.login);

router.post('/signup', UserController.signup);

module.exports = router;
