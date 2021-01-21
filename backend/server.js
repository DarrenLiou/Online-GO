import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import loginRouter from './routes/login.js';
import gameRouter from './routes/move.js';
import homeRouter from './routes/home.js';

import http from 'http';
import WebSocket from 'ws';

import Game from './models/game.js';
import User from './models/user.js';
import dotenv from 'dotenv-defaults'
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 6273;

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

app.use('/', loginRouter);
app.use('/user', homeRouter)
app.use('/user/game', gameRouter);


const server = http.createServer(app);
const wss = new WebSocket.Server({server});
export const clientSockets = {}
export const userWebsocketRef = {}

wss.on('connection', (ws, req) => {
    // req is now uuidv4 after sha256
    console.log('When websocket client connected, reqUrl:', req.url)
    let clientId = req.url.split('/')[1]; // removing '/'
    clientSockets[clientId] = ws;
    console.log('All keys in client Socket', Object.keys(clientSockets));
    clientSockets[clientId].send(JSON.stringify(['Connect', 'Web socket connected']));

    ws.on('message', data => {
        console.log('Data from client', data);
    })
    // ws.send(JSON.stringify(['connect!', req.url]))
})

server.listen(port, () => 
    console.log(`Example app listening on port ${port}`),
);
