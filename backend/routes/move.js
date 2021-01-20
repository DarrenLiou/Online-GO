import express from 'express';
import bodyParser from 'body-parser';
import User from '../models/user.js';
import Game from '../models/game.js';


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
    if (games[0].black.id !== userId && games[0].white.id !== userId ){
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
            break
        }
        case 'done':{
            await Game.updateOne({ID: boardId}, 
                {$set: {board: [...games[0].board, `0-D`], 
                        stepCount:games[0].stepCount+1 }})
            res.status(200).send({status: 'Success', msg:'Success done'});
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
            break
        }
        default:{
            console.log('Move flag WRONG');
            return res.status(200).send({status: 'Failed', msg:'Move flag is incorrect'});
            break
        }
    }
});

export default router;