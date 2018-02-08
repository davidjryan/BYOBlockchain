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
        console.log(response)
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.res.should.be.a('object');
      })
      .catch(err => {
        throw err;
      });
    });
  });

});