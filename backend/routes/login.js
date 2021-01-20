import express from 'express';
import bodyParser from 'body-parser';
import User from '../models/user.js';
import {v4 as uuidv4} from 'uuid';
const router = express.Router();
router.use(bodyParser.json());

router.post('/login', async (req, res) => {
    console.log("Login is evoked!");
    if (req.body.data.name.length === 0){
        res.status(200).send({status: 'Failed', msg:'User name cannot be empty'});
    }
    else{
        try{
            const users = await User.find({name:req.body.data.name}).exec()
            let userNum = users.length;
            if (userNum===0){
                console.log('Login: New User');

                res.status(200).send({status: 'Failed', msg:'User does not exist'});
            }
            else if(userNum===1){
                // users must be length 1
                // await User.updateOne({name: req.body.data.name}, {$set: {toPlay:false}})
                if (req.body.data.password === users[0].password){
                    console.log("login: Successfully login");
                    res.status(200).send({status: 'Success', id:users[0].id, msg:'Successfully login'});
                }else{
                    console.log("login: Wrong Password");
                    res.status(200).send({status: 'Failed', msg:'Wrong Password'});
                }
            }
            else{
                throw(`there are ${userNum} users with name: ${req.body.data.name}`)
            }
        }catch(err){
            console.log(err, 'Login connect to db WRONG');
            res.status(200).send({status: 'Failed', msg:'DB wrong'});
        }
    }
});

router.post('/register', async (req, res) => {
    console.log("Register is evoked!");
    if (req.body.data.name.length === 0){
        res.status(200).send({status: 'Failed', msg:'User name cannot be empty'});
    }
    else{
        try{
            const users = await User.find({name:req.body.data.name}).exec()
            let userNum = users.length;
            if (userNum===0){
                console.log('Register: New User');
                if (req.body.data.name.indexOf("@") !== -1){
                    console.log('User name cannot contain @')
                    return res.status(200).send({status: 'Failed', msg:'User name cannot contain @'});
                }
                req.body.data.id = uuidv4();
                const user = new User(req.body.data);

                try{
                    await user.save();
                }catch(err){
                    console.log(err)
                }
                console.log('Success registration');
                res.status(200).send({status: 'Success', id:user.id, msg:'Success registration'});
            }
            else if(userNum===1){
                // await User.updateOne({name: req.body.data.name}, {$set: {toPlay:false}})
                if (req.body.data.password === users[0].password){
                    console.log("Register: Successfully login");
                    res.status(200).send({status: 'Success', id:users[0].id, msg:'Exists'});
                }else{
                    console.log("Register: Wrong Password");
                    res.status(200).send({status: 'Failed', msg:'Wrong Password'});
                }
                // res.status(200).send({status: 'Success', id:users[0].id, msg:'Exists'});
            }else{
                throw(`there are ${userNum} users with name: ${req.body.data.name}`)
            }
        }catch(err){
            console.log('Register connect to db WRONG');
            res.status(200).send({status: 'Failed', msg:'DB wrong'});
        }
    }
});


export default router;