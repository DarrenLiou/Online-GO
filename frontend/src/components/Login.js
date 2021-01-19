import React, {useState} from 'react';
import {userLogin, userRegister} from '../axios'
import { useParam, useHistory } from 'react-router-dom';
import {sha256} from 'crypto-hash';

function Login(props){
    const {setUserId, history} = props
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault()
        let userData = {name: userName, password: password};
        try{
            // console.log('----------')
            const hashPassword = await sha256(password);
            userData.password = hashPassword;
            console.log(`plain-text: ${password}\nhash: ${hashPassword}`)
            const res = await userLogin(userData);
            //res is like {status: "Failed", msg: "User does not exist"}
            if (res.status === 'Success'){
                setUserId(res.id);
                history.push('/user');
            }
        }catch(err){
            console.log(err)
            console.log('Authentication Error!')
        }
    }

    return (
        <form>
            <label htmlFor="username">Username : </label>
            <input type="text" id='userName' onChange={(e) => setUserName(e.target.value)} /><br/>
            <label htmlFor="password">Password : </label>
            <input type="password" id='password' onChange={(e) => setPassword(e.target.value)} /><br/>
            <button onClick={handleLogin}>Login</button>
        </form> 
    )
}

function Register(props){
    const {setUserId, history} = props
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [level, setLevel] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault()
        let userData = {name: userName, password: password, level: level};
        const hashPassword = await sha256(password);
        userData.password = hashPassword;
        console.log(`plain-text: ${password}\nhash: ${hashPassword}`)
        try{
            const res = await userRegister(userData);
            console.log(res)
            if (res.status === 'Success'){
                setUserId(res.id);
                history.push('/user');
            }
        }catch(err){
            console.log(err)
            console.log('Authentication Error!')
        }
    }
    
    return (
        <form>
            <label htmlFor="username">Username : </label>
            <input type="text" id='userName' onChange={(e) => setUserName(e.target.value)} /><br/>
            <label htmlFor="password">Password : </label>
            <input type="password" id='password' onChange={(e) => setPassword(e.target.value)} /><br/>
            <label htmlFor="level">Level : </label>
            <input type="text" id='level' onChange={(e) => setLevel(e.target.value)} /><br/>
            <button onClick={handleRegister}>Register</button>
        </form> 
    )
}

export {Login, Register};