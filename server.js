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

app.get('/api/v1/wallets/:id', (request, response) => {
  const { id } = request.params;

  database('wallets').where({ id }).select()
    .then((wallet) => {
      response.status(200).json(wallet);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/wallets', (request, response) => {
  const wallet = request.body;

  for ( let requiredParams of ['address', 'balance']) {
    if(!wallet[requiredParams]) {
      return response.status(422).json({
        error: `You are missing ${requiredParams}`
      })
    }
  }

  database('wallets').insert(wallet, 'id')
  .then(wallet => {
    return response.status(201).json({ id: wallet[0] })
  })
  .catch(error => {
    return response.status(500).json({ error })
  })
})

app.post('/api/v1/transactions', (request, response) => {
  const transaction = request.body;

  for ( let requiredParams of ['txHash', 'amount', 'to', 'from']) {
    if(!transaction[requiredParams]) {
      return response.status(422).json({
        error: `You are missing ${requiredParams}`
      })
    }
  }

  database('transactions').insert(transaction, 'id')
  .then(transaction => {
    return response.status(201).json({ id: transaction[0] })
  })
  .catch(error => {
    return response.status(500).json({ error })
  })
})

app.get('/api/v1/transactions/:id', (request, response) => {
  const { id } = request.params;

  database('transactions').where({ id }).select()
    .then((transaction) => {
      response.status(200).json(transaction);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.patch('/api/v1/transactions/:id', (request, response) => {
  const { id } = request.params;
  const { amount } = request.body

  database('transactions').where('id', '=', id).update({ amount })
    .then((transaction) => {
      response.status(200).json(transaction.id);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });

  // database.transaction(function (trx) {
  //   database('transactions').transacting(trx).insert({ name: 'Old Books' })
  //     .then(function (resp) {
  //       var id = resp[0];
  //       return someExternalMethod(id, trx);
  //     })
  //     .then(trx.commit)
  //     .catch(trx.rollback);
  // })
  //   .then(function (resp) {
  //     console.log('Transaction complete.');
  //   })
  //   .catch(function (err) {
  //     console.error(err);
  //   });
})

app.patch('/api/v1/wallets/:id', (request, response) => {
  const { id } = request.params;
  const { balance } = request.body

  database('wallets').where('id', '=', id).update({ balance })
    .then((wallet) => {
      response.status(200).json(wallet);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });

  // database.transaction(function (trx) {
  //   database('transactions').transacting(trx).insert({ name: 'Old Books' })
  //     .then(function (resp) {
  //       var id = resp[0];
  //       return someExternalMethod(id, trx);
  //     })
  //     .then(trx.commit)
  //     .catch(trx.rollback);
  // })
  //   .then(function (resp) {
  //     console.log('Transaction complete.');
  //   })
  //   .catch(function (err) {
  //     console.error(err);
  //   });
})

app.delete('/api/v1/transactions/:id', (request, response) => {
  const { id } = request.params;

  database('transactions').where({ id }).del()
    .then((transaction) => {
      response.status(200).json(transaction);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.delete('/api/v1/wallets/:id', (request, response) => {
  const { id } = request.params;

  database('wallets').where({ id }).del()
    .then((wallet) => {
      response.status(200).json(wallet);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}. env: ${environment}`);
})

module.exports = app;