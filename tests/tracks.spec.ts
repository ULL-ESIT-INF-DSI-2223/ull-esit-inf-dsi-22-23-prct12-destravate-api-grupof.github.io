/*import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import app from '../dist/serverTest.js';
import { trackModel } from '../dist/models/trackSchema.js';
import { expect } from 'chai';
import startServer from '../dist/index.js';
import 'mocha'



chai.use(chaiHttp);
describe('Track routes', () => {
    let _idTestTrack: string;
    let server: any;
    const testTrack1 = {
      id: "TrackTest1",
      name: 'Test',
      startCoords: '42.56434',
      endCoords: '42.56434',
      long: 42,
      unevenness: 10,
      activities: 'Correr',
      finalized: [],
      calification: 10,
    };
    const testTrack1Modi = {
        id: "TrackTest1",
        name: 'Test changed',
        startCoords: '42.56434',
        endCoords: '42.56434',
        long: 42,
        unevenness: 10,
        activities: 'Correr',
        finalized: [],
        calification: 10,
      }
    const testTrack2 = {
        id: "TrackTest2",
        name: 'Test',
        startCoords: '42.56434',
        endCoords: '42.56434',
        long: 42,
        unevenness: 10,
        activities: 'Correr',
        finalized: [],
        calification: 10,
      };
      const testTrack2Modi = {
        id: "TrackTest2",
        name: 'Test changed',
        startCoords: '42.56434',
        endCoords: '42.56434',
        long: 42,
        unevenness: 10,
        activities: 'Correr',
        finalized: [],
        calification: 10,
      }
      before((done) => {
        server = app.listen(4000, () => {
          console.log(`Server running on port 4000`);
          done();
        });
      });
      
    describe('POST /:track', () => {
        //Crear usuarios
        it('should add a testTrack1', (done) => {
        chai
            .request(app)
            .post(`/tracks/track`)
            .set('Content-Type', 'application/json')
            .send(testTrack1)
            .end((err, res) => {
            _idTestTrack = res.body.track._id
            console.log("TRACK: ")
            console.log(_idTestTrack);
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            
            done();
            });
        });
        it('should add a testTrack2', (done) => {
            chai
                .request(app)
                .post(`/tracks/track`)
                .set('Content-Type', 'application/json')
                .send(testTrack2)
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
            .post(`/tracks/track`)
            .set('Content-Type', 'application/json')
            .send({id: testTrack1.id, name : testTrack1.name, activities : testTrack1.activities})
            .end((err, res) => {
            expect(res).to.have.status(500);
            done();
            });
        });
    });
    //Modificar usuarios
    describe('PATCH /:Track', () => {
        it('Should change name of testTrack1 by id', (done) => {
            chai
                .request(app)
                .patch(`/tracks/track/${_idTestTrack}`)
                .set('Content-Type', 'application/json')
                .send(testTrack1Modi)
                .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
                });
            });
        it('Should change name of testTrack2 by query', (done) => {
                chai
                    .request(app)
                    .patch(`/tracks/track/?id=TrackTest2`)
                    .set('Content-Type', 'application/json')
                    .send(testTrack2Modi)
                    .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                    });
                });
    });
    //Obtener usuarios
    describe('GET /:Track', () => {
        it('should all the Tracks', (done) => {
            chai
                .request(app)
                .get(`/tracks/tracks`)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                //console.log(res.body)
                expect(res).to.have.status(200);
                done();
                });
            });
            it('should get testTrack1 by id', (done) => {
                chai
                    .request(app)
                    .get(`/tracks/track/${_idTestTrack}`)
                    .set('Content-Type', 'application/json')
                    .end((err, res) => {
                    //console.log(res.body)
                    expect(res).to.have.status(200);
                    done();
                    });
                });
                it('should get testTrack2 by _query', (done) => {
                    chai
                        .request(app)
                        .get(`/tracks/track/?id=TrackTest2`)
                        .set('Content-Type', 'application/json')
                        .end((err, res) => {
                        //console.log(res.body)
                        expect(res).to.have.status(200);
                        done();
                        });
                    });
    });
    //Borrar usuarios
    
    describe('Delete /?Track', () => {
        it('should delete the tests Track 1 by id', (done) => {
            chai
                .request(app)
                .delete(`/tracks/track/${_idTestTrack}`)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                expect(res).to.have.status(200);
                done();
                });
            });
        it('should delete the tests Track 2 by query', (done) => {
        chai
            .request(app)
            .delete(`/tracks/track/?id=TrackTest2`)
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