import express from 'express';
import bodyParser from 'body-parser';
import User from '../models/user.js';
import {v4 as uuidv4} from 'uuid';
import Game from '../models/game.js';
import {clientSockets} from '../server.js'
const router = express.Router();
router.use(bodyParser.json());
const onlinePlayers = new Set();

router.get('/find/:userId', async (req, res) => {
    const userId = req.params.userId;
    const userExistence = await User.find({id: userId}).exec()
    if (userExistence.length === 0){
        return res.status(400).send({status: 'Failed', msg: 'Wrong user ID'});
    }
    const userName = userExistence[0].name;
    onlinePlayers.add(`${userName}@${userId}`);
    if (onlinePlayers.size >= 2){ 
        // we can form a new game
        players = onlinePlayers.values();
        p1 = players.next()
        p2 = players.next()
        onlinePlayers.delete(p1);
        onlinePlayers.delete(p2);
        if (userId !== p1 && userId !== p2){
            // player not chosen
            return res.status(400).send({status: 'Failed', msg:'Cannot find any opponent'});
        }
        try{await SendBoardData();}
        catch(err){console.log("router find",err)}
        return res.status(200).send({status: 'Success', msg:'Entering new game'})
    }
    else{
        // player no more than 2 
        return res.status(400).send({status: 'Failed', msg:'Cannot find any opponent'});
    }

});

async function SendBoardData(p1, p2){
    // p1 and p2 are {name, uuidv4}
    try{const allGames = await Game.find().exec()}
    catch(err){console.log("Game count finding",err)}
    const [p1Name, p1UserId] = p1.split("@");
    const [p2Name, p2UserId] = p2.split("@");
    // we can random black and white
    const newBoard = new Game({ID: allGames.length+1, size: 19, board:[], 
        white:{name: p1Name, id: p1UserId}, 
        black:{name: p2Name, id: p2UserId}, stepCount:0, isComplete: false})
    newBoard.save();
    
    clientSockets[p1UserId].send(JSON.stringify(['Board info', {color: 'black', opponentName: p2Name, boardId: newBoard.ID, boardSize: newBoard.size}]));
    clientSockets[p2UserId].send(JSON.stringify(['Board info', {color: 'white', opponentName: p1Name, boardId: newBoard.ID, boardSize: newBoard.size}]));
}

export default router;