import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

import app from '../app'

chai.use(chaiHttp)

describe("PeopleAPI", () => {

    describe('When invalid route is called', () => {
        it("Should return status-code 404", async () => {
            return chai.request(app).get("/invalid-rote").send().then(res => {
                chai.expect(res.status).to.equal(404);
            })
        });

        it("Should return empty body", async () => {
            return chai.request(app).get("/invalid-rote").send().then(res => {
                console.log(res.body)
                chai.expect(res.body).to.eql({});
            })
        });
    });

    describe('When /people is called', () => {
        it("Should return status-code 200", async () => {
            return chai.request(app).get("/people").send().then(res => {
                chai.expect(res.status).to.equal(200);
            })
        });
        
        it("Should return array data", async () => {
            return chai.request(app).get("/people").send().then(res => {
               chai.expect(res.body).to.be.an('array')
            })
        });

    });
});