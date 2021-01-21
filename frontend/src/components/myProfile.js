import React from 'react'
import '../style.css'

function MyProfile(props){
    const {userName, userLevel} = props;
    return (
        <>
            <h1 className="title glow-on-hover">GO game</h1>
            <h2 className="title">My Profile</h2>
            <div className="profile">
                <h3 className="title">My name : {userName}</h3>
                <h3 className="title">My Level: {userLevel}</h3>
            </div>
        </>
    )
}

export {MyProfile};
