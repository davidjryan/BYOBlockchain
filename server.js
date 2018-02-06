const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

// We want to know if we're in development, testing, or production environment.  
// If we don't know, we'll assume we're in development.
const environment = process.env.NODE_ENV || 'development';

// Based on that environment, we'll fetch the database configuration from knexfile.js 
// for whatever environment we're in  and now our express app will be able to connect to it.
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.locals.title = 'palette-picker';

const requireHTTPS = (req, res, next) => {
  if (req.headers['x-forwarded=proto'] !== 'https' && process.env.NODE_ENV === 'production') {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}

app.use(requireHTTPS);

