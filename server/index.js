const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('/Users/GriffinGeorgiadis/Desktop/HackReactor/brewery-finder/public'));

app.use(router);


app.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
});