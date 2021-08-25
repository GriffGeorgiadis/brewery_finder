const db = require('../db/db');
const axios = require('axios');

module.exports = {
  saveBrewery: (req, res) => {
    req.body.rating = parseInt(req.body.rating);
    console.log(req.body);
    console.log(req.body.name, req.body.address, req.body.rating);

    db.query(`INSERT INTO breweries (name, address, rating) VALUES ('${req.body.name}', '${req.body.address}', ${req.body.rating})`)
      .then((result) => {
        res.send(result.body);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  getMyBreweries: (req, res) => {
    db.query(`select * from breweries`)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  getGoogleMaps: (req, res) => {
    console.log(req.params.location)
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.params.location}4&radius=3000&type=bar&keyword=brewery&key=AIzaSyCeooniHCOE97VH-CCasQyFGHmbirRjCY0`)
      .then((result) => {
        var breweries = [];
        for (var i = 0; i < result.data.results.length; i++) {
          if (result.data.results[i].name.includes('Brew')) {
            breweries.push({ name: result.data.results[i].name, address: result.data.results[i].vicinity, rating: result.data.results[i].rating});
          }
        }
        res.send(breweries);
      })
      .catch((err) => {
        res.send(err);
      })
  }
};

