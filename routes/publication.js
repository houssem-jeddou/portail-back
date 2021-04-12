const express = require('express');
const router = express.Router();
const PubController = require('../controller/pub');
//les requete post
router.post('/', PubController.CreatePublication);
//modification 
router.put('/:id', PubController.UpdatePublication);
//suppression 
router.delete('/:id', PubController.DeletePublication);
// get by id
router.get('/:id', PubController.GetonePublication);
//get all
router.get('/', PubController.GetAllPublication);

module.exports = router;