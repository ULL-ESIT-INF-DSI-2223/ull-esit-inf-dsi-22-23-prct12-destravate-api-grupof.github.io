/*import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import app from '../dist/serverTest.js';
import { userModel } from '../dist/models/userSchema.js';
import { expect } from 'chai';
import startServer from '../dist/index.js';
import 'mocha'



chai.use(chaiHttp);
describe('User routes', () => {
    let _idTestUser: string;
    let server: any;
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
      before((done) => {
        server = app.listen(4000, () => {
          console.log(`Server running on port 4000`);
          done();
        });
      });
      
    describe('POST /:user', () => {
        //Crear usuarios
        it('should add a testUser1', (done) => {
        chai
            .request(app)
            .post(`/users/user`)
            .set('Content-Type', 'application/json')
            .send({id: testUser1.id, name : testUser1.name, activities : testUser1.activities})
            .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message', 'Usuario creado correctamente');
            _idTestUser = res.body.user._id
            done();
            });
        });
        it('should add a testUser2', (done) => {
            chai
                .request(app)
                .post(`/users/user`)
                .set('Content-Type', 'application/json')
                .send({id: testUser2.id, name : testUser2.name, activities : testUser2.activities})
                .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message', 'Usuario creado correctamente');
                done();
                });
            });
       
    //Errores al crear usuarios
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
    //Modificar usuarios
    describe('PATCH /:user', () => {
        it('Should change name of testUser1', (done) => {
            chai
                .request(app)
                .patch(`/users/user/${_idTestUser}`)
                .set('Content-Type', 'application/json')
                .send({name : "pepazo"})
                .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
                });
            });
        it('Should change name of testUser2', (done) => {
                chai
                    .request(app)
                    .patch(`/users/user/?id=userTest2`)
                    .set('Content-Type', 'application/json')
                    .send({name : "pepazo"})
                    .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                    });
                });
    });
    //Obtener usuarios
    describe('GET /:user', () => {
        it('should all the users', (done) => {
            chai
                .request(app)
                .get(`/users/users`)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                expect(res).to.have.status(200);
                done();
                });
            });
            it('should get testUser1 by id', (done) => {
                chai
                    .request(app)
                    .get(`/users/user/${_idTestUser}`)
                    .set('Content-Type', 'application/json')
                    .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                    });
                });
                it('should get testUser2 by _query', (done) => {
                    chai
                        .request(app)
                        .get(`/users/user/?id=userTest2`)
                        .set('Content-Type', 'application/json')
                        .end((err, res) => {
                        expect(res).to.have.status(200);
                        done();
                        });
                    });
    });
    //Borrar usuarios
    
    describe('Delete /?user', () => {
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
    
    after(async () => {
        console.log('Closing server');
        await new Promise<void>((resolve) => {
          server.close(() => {
            console.log('Server closed');
            resolve();
          });
        });
      
        console.log('Closing mongoose connection');
        await mongoose.connection.close();
        console.log('Mongoose connection closed');
      });
      
});      */