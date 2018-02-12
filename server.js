const express = require('express');

const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.locals.title = 'BYOBlockchain';

const requireHTTPS = (req, res, next) => {
  if (req.headers['x-forwarded=proto'] !== 'https' && process.env.NODE_ENV === 'production') {
    return res.redirect(`https://${req.get('host')}${req.url}`);
  }
  next();
};

if (process.env.NODE_ENV === 'production') {
  app.use(requireHTTPS); 
  app.set('secretKey', process.env.secretKey); 
} else {
  app.set('secretKey', 'sdlfk');
}

app.post('/authenticate', (request, response) => {
  const email = request.body.email;
  const appName = request.body.appName;

  if (!email || !appName) {
    return response.status(422).json('Error: You are missing a required field');
  }

  const token = jwt.sign({ email, appName }, app.get('secretKey'), { expiresIn: '48h' });
  return response.status(201).json(token);
});

const checkAuth = (request, response, next) => {
  const { token } = request.headers;

  if (!token) {
    return response.status(403).json('Error: You must be authorized to hit this endpoint.');
  }

  jwt.verify(token, app.get('secretKey'), (error) => {
    if (error) {
      return response.status(403).json('Error: Invalid Token');
    } else {
      next();  
    }
  });
};

const checkAdmin = (request, response, next) => {
  const { token } = request.headers;

  jwt.verify(token, app.get('secretKey'), (error, decoded) => {
    if (error) {
      return response.status(403).json('Error: Invalid Token');
    } else if (decoded.email.includes('@turing.io')) {
      next();
    } else {
      return response.status(403).json('Error: You are not authorized');
    }
  });
};

//----- Open routes -----------------------------//


app.get('/', (request, response) => {
  response.send('BYOB!!!!!!');
});

app.get('/api/v1/transactions', (request, response) => {
  database('transactions').select()
    .then((transactions) => {
      response.status(200).json(transactions);
    })
    .catch((error) => {
      response.status(404).json({ error });
    });
});

app.get('/api/v1/wallets', (request, response) => {
  database('wallets').select()
    .then((wallets) => {
      response.status(200).json(wallets);
    })
    .catch((error) => {
      response.status(404).json({ error });
    });
});

app.get('/api/v1/wallets/:id', (request, response) => {
  const { id } = request.params;

  database('wallets').where({ id }).first()
    .then((wallet) => {
      if (!wallet) {
      response.status(404).json({ error: 'Not found'});
      } else {
      response.status(200).json(wallet);  
      }
    })
    .catch((error) => {
      console.log(error)
      response.status(422).json({ error });
    });
});

app.get('/api/v1/transactions/:id', (request, response) => {
  const { id } = request.params;

  database('transactions').where({ id }).first()
    .then((transaction) => {
      if (!transaction) {
      response.status(404).json({ error: 'Not found'});

    } else {
      response.status(200).json(transaction);
    }
    })
    .catch((error) => {
      response.status(422).json({ error });
    });
});



//----- Protected routes -----------------------------//


if (process.env.NODE_ENV !== 'test') {
  app.use(checkAuth);
}

if (process.env.NODE_ENV !== 'test') {
  app.use(checkAdmin);
}

app.post('/api/v1/wallets', (request, response) => {
  const wallet = request.body;

  for (const requiredParams of ['address', 'balance']) {
    if (!wallet[requiredParams]) {
      return response.status(422).json({
        error: `You are missing ${requiredParams}`
      });
    }
  }

  database('wallets').insert(wallet, 'id')
    .then(wallet => response.status(201).json({ id: wallet[0] }))
    .catch(error => response.status(404).json({ error }));
});

app.post('/api/v1/transactions', (request, response) => {
  const transaction = request.body;

  for (const requiredParams of ['txHash', 'amount', 'to', 'from']) {
    if (!transaction[requiredParams]) {
      return response.status(422).json({
        error: `You are missing ${requiredParams}`
      });
    }
  }

  database('transactions').insert(transaction, 'id')
    .then(transactionId => response.status(201).json({ id: transactionId[0] }))
    .catch(error => response.status(422).json({ error }));
});

app.patch('/api/v1/transactions/:id', (request, response) => {
  const { id } = request.params;
  const { amount } = request.body;

  database('transactions').where({ id }).update({ amount })
    .then((transaction) => {
      if (!transaction) {
      response.status(404).json({ error: 'Not found' });
      }
      else {
      response.status(200).json(transaction);
      }
    })
    .catch((error) => {
      response.status(422).json({ error });
    });
});

app.patch('/api/v1/wallets/:id', (request, response) => {
  const { id } = request.params;
  const { balance } = request.body;

  database('wallets').where({ id }).update({ balance })
    .then((wallet) => {
      if (!wallet) {
      response.status(404).json({ error: 'Wallet not found' });
      }
      else {
      response.status(200).json();
      }
    })
    .catch((error) => {
      response.status(422).json({ error });
    });
});

app.delete('/api/v1/transactions/:id', (request, response) => {
  const { id } = request.params;

  database('transactions').where({ id }).del()
    .then((transaction) => {
      response.status(200).json(transaction);
    })
    .catch((error) => {
      response.status(422).json({ error });
    });
});

app.delete('/api/v1/wallets/:id', (request, response) => {
  const { id } = request.params;
  database('transactions').where({ to: id }).orWhere({ from: id }).del()

    .then(() => {
      database('wallets').where({ id }).del()
        .then((wallet) => {
          if (!wallet) {
          response.status(404).json({ error: 'No wallet found' });
          }
          else {
          response.status(200).json(wallet);
          }
        })
        .catch((error) => {
          response.status(422).json({ error });
        });
    });
});

app.listen(app.get('port'), () => {
  /* eslint-disable no-console */
  console.log(`${app.locals.title} is running on ${app.get('port')}. env: ${environment}`);
});

module.exports = app;
