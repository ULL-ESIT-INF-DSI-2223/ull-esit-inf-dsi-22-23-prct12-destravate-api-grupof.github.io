import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../dist/index.js';
import { userModel } from '../dist/models/userSchema.js';
import { expect } from 'chai';
import { server } from '../dist/index.js';
import 'mocha'
import { notDeepEqual } from 'assert';


chai.use(chaiHttp);
describe('User routes', () => {
    let _idTestUser: string;
    const testUser1 = {
      id: "userTest1",
      name: 'Test',
      activities: 'Correr',
    };
    const testUser2 = {
        id: "userTest2",
        name: 'Test',
        activities: 'Correr',
      };

    describe('POST /:user', () => {
        it('should add a testUser1', (done) => {
        chai
            .request(app)
            .post(`/users/user`)
            .set('Content-Type', 'application/json')
            .send({id: testUser1.id, name : testUser1.name, activities : testUser1.activities})
            .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            expect(res.body).to.have.property('message', 'Usuario creado correctamente');
            _idTestUser = res.body.user._id
            done();
            });
        });
        describe('POST /:user', () => {
            it('should add a testUser2', (done) => {
            chai
                .request(app)
                .post(`/users/user`)
                .set('Content-Type', 'application/json')
                .send({id: testUser2.id, name : testUser2.name, activities : testUser2.activities})
                .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('message', 'Usuario creado correctamente');
                done();
                });
            });
    });
    describe('POST /:user', () => {
        it('should give us an error when try to add a new thats not correct', (done) => {
        chai
            .request(app)
            .post(`/users/user`)
            .set('Content-Type', 'application/json')
            .send({id: testUser1.id, name : testUser1.name, activities : testUser1.activities})
            .end((err, res) => {
            expect(res).to.have.status(500);
            done();
            });
        });
    });
    describe('Delete /:user', () => {
        it('should delete the tests user 1', (done) => {
        chai
            .request(app)
            .delete(`/users/user/${_idTestUser}`)
            .set('Content-Type', 'application/json')
            .end((err, res) => {
            expect(res).to.have.status(200);
            done();
            });
        });
    });
    describe('Delete /?user', () => {
        it('should delete the tests user 2', (done) => {
        chai
            .request(app)
            .delete(`/users/user/?id=userTest2`)
            .set('Content-Type', 'application/json')
            .end((err, res) => {
            expect(res).to.have.status(200);
            done();
            });
        });
    });

   /* after((done) => {
        server.close(done);
      });*/
});
});