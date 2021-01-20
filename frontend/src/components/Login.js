import React, {useEffect, useState} from 'react';
import {userLogin, userRegister} from '../axios'
// import { useParam, useHistory } from 'react-router-dom';
import {sha256} from 'crypto-hash';

function Login(props){
    const {setUserId, history} = props
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault()
        let userData = {name: userName, password: password};
        try{
            const hashPassword = await sha256(password);
            userData.password = hashPassword;
            // console.log(`plain-text: ${password}\nhash: ${hashPassword}`)
            const res = await userLogin(userData);
            //res is like {status: "Failed", msg: "User does not exist"}
            if (res.status === 'Success'){
                console.log('My userId:', res.id)
                setUserId(res.id);
                history.push('/user');
            }
            else if(res.status === 'Failed'){
                if(res.msg === 'User does not exist'){
                    history.push('/register');
                }
                else{
                    console.log('Login Error:', res.msg);
                }
            }
            else{
                throw('Login Status Error!')
            }
        }catch(err){
            console.log(err)
            console.log('Authentication Error!')
        }
    }

    return (
        <>
            <h1 className="title glow-on-hover">GO game</h1>
            <form className="form">
                <div className="form-list">
                    <div className="form-item">
                        <label htmlFor="username">Username : </label>
                        <input className="form-input" type="text" id='userName' onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    <div className="form-item">
                        <label htmlFor="password">Password : </label>
                        <input className="form-input" type="password" id='password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                <button onClick={handleLogin} className="button">Login</button>
            </form> 
        </>
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
        // console.log(`plain-text: ${password}\nhash: ${hashPassword}`)
        try{
            const res = await userRegister(userData);
            if (res.status === 'Success'){
                console.log('My userId:', res.id)
                setUserId(res.id);
                history.push('/user');
            }
        }catch(err){
            console.log(err)
            console.log('Authentication Error!')
        }
    }

    return (
        <>
            <h1 className="title glow-on-hover">GO game</h1>
            <form className="form">
                <div className="form-list">
                    <div className="form-item">
                        <label htmlFor="username">Username : </label>
                        <input className="form-input" type="text" id='userName' onChange={(e) => setUserName(e.target.value)} /><br/>
                    </div>
                    <div className="form-item">
                        <label htmlFor="password">Password : </label>
                        <input className="form-input" type="password" id='password' onChange={(e) => setPassword(e.target.value)} /><br/>
                    </div>
                    <div className="form-item">
                        <label htmlFor="level">Level : </label>
                        <input className="form-input" type="text" id='level' onChange={(e) => setLevel(e.target.value)} /><br/>
                    </div>
                </div>
                <button onClick={handleRegister} className="button">Register</button>
            </form> 
        </>
    )
}

export {Login, Register};
