import express from 'express';
import bodyParser from 'body-parser';
import User from '../models/user.js';
import Game from '../models/game.js';
import {clientSockets, userWebsocketRef} from '../server.js'



const router = express.Router();
router.use(bodyParser.json());

router.post('/move/:boardId/:userId', async (req, res) => {
    // {flag:str, pos:{row:, col: }}
    
    const boardId = req.params.boardId;
    const userId = req.params.userId;
    const games = await Game.find({ID:boardId}).exec();
    if (games.length === 0){
        // Wrong board ID
        return res.status(200).send({status: 'Failed', msg:'Board does not exist'});
    }
    let playerColor = '';
    let opponentID = '';
    if (games[0].black.id === userId){
        playerColor = 'black';
        opponentID = games[0].white.id;
    }else if(games[0].white.id === userId ){
        playerColor = 'white';
        opponentID = games[0].black.id;
    }else{
        return res.status(200).send({status: 'Failed', msg:'User is incorrect'});
    }
    const status = req.body.data.flag
    switch(status){
        case 'step':{
            const row = req.body.data.pos.row
            const col = req.body.data.pos.col
            await Game.updateOne({ID: boardId}, 
                {$set: {board: [...games[0].board, `${row}-${col}`], 
                        stepCount:games[0].stepCount+1 }})
            res.status(200).send({status: 'Success', msg:'Success step'});
            try{ sendStep(opponentID, playerColor, row, col)}
            catch(err){console.log("Sending move error",err)}
            break
        }
        case 'done':{
            await Game.updateOne({ID: boardId}, 
                {$set: {board: [...games[0].board, `0-D`], 
                        stepCount:games[0].stepCount+1 }})
            res.status(200).send({status: 'Success', msg:'Success done'});
            try{ sendDone(opponentID, playerColor)}
            catch(err){console.log("Sending done error",err)}
            break
        }
        case 'surrender':{
            let winner = ''
            if (games[0].stepCount%2 === 0){
                winner = 'white'
            } else{
                winner = 'black'
            }
            await Game.updateOne({ID: boardId}, 
                {$set: {board: [...games[0].board, `0-S`], 
                        stepCount:games[0].stepCount+1,
                        isComplete: true, winner: winner}})
            res.status(200).send({status: 'Success', msg:'Success surrender'});
            try{ sendSurrender(opponentID, playerColor)}
            catch(err){console.log("Sending surrender error",err)}
            break
        }
        default:{
            console.log('Move flag WRONG');
            return res.status(200).send({status: 'Failed', msg:'Move flag is incorrect'});
            break
        }
    }
});

function sendStep(userId, playerColor, row, col){
    console.log('-----------send step from web socket server--------------')
    clientSockets[userWebsocketRef[userId]].send(JSON.stringify(['Step', 
        {stoneColor: playerColor, pos: {row: row, col: col}, userId: userId}]));
}
function sendSurrender(userId, playerColor){
    console.log('-----------send surrender from web socket server--------------')
    clientSockets[userWebsocketRef[userId]].send(JSON.stringify(['Surrender', 
        {stoneColor: playerColor, pos: {row: 's', col: 's'}, userId: userId}]));
}
function sendDone(userId, playerColor){
    console.log('-----------send surrender from web socket server--------------')
    clientSockets[userWebsocketRef[userId]].send(JSON.stringify(['Done', 
        {stoneColor: playerColor, pos: {row: 'd', col: 'd'}, userId: userId}]));
}
export default router;