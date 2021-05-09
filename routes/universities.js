const express = require('express');
const router = express.Router();
const Uni = require('../controller/universities');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', Uni.GetallUni);

router.post('/', Uni.CreateUni)

router.put('/:id', Uni.UpdateUni)


router.get('/:id', Uni.GetoneUni)

router.delete('/:id', Uni.DeleteUni)


module.exports = router;