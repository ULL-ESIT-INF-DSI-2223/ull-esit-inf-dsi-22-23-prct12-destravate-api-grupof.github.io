import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../dist/index.js';
import { expect } from 'chai';
import 'mocha'



chai.use(chaiHttp);
describe('Challenge routes', () => {
    let _idTestChallenge: string;
    let server: any;
    const testChallenge1 = {
      id: "ChallengeTest1",
      name: 'Test'
     
    };
    const testChallenge1Modi = {
        id: "ChallengeTest1",
        name: 'Test changed',
        
      }
    const testChallenge2 = {
        id: "ChallengeTest2",
        name: 'Test',
       
      };
      const testChallenge2Modi = {
        id: "ChallengeTest2",
        name: 'Test changed',
        
      }
      /*before((done) => {
        server = app.listen(4000, () => {
          console.log(`Server running on port 4000`);
            mongooseServer.then(() => {
            console.log('Connection to MongoDB server established');
            }).catch(() => {
            console.log('Unable to connect to MongoDB server');
            });

          done();
        });
      });*/
      
    describe('POST /:challenge', () => {
        //Crear usuarios
        it('should add a testChallenge1', (done) => {
        chai
            .request(app)
            .post(`/challenges/challenge`)
            .set('Content-Type', 'application/json')
            .send(testChallenge1)
            .end((err, res) => {
            _idTestChallenge = res.body.challenge._id
            console.log("GROUP: ")
            console.log(_idTestChallenge);
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            
            done();
            });
        });
        it('should add a testChallenge2', (done) => {
            chai
                .request(app)
                .post(`/challenges/challenge`)
                .set('Content-Type', 'application/json')
                .send(testChallenge2)
                .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
                });
            });
       
    //Errores al crear usuarios
    it('should give us an error when try to add a new thats not correct', (done) => {
        chai
            .request(app)
            .post(`/challenges/challenge`)
            .set('Content-Type', 'application/json')
            .send({id: testChallenge1.id, name : testChallenge1.name})
            .end((err, res) => {
            expect(res).to.have.status(500);
            done();
            });
        });
    });
    //Modificar usuarios
   describe('PATCH /:Challenge', () => {
        it('Should change name of testChallenge1 by id', (done) => {
            chai
                .request(app)
                .patch(`/challenges/challenge/${_idTestChallenge}`)
                .set('Content-Type', 'application/json')
                .send(testChallenge1Modi)
                .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
                });
            });
        it('Should change name of testChallenge2 by query', (done) => {
                chai
                    .request(app)
                    .patch(`/challenges/challenge/?id=ChallengeTest2`)
                    .set('Content-Type', 'application/json')
                    .send(testChallenge2Modi)
                    .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                    });
                });
    });
    //Obtener usuarios
    describe('GET /:Challenge', () => {
        it('should all the Challenges', (done) => {
            chai
                .request(app)
                .get(`/challenges/challenges`)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                console.log(res.body)
                expect(res).to.have.status(200);
                done();
                });
            });
            it('should get testChallenge1 by id', (done) => {
                chai
                    .request(app)
                    .get(`/challenges/challenge/${_idTestChallenge}`)
                    .set('Content-Type', 'application/json')
                    .end((err, res) => {
                    console.log(res.body)
                    expect(res).to.have.status(200);
                    done();
                    });
                });
                it('should get testChallenge2 by _query', (done) => {
                    chai
                        .request(app)
                        .get(`/challenges/challenge/?id=ChallengeTest2`)
                        .set('Content-Type', 'application/json')
                        .end((err, res) => {
                        console.log(res.body)
                        expect(res).to.have.status(200);
                        done();
                        });
                    });
    });
    //Borrar usuarios
    
    describe('Delete /?Challenge', () => {
        it('should delete the tests Challenge 1 by id', (done) => {
            chai
                .request(app)
                .delete(`/challenges/challenge/${_idTestChallenge}`)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                expect(res).to.have.status(200);
                done();
                });
            });
        it('should delete the tests Challenge 2 by query', (done) => {
        chai
            .request(app)
            .delete(`/challenges/challenge/?id=ChallengeTest2`)
            .set('Content-Type', 'application/json')
            .end((err, res) => {
            expect(res).to.have.status(200);
            done();
            });
        });
    });
    
    
   /* after(async () => {
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
      });*/
      
});