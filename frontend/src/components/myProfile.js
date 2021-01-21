import React from 'react'
import '../style.css'

function MyProfile(props){
    const {userName, userLevel} = props;
    return (
        <>
            <h1 classname="title">My Profile</h1>
            <h1 classname="title">My name : {userName}</h1>
            <h1 classname="title">My Level: {userLevel}</h1>
        </>
    )
}

export {MyProfile};
