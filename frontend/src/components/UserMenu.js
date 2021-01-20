import React, {useEffect} from 'react';
import { findOpponent, sendUserId } from '../axios.js';
import { webSocketId } from '../useClientSocket.js';

function UserMenu(props){
    const {userId} = props;
    useEffect(()=>{
        console.log('In user Menu, userId = :', userId, webSocketId);
        sendUserId(userId, webSocketId);
    }, [])
    return (
        <>
            <button onClick={()=>{findOpponent(userId)}}>Find Opponent</button>
            <button>History</button>
            <button>My Profile</button>
        </>
    )
}

export {UserMenu};