const express = require('express');
const router = express.Router();
const { saveBrewery, getMyBreweries, getGoogleMaps, deleteBrewery } = require('./controller/controller');

router.post('/saveBrewery', saveBrewery);
router.post('/deleteBrewery', deleteBrewery);
router.get('/getBreweries', getMyBreweries);
router.get('/googleMaps/:location', getGoogleMaps)


module.exports = router;