import express from 'express';
import bodyParser from 'body-parser';
import User from '../models/user.js';
import Game from '../models/game.js';
import {clientSockets, userWebsocketRef} from '../server.js'
const router = express.Router();
const onlinePlayers = new Set();

router.use(bodyParser.json());

router.get('/find/:userId', async (req, res) => {
    const userId = req.params.userId;
    // check if this user has socket connection on
    if ( !(userWebsocketRef[userId] in clientSockets) ){
        return res.status(200).send({status: 'Failed', msg: 'Client socket not established yet'});
    } 
    const userExistence = await User.find({id: userId}).exec()
    if (userExistence.length === 0){
        return res.status(200).send({status: 'Failed', msg: 'Wrong user ID'});
    }
    const userName = userExistence[0].name;
    onlinePlayers.add(`${userName}@${userId}`);
    console.log('onlinePlayers', onlinePlayers);
    if (onlinePlayers.size >= 2){ 
        // we can form a new game
        
        const players = onlinePlayers.values();
        let p1 = players.next().value;
        let p2 = players.next().value;
        const [p1Name, p1UserId] = p1.split("@");
        const [p2Name, p2UserId] = p2.split("@");
        onlinePlayers.delete(p1);
        onlinePlayers.delete(p2);
        if (userId !== p1UserId && userId !== p2UserId){
            // player not chosen
            return res.status(200).send({status: 'Failed', msg:'Not chosen cannot find any opponent'});
        }
        try{await SendBoardData(p1, p2);}
        catch(err){console.log("router find",err)}
        return res.status(200).send({status: 'Success', msg:'Entering new game'})
    }
    else{
        // player no more than 2 
        return res.status(200).send({status: 'Failed', msg:'Cannot find any opponent'});
    }

});

async function SendBoardData(p1, p2){
    // p1 and p2 are {name, uuidv4}
    var allGames;
    try{allGames = await Game.find().exec()}
    catch(err){console.log("Game count finding",err)}
    const [p1Name, p1UserId] = p1.split("@");
    const [p2Name, p2UserId] = p2.split("@");
    // we can random black and white
    const newBoard = new Game({ID: allGames.length+1, size: 19, board:[], 
        white:{name: p1Name, id: p1UserId}, 
        black:{name: p2Name, id: p2UserId}, stepCount:0, isComplete: false})
    newBoard.save();
    clientSockets[userWebsocketRef[p1UserId]].send(JSON.stringify(['Board info', {color: 'black', opponentName: p2Name, boardId: newBoard.ID, boardSize: newBoard.size}]));
    clientSockets[userWebsocketRef[p2UserId]].send(JSON.stringify(['Board info', {color: 'white', opponentName: p1Name, boardId: newBoard.ID, boardSize: newBoard.size}]));
}

router.post('/set/:userId/:webSocketId', (req, res) => {
    const userId = req.params.userId;
    const webSocketId = req.params.webSocketId;
    if (userId in userWebsocketRef){
        console.log('Alert old client not cleared');
    }
    userWebsocketRef[userId] = webSocketId;
    console.log('In home.js: ', userWebsocketRef)
    clientSockets[userWebsocketRef[userId]].send(JSON.stringify(['test', 'return']))
    return res.status(200).send({status: 'Success', msg: 'UserId linked with websocketId'})
})

export default router;