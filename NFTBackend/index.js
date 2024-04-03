const express = require('express');
const nftRouter = require('./src/controller/NFTController');

const app = express();
const port = 4000;

app.use(express.json());
app.use(nftRouter);
app.use(express.json({
    limit : "50mb"
}));
app.use(express.urlencoded({
    limit:"50mb",
    extended: false
}));

app.listen(port);