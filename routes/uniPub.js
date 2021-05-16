const express = require('express');
const router = express.Router();
const UniPubController = require('../controller/uniPub');

//we pass the uni id in the url 
router.get('/:id', UniPubController.GetPubsForUni);

module.exports = router;