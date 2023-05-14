/*import express from 'express';
import cors from 'cors';
import usersRouter from './routes/userRouter.js';
import trackRouter from './routes/trackRouter.js';
import groupRouter from './routes/groupRouter.js';
import challengeRouter from './routes/challengeRouter.js';

import { connect } from 'mongoose';
const app = express();

app.use(cors());
app.use(express.json());

const uriLocal = "mongodb://127.0.0.1:27017/destravate";
//const uri ="mongodb+srv://user:user123ASDFG@cluster0.mow4vh4.mongodb.net/?retryWrites=true&w=majority";
connect(uriLocal).then(() => {
  console.log('Connection to MongoDB server established');
}).catch(() => {
  console.log('Unable to connect to MongoDB server');
});



app.use('/users', usersRouter);
app.use('/tracks', trackRouter);
app.use('/groups', groupRouter);
app.use('/challenges', challengeRouter);

app.use('/', (req, res) => {
  res.send('Hello World!');
});


export default app;*/
export {};
