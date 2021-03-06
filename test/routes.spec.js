process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const knex = require('../db/knex');
chai.use(chaiHttp);


describe('Client Routes', () => {
  it('should return the homepage', () => {
    return chai.request(server)
    .get('/')
    .then(response => {
      response.should.have.status(200);
    })
    .catch(error => {
      throw error;
    });
  });

  it('should return a 404 if the page is not found', () => {
    return chai.request(server)
    .get('/sad')
    .then(response => {
      response.should.have.status(404);
    });
  });

});

describe('API Routes', () => {

  beforeEach((done) => {
    knex.seed.run()
    .then(() => {
      done();
    });
  });

  describe('GET api/v1/wallets', () => {
    it('should return all the wallets', () => {
      return chai.request(server)
      .get('/api/v1/wallets')
      .then(response => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(25);
        response.res.should.be.a('object');
        response.body[0].should.have.property('address');
        response.body[0].address.should.equal('0xb794f5ea0ba39494ce839613fffba74279579268');
        response.body[0].should.have.property('balance');
        response.body[0].balance.should.equal(100);
      })
      .catch(err => {
        throw err;
      });
    });
  });


  describe('GET api/v1/wallets/:id', () => {
    it('should return a single wallet', () => {
      return chai.request(server)
      .get('/api/v1/wallets/1')
      .then(response => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
      })
      .catch(error => {
        throw error;
      })
    })

    it('should return 404 if a single wallet is not found', () => {
      return chai.request(server)
      .get('/api/v1/wallets/300')
      .then(response => {
        response.should.have.status(404);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.error.should.equal('Not found')
      })
      .catch(error => {
        throw error;
      })
    })
  })

  describe('POST api/v1/wallets', () => {

    it('should post a wallet', () => {
      return chai.request(server)
      .post('/api/v1/wallets')
      .send({
        address: '12345',
        balance: '1000'
      })
      .then(response => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('id')
      })
      .catch(error => {
        throw error;
      })
    })

    it('should return a 422 when a required param is missing', () => {
      return chai.request(server)
      .post('/api/v1/wallets')
      .send({
        address: '54321'
      })
      .then(response => {
        response.should.have.status(422);
      })
      .catch(error => {
        throw error;
      })
    })

  })

  describe('DELETE api/v1/wallets', () => {
    let walletToDelete;
    beforeEach( done => {
      knex('wallets').first().then(wallet => {
        walletToDelete = wallet
        done()
      })
    })

    it('should delete a wallet', () => {
      return chai.request(server)
      .delete(`/api/v1/wallets/${walletToDelete.id}`)
      .then(response => {
        response.should.have.status(204)
      })
      .catch(error => {
        throw error;
      })
    })

    it('should return a 404 if a wallet to delete is not found', () => {
      return chai.request(server)
      .delete('/api/v1/wallets/300')
      then(response => {
        response.should.have.status(404)
      })
      .catch(error => {
        throw error;
      })
    })
  })  

  describe('DELETE api/v1/transactions', () => {
    let transToDelete;
    beforeEach( done => {
      knex('transactions').first().then(transaction => {
        transToDelete = transaction
        done()
      })
    })

    it('should delete a transaction', () => {
      return chai.request(server)
      .delete(`/api/v1/wallets/${transToDelete.id}`)
      then(response => {
        response.should.have.status(204)
      })
      .catch(error => {
        throw error;
      })
    })

    it('should return a 404 if a transaction to delete is not found', () => {
      return chai.request(server)
      .delete('/api/v1/transactions/300')
      then(response => {
        response.should.have.status(404)
      })
      .catch(error => {
        throw error;
      })
    })
  })

  describe('GET api/v1/transactions', () => {
    it('should return all transactions', () => {
    return chai.request(server)
      .get('/api/v1/transactions')
      .then(response => {
        response.should.have.status(200);
        response.body.should.be.a('array');
        response.body[0].should.have.property('txHash');
        response.body[0].txHash.should.equal('baff34eaf5d64d70e6b8a41c81b6a2163aa9afe020d6e8f6fee8a7007c15ead6');
        response.body[0].should.have.property('amount');
        response.body[0].amount.should.equal(5);
        response.body[0].should.have.property('to');
        response.body[0].to.should.equal(1);
        response.body[0].should.have.property('from');
        response.body[0].to.should.equal(1);
      })
      .catch(error => {
        throw error;
      })
    })
  })  

  describe('GET api/v1/transactions/:id', () => {
    it('should return one transaction', () => {
    return chai.request(server)
      .get('/api/v1/transactions/1')
      .then(response => {
        response.should.have.status(200);
        response.should.be.a('object');
      })
      .catch(error => {
        throw error;
      })
    })

    it('should return 404 if a single transaction is not found', () => {
      return chai.request(server)
      .get('/api/v1/transactions/300')
      .then(response => {
        response.should.have.status(404);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.error.should.equal('Not found')
      })
      .catch(error => {
        throw error;
      })
    })

  })

  describe('POST api/v1/transactions', () => {

    it('should post a transaction', () => {
    return chai.request(server)
      .post('/api/v1/transactions')
      .send({
        txHash: '54321',
        amount: '500',
        to: '1',
        from: '2'
      })
      .then(response => {
        response.should.have.status(201);
        response.should.be.a('object');
        response.body.should.have.property('id');
      })
      .catch(error => {
        throw error;
      })
    })

    it('should return a 422 when a required param is missing', () => {
      return chai.request(server)
      .post('/api/v1/transactions')
      .send({
        txHash: '54321'
      })
      .then(response => {
        response.should.have.status(422);
      })
      .catch(error => {
        throw error;
      })
    })

  })

  describe('PATCH api/v1/transactions/:id', () => {
    it('should edit one transaction amount', () => {
      return chai.request(server)
        .patch('/api/v1/transactions/1')
        .send({
          amount: '10000'
        })
        .then(response => {
          response.should.have.status(200);
        })
        .catch(error => {
          throw error;
        })
    })

    it('should return a 404 if the transaction is not found', () => {
      return chai.request(server)
        .patch('/api/v1/transactions/300')
        .send({
          amount: '1000'
        })
        .then(response => {
          response.should.have.status(404);
          response.body.should.be.a('object');
        })
        .catch(error => {
          throw error
        })
    })

  })

  describe('PATCH api/v1/wallets/:id', () => {
    it('should edit one wallet balance', () => {
      return chai.request(server)
        .patch('/api/v1/wallets/1')
        .send({
          balance: '10000'
        })
        .then(response => {
          response.should.have.status(200);
          response.should.be.a('object');
        })
        .catch(error => {
          throw error;
        })
    })

    it('should return a 404 if the wallet is not found', () => {
      return chai.request(server)
        .patch('/api/v1/wallets/300')
        .send({
          balance: '45'
        })
        .then(response => {
          response.should.have.status(404);
          response.should.be.a('object');
        })
        .catch(error => {
          throw error
        })
    })

  })

});