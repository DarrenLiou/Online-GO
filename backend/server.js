import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import loginRouter from './routes/login.js';
import gameRouter from './routes/move.js';
import homeRouter from './routes/home.js';


import Game from './models/game.js';
import User from './models/user.js';
import dotenv from 'dotenv-defaults'
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 4000;

if (!process.env.MONGO_URL) {
    console.error('Missing MONGO_URL!!!')
    process.exit(1)
}
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  
const db = mongoose.connection;
  
db.on('error', (error) => {
    console.error(error)
})
db.once('open', () => {
    console.log('MongoDB connected!')
});
// app.get('/', (req, res) => {
//     res.send('Received a GET HTTP method');
//     console.log("GET is evoked");
// });


app.use('/', loginRouter);
app.use('/game', gameRouter);
app.use('/home', homeRouter)

app.listen(port, () => 
    console.log(`Example app listening on port ${port}`),
);