import express from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import usersRouter from './routes/userRouter.js';
import trackRouter from './routes/trackRouter.js';
import groupRouter from './routes/groupRouter.js';
import challengeRouter from './routes/challengeRouter.js';

const app = express();

app.use(cors());
app.use(express.json());


const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://user:user123ASDFG@cluster0.mow4vh4.mongodb.net/destravate";

connect(MONGO_URI).then(() => {
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

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

console.log(Date.now())

export default app;