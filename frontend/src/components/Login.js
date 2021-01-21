import React, {useEffect, useState} from 'react';
import {userLogin, userRegister} from '../axios'
// import { useParam, useHistory } from 'react-router-dom';
import {sha256} from 'crypto-hash';
import { message } from 'antd';

function Login(props){
    const {setUserId, history, setProfileUserName, setProfileUserLevel} = props
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [returnMessage, setReturnMessage] = useState({status: '', msg: ''});

    const displayMessage = (msg) => {
        console.log('In display message')
        console.log(msg)
        const content = {
            content: msg.msg,
            duration: 0.5
        }
    
        switch (msg.status) {
            case 'Success':{
                message.success(content)
                console.log('------Success---------')                
            }
            break
            case 'Failed':
                message.info(content)
            break
            default:
                message.error(content)
            break
        }
    }

    useEffect(() => {
        if (returnMessage.status === '') return;
        displayMessage(returnMessage)
    }, [returnMessage])

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
                setProfileUserName(res.userName);
                setProfileUserLevel(res.userLevel);
                setReturnMessage({status: res.status, msg: res.msg});
                history.push('/user');
            }
            else if(res.status === 'Failed'){
                if(res.msg === 'User does not exist'){
                    setReturnMessage(res);
                    history.push('/register');
                }
                else{
                    console.log('Login Error:', res.msg);
                    setReturnMessage(res);
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
    const {setUserId, history, setProfileUserName, setProfileUserLevel} = props
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [level, setLevel] = useState('');
    const [returnMessage, setReturnMessage] = useState({status: '', msg: ''});

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
                console.log('res in register: ', res)
                setUserId(res.id);
                setProfileUserName(res.userName);
                setProfileUserLevel(res.userLevel);
                setReturnMessage({status: res.status, msg: res.msg});
                console.log('hihi')
                history.push('/user');
            }
            else if(res.status === 'Failed'){
                console.log(res.msg);
                setReturnMessage(res);
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
