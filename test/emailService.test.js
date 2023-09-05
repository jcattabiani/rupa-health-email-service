const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/server');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Email Service', () => {
  it('should return 200 OK for a valid email request', (done) => {
    chai.request(app)
      .post('/email')
      .send({
        to: 'jcattabiani1@gmail.com',
        to_name: 'Jack',
        from: 'jcattabiani1@gmail.com',
        from_name: 'jack',
        subject: 'A joke from me to me',
        body: '<h1>What would bears be without bees?</h1><p>Ears</p>'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return 400 Bad Request for an invalid email request', (done) => {
    chai.request(app)
      .post('/email')
      .send({
        to: 'jcattabiani1gmail.com',
        to_name: '',
        from: 'jcattabiani1@gmail.com',
        from_name: 'jack',
        subject: 'A joke from me to nobody',
        body: '<h1>What would bears be without bees?</h1><p>Ears</p>'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});
