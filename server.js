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

app.locals.title = 'BYOBlockchain';

const requireHTTPS = (req, res, next) => {
  if (req.headers['x-forwarded=proto'] !== 'https' && process.env.NODE_ENV === 'production') {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}

// app.use(requireHTTPS);

app.get('/', (request, response) => {
  response.send('BYOB!!!!!!')
});

app.get('/api/v1/transactions', (request, response) => {
  database('transactions').select()
    .then((transactions) => {
      response.status(200).json(transactions);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/wallets', (request, response) => {
  database('wallets').select()
    .then((wallets) => {
      response.status(200).json(wallets);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
})