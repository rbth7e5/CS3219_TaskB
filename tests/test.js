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
                    res.body.data.should.have.lengthOf(2);
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
                    res.body.data.should.have.property('name').equal('Caijie');
                    done();
                })
                .catch(done);
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
});