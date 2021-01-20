import React, {useEffect, useState} from 'react';
import { findOpponent, sendUserId } from '../axios.js';
import { webSocketId } from '../useClientSocket.js';
import {PrivateGameRoute} from './privateRoute.js';
import { Route, Redirect, useRouteMatch, NavLink} from "react-router-dom";
import GO from '../containers/go.js';
function UserMenu(props){
    const {userId, isPlaying, color, opponent, stepReceived, boardId} = props;
    const { url, path } = useRouteMatch();
    useEffect(()=>{
        console.log('In user Menu, userId = :', userId, webSocketId);
        sendUserId(userId, webSocketId);
    }, [])

    return (
        <>
            <h1>{isPlaying?'true':'false'}</h1>
            <button onClick={()=>{findOpponent(userId)}}>
                <NavLink to={`${url}/game`}>Find Opponent</NavLink>
            </button>
            <button>
                <NavLink to={`${url}/history`}>History</NavLink>
            </button>
            <button>
                <NavLink to={`${url}/profile`}>My Profile</NavLink>
            </button>

            <PrivateGameRoute path={`${path}/game`} component={GO} isPlaying={isPlaying}
            color={color} opponent={opponent} stepReceived={stepReceived} boardId={boardId} userId={userId} >
            </PrivateGameRoute>
            <Route path={`${path}/history`}>

            </Route>
            <Route path={`${path}/profile`}>
                
            </Route>
        </>
    )
}

export {UserMenu};