const express = require('express');
const router = express.Router();
const Uni = require('../controller/universities');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', Uni.GetallUni);

router.post('/', auth, Uni.CreateUni)

router.put('/:id', Uni.UpdateUni)


router.get('/:id', Uni.GetoneUni)

router.delete('/:id', [auth, admin], Uni.DeleteUni)


module.exports = router;