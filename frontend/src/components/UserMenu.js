import React, {useEffect, useState} from 'react';
import { findOpponent, sendUserId } from '../axios.js';
import { webSocketId } from '../useClientSocket.js';
import {PrivateGameRoute} from './privateRoute.js';
import {History} from './history.js';
import {MyProfile} from './myProfile.js';
import { Route, Redirect, useRouteMatch, NavLink} from "react-router-dom";
import GO from '../containers/go.js';

function UserMenu(props){
    const {userId, isPlaying, color, opponent, stepReceivedStr, boardId, userName, userLevel} = props;
    const { url, path } = useRouteMatch();
    useEffect(()=>{
        console.log('In user Menu, userId = :', userId, webSocketId);
        sendUserId(userId, webSocketId);
    }, [])

    return (
        <>
            <Route exact path={`${path}`}>
                <UserHomePage url={url} userId={userId}/>
            </Route>

            <PrivateGameRoute path={`${path}/game`} component={GO} isPlaying={isPlaying}
            color={color} opponent={opponent} 
            stepReceivedStr={stepReceivedStr} boardId={boardId} userId={userId} >
            </PrivateGameRoute>
            <Route path={`${path}/history`}>
                <History/>
            </Route>
            <Route path={`${path}/profile`}>
                <MyProfile userName={userName} userLevel={userLevel}/>
            </Route>
        </>
    )
}

const UserHomePage = (props) => {
    const {url, userId} = props;
    return (
        <>
            <h1 className="title glow-on-hover">GO game</h1>
            <div className="user-menu">
                <button className="button" onClick={()=>{findOpponent(userId)}}>
                    <NavLink className="user-menu-text" to={`${url}/game`}>Find Opponent</NavLink>
                </button>
                <button className="button">
                    <NavLink className="user-menu-text" to={`${url}/history`}>History</NavLink>
                </button>
                <button className="button">
                    <NavLink className="user-menu-text" to={`${url}/profile`}>My Profile</NavLink>
                </button>
            </div>
        </>
    )
}

export {UserMenu};
