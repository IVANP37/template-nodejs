const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require("helmet");
const bodyParser = require('body-parser');

const app = express();
var cors = require("cors");

const fs = require('fs');
const AWS = require('aws-sdk');

const ID = 'AKIAVP2QD2SUQEOFDSWP'
const SECRET = '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';

// settings
const port= process.env.PORT || 4000;

// middlewares
app.use(cors());
app.use (helmet());// Header security
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', require('./app/routes/router'));




// static files
app.use(express.static(__dirname + '/public'));

// starting the server

app.listen(port, () => {
  console.log("App is running on port " + port);
});



