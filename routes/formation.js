const express = require('express');
const router = express.Router();
const Formation = require('../controller/formation');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', Formation.GetallFormation);

router.post('/', Formation.CreateFormation)

router.put('/:id', Formation.UpdateFormation)


router.get('/:id', Formation.GetoneFormation)

router.delete('/:id', Formation.DeleteFormation)


module.exports = router;