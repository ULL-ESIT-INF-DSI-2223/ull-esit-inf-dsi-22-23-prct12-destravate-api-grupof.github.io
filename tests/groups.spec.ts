import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../dist/index.js';
import { expect } from 'chai';
import 'mocha'



chai.use(chaiHttp);
describe('Group routes', () => {
    let _idTestGroup: string;
    let server: any;
    const testGroup1 = {
      id: "GroupTest1",
      name: 'Test',
      participants: [],
      historicTracks: [],
     
    };
    const testGroup1Modi = {
        id: "GroupTest1",
        name: 'Test changed',
        
      }
    const testGroup2 = {
        id: "GroupTest2",
        name: 'Test',
       
      };
      const testGroup2Modi = {
        id: "GroupTest2",
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
      
    describe('POST /:group', () => {
        //Crear usuarios
        it('should add a testGroup1', (done) => {
        chai
            .request(app)
            .post(`/groups/group`)
            .set('Content-Type', 'application/json')
            .send(testGroup1)
            .end((err, res) => {
            _idTestGroup = res.body.group._id
            console.log("GROUP: ")
            console.log(_idTestGroup);
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            
            done();
            });
        });
        it('should add a testGroup2', (done) => {
            chai
                .request(app)
                .post(`/groups/group`)
                .set('Content-Type', 'application/json')
                .send(testGroup2)
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
            .post(`/groups/group`)
            .set('Content-Type', 'application/json')
            .send({id: testGroup1.id, name : testGroup1.name})
            .end((err, res) => {
            expect(res).to.have.status(500);
            done();
            });
        });
    });
    //Modificar usuarios
   describe('PATCH /:Group', () => {
        it('Should change name of testGroup1 by id', (done) => {
            chai
                .request(app)
                .patch(`/groups/group/${_idTestGroup}`)
                .set('Content-Type', 'application/json')
                .send(testGroup1Modi)
                .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
                });
            });
        it('Should change name of testGroup2 by query', (done) => {
                chai
                    .request(app)
                    .patch(`/groups/group/?id=GroupTest2`)
                    .set('Content-Type', 'application/json')
                    .send(testGroup2Modi)
                    .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                    });
                });
    });
    //Obtener usuarios
    describe('GET /:Group', () => {
        it('should all the Groups', (done) => {
            chai
                .request(app)
                .get(`/groups/groups`)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                console.log(res.body)
                expect(res).to.have.status(200);
                done();
                });
            });
            it('should get testGroup1 by id', (done) => {
                chai
                    .request(app)
                    .get(`/groups/group/${_idTestGroup}`)
                    .set('Content-Type', 'application/json')
                    .end((err, res) => {
                    console.log(res.body)
                    expect(res).to.have.status(200);
                    done();
                    });
                });
                it('should get testGroup2 by _query', (done) => {
                    chai
                        .request(app)
                        .get(`/groups/group/?id=GroupTest2`)
                        .set('Content-Type', 'application/json')
                        .end((err, res) => {
                        console.log(res.body)
                        expect(res).to.have.status(200);
                        done();
                        });
                    });
    });
    //Borrar usuarios
    
    describe('Delete /?Group', () => {
        it('should delete the tests Group 1 by id', (done) => {
            chai
                .request(app)
                .delete(`/groups/group/${_idTestGroup}`)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                expect(res).to.have.status(200);
                done();
                });
            });
        it('should delete the tests Group 2 by query', (done) => {
        chai
            .request(app)
            .delete(`/groups/group/?id=GroupTest2`)
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