const express = require('express');
const router = express.Router();
const PubController = require('../controller/publication');
//les requete post
router.post('/', PubController.CreatePub);
  //modification 
router.put('/:id',PubController.UpdatePub );
//suppression 
router.delete('/:id',PubController.DeletePub);
// get by id
router.get('/:id',PubController.GetonePub);
//get all
router.get('/',PubController.GetallPub);

module.exports = router;