process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const knex = require('../db/knex')
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
      response.should.have.status(404)
    })
  })

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
      })
      .catch(err => {
        throw err;
      });
    });
  });

  describe('GET api/v1/wallets', () => {
    it('should return a single wallet', () => {
      return chai.request(server)
      .get('/api/v1/wallets/1')
      .then(response => {
        // console.log(response)
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.res.should.be.a('object');
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
        console.log(response.body.id)
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
      then(response => {
        response.should.have.status(204)
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

    it('should delete a wallet', () => {
      return chai.request(server)
      .delete(`/api/v1/wallets/${transToDelete.id}`)
      then(response => {
        response.should.have.status(204)
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
        response.should.be.a('object');
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
  })

  describe('POST api/v1/transactions', () => {
    // let walletToPost;
    // beforeEach( done => {
    //   knex('wallets').then(wallet => {
    //     walletToPost = wallet
    //     done()
    //   })
    // })

    it('should post a transaction', () => {
    return chai.request(server)
      .post('/api/v1/transactions')
      .send({
        txHash: '54321',
        amount: '500',
        // to: `${walletToPost[0].id}`,
        // from: `${walletToPost[1].id}`
        to: '1',
        from: '2'
      })
      .then(response => {
        // console.log(response)
        response.should.have.status(201);
        response.should.be.a('object');
        response.body.should.have.property('id');
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
          response.should.be.a('object');
        })
        .catch(error => {
          throw error;
        })
    })
  })

  describe('PATCH api/v1/wallets/:id', () => {
    it('should edit one transaction amount', () => {
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
  })

});