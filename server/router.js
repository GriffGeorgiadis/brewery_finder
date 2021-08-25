const express = require('express');
const router = express.Router();
const { saveBrewery, getMyBreweries, getGoogleMaps } = require('./controller/controller');

router.post('/saveBrewery', saveBrewery);
router.get('/getBreweries', getMyBreweries);
router.get('/googleMaps/:location', getGoogleMaps)


module.exports = router;