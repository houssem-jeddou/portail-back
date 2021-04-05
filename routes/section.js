const express = require('express');
const router = express.Router();
const Section = require('../controller/section');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', Section.GetallSection);

router.post('/', auth, Section.CreateSection);

router.put('/:id', Section.UpdateSection);


router.get('/:id', Section.GetoneSection);

router.delete('/:id', [auth, admin], Section.DeleteSection);


module.exports = router;