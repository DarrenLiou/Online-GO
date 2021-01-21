import React, {useEffect, useState} from 'react';
import { findOpponent, sendUserId } from '../axios.js';
import { webSocketId } from '../useClientSocket.js';
import {PrivateGameRoute} from './privateRoute.js';
import {History} from './history.js';
import {MyProfile} from './myProfile.js';
import { Route, Redirect, useRouteMatch, NavLink} from "react-router-dom";
import GO from '../containers/go.js';
import waiting_img from '../img/waiting.gif';

function UserMenu(props){
    const {userId, isPlaying, color, opponent, stepReceivedStr, boardId,
        history, userName, userLevel} = props;
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
            color={color} opponent={opponent} history={history}
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
    const [wait, setWait] = useState(false);

    const handleOnClick = e => {
        findOpponent(userId);
        setWait(true);
    }

    return (
        <>
            <h1 className="title glow-on-hover">GO game</h1>
            <div className="user-menu">
                <NavLink className="button" to={`${url}/game`}>

                    <div className="user-menu-text" onClick={e => handleOnClick(e)}>Find Opponent</div>

                </NavLink>
                <NavLink className="button" to={`${url}/history`}>
                    <div className="user-menu-text">History</div>
                </NavLink>
                <NavLink className="button" to={`${url}/profile`}>
                    <div className="user-menu-text">My Profile</div>
                </NavLink>
            </div>
            <img src={wait? waiting_img : ''} />
        </>
    )
}

export {UserMenu};
