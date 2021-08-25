const express = require('express');
const router = express.Router();
const { googleGet } = require('./controller/controller');

router.get('/googleAPI', googleGet);


module.exports = router;