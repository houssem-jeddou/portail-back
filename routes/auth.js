const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');

router.post('/', authController.Auth)

//private key to create digital signature
module.exports = router;