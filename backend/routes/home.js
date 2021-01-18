import express from 'express';
import bodyParser from 'body-parser';
import User from '../models/user.js';
import {v4 as uuidv4} from 'uuid';
import Game from '../models/game.js';
const router = express.Router();
router.use(bodyParser.json());

router.get('/find/:userId', async (req, res) => {
    const userId = req.params.userId;
    await User.updateOne({id: userId}, {$set: {toPlay: true}})
    const onlineUsers = await User.find({toPlay: true}).exec();
    const names = await User.find({id: userId}).exec()

    const opponentList = onlineUsers.filter(item => {
        return item.id !== userId;
    });
    // console.log(opponentList);
    // res.status(200).send({status: 'Success', msg:'Successfully paired'});
    
    if (opponentList.length === 0){
        return res.status(200).send({status: 'Failed', msg:'Cannot find any opponent'});
    }
    //we can random select
    const allGames = await Game.find().exec()
    const opponent = opponentList[0];
    // we can random black and white
    const newBoard = new Game({ID: allGames.length+1, size: 19, board:[], 
        white:{name: names[0].name, id: userId}, 
        black:{name: opponent.name, id: opponent.id}, stepCount:0, isComplete: false})
    newBoard.save();
    res.status(200).send({status: 'Success', msg:'Entering new game'})
    
});

export default router;