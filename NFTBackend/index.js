const express = require('express');
const nftRouter = require('./src/controller/NFTController');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

app.use(nftRouter);

app.use( bodyParser.json({limit: '50mb'}) );
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit:50000
}));

app.listen(port);