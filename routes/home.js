const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'MY APP', message: 'hello' });
});
module.exports = router;