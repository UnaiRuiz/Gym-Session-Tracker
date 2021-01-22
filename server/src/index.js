require('dotenv').config();
const express = require("express");
var path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./config/db.config.js')

// Initializations
const app = express();

// Views (from React)
app.get('*', (req, res) => {
  res.send(express.static(path.join(__dirname, '../../client/build/index.html')))  ;
});


// Settings
app.set("port", process.env.PORT || 5000);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use(require('./helpers/auth'))
app.use(require('./routes/gymsession.routes'))
app.use(require('./routes/user.routes'))

// Server is listening
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});