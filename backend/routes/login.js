import express from 'express';
import bodyParser from 'body-parser';
import User from '../models/user.js';
import {v4 as uuidv4} from 'uuid';
const router = express.Router();
router.use(bodyParser.json());

router.post('/login', async (req, res) => {
    console.log("Login is evoked!");
    // res.send('Hello, World!');
    if (req.body.name.length === 0){
        res.status(405).send({status: 'Failed', msg:'User name cannot be empty'});
    }
    else{
        try{
            const users = await User.find({name:req.body.name}).exec()
            if (users.length===0){
                console.log('New User');

                res.status(400).send({status: 'Failed', msg:'User does not exist'});
            }
            else{
                await User.updateOne({name: req.body.name}, {$set: {toPlay:false}})
                res.status(200).send({status: 'Success', id:users[0].id, msg:'Successfully login'});
            }
        }catch(err){
            console.log('Login connect to db WRONG');
            res.status(503).send({status: 'Failed', msg:'DB wrong'});
        }
    }
});

router.post('/register', async (req, res) => {
    console.log("Register is evoked!");
    // console.log(req.body);
    // Notice name
    if (req.body.name.length === 0){
        res.status(405).send({status: 'Failed', msg:'User name cannot be empty'});
    }
    else{
        try{
            const users = await User.find({name:req.body.name}).exec()
            if (users.length===0){
                console.log('New User');
                req.body.id = uuidv4();
                req.body.toPlay = false;
                const user = new User(req.body);
                await user.save();
                
                res.status(200).send({status: 'Success', id:user.id, msg:'Success registration'});
            }
            else{
                await User.updateOne({name: req.body.name}, {$set: {toPlay:false}})
                res.status(200).send({status: 'Success', id:users[0].id, msg:'Exists'});
            }
        }catch(err){
            console.log('Register connect to db WRONG');
            res.status(503).send({status: 'Failed', msg:'DB wrong'});
        }
    }
});

export default router;