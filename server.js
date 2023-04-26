//require dotenv
require('dotenv').config();
// Connect to the database 
require('./config/database');

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
//logger middleware
const logger = require('morgan');


const app = express();
// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const PORT = process.env.PORT || 3001;

//* Config 
// logger middleware 
app.use(logger('dev'));
// JSON payload middleware (for data coming from frontend functions)
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
// checks if token was sent and sets a user data on the req (req.user)
app.use(require('./config/checkToken'));

// * ALl API routes (from separate routes page) 
app.use('/api/users', require('./routes/api/users'));



// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });



app.listen(PORT, function() {
    console.log(`Express app running on port ${PORT}`)
  });