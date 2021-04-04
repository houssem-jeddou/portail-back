const express = require('express');
const router = express.Router();
const userController = require('../controller/users');

router.get('/me', userController.Me)

router.post('/', userController.CreateUser)
//payload are the data we store insie the token 

module.exports = router;