require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require("path");
const mongoose = require("mongoose");
require('./config/db.config.js')

// Initializations
const app = express();

// Settings
app.set("port", process.env.PORT || 5000);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.urlencoded({ extended: false }));

// Routes
app.use(require('./routes/gymsession.routes'))
//app.use(require('./routes/user.routes'))

// Server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
    console.log('Environment:', process.env.NODE_ENV);
  });