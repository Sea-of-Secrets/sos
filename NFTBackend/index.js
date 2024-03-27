const express = require('express');
const nftRouter = require('./src/controller/NFTController');

const app = express();
const port = 4000;

app.use(express.json());
app.use(nftRouter);
app.listen(port);