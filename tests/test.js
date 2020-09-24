const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);
chai.should();

describe("Contacts", () => {
    describe("GET /", () => {
        it("should get all contacts", (done) => {
            chai.request(app)
                .get('/api/contacts/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("should get a single contact", (done) => {
            const id = "5f6ab423d135730b11bab8d4";
            chai.request(app)
                .get(`/api/contacts/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('object');
                    res.body.data.should.have.property('_id').equal(id);
                    done();
                });
        });
        it("should not get any contact", (done) => {
            const id = "wrongid";
            chai.request(app)
                .get(`/api/contacts/${id}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
  describe("POST, PUT, DELETE /", () => {
    let id = '';
    it("should add new contact", (done) => {
      chai.request(app)
        .post('/api/contacts/')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({name: 'test', gender: 'male', email: 'test@gmail.com', phone: '12345678'})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.have.property('name').equal('test');
          res.body.data.should.have.property('_id');
          id = res.body.data['_id'];
          done();
        });
    });
    it("should edit contact", (done) => {
      chai.request(app)
        .put(`/api/contacts/${id}`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({name: 'test', gender: 'female', email: 'test@gmail.com', phone: '12345678'})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.have.property('name').equal('test');
          res.body.data.should.have.property('_id').equal(id);
          res.body.data.should.have.property('gender').equal('female');
          done();
        });
    });
    it("should delete contact", (done) => {
      chai.request(app)
        .delete(`/api/contacts/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});