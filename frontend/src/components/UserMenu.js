import React from 'react';
import { useParam } from 'react-router-dom';

function UserMenu(){
    return (
        <>
            <button>Find Opponent</button>
            <button>History</button>
            <button>My Profile</button>
        </>
    )
}

export {UserMenu};