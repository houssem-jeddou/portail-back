const express = require('express');
const router = express.Router();
const PubController = require('../controller/publication');
const PublicationController = require('../controller/pub');
const addTag = require('../middleware/addTag');
//les requete post
router.post('/',addTag.addProduct ,PubController.CreatePublication);
//modification 
router.put('/:id', PubController.UpdatePublication);
//suppression 
router.delete('/:id', PubController.DeletePublication);
// get by id
router.get('/get/:id', PublicationController.GetonePublication);
//get all
router.get('/', PubController.GetAllPublication);
//get renting pub
router.get('/renting', PubController.GetRentingPub);
//get renting pub
router.get('/diploma', PubController.GetDiplomaPub);
//search
router.get('/search/:query',PubController.SearchPublication);

module.exports = router;