var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser');
var router = require('./routers');
var checkTokenList = require('./loop.js');
require('dotenv').config();
const http = require("http");
const cors = require("cors");
var app = express();

// const socketUtils = require("./utils/socketUtils");

const server = http.createServer(app);
// const io = socketUtils.sio(server);
// socketUtils.connection(io);

var HOST_NAME = process.env.DB_URL;

mongoose.connect(HOST_NAME).catch(error => console.error("error", error.message));
app.use(cors({origin: "*"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api', router);

server.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));

checkTokenList();