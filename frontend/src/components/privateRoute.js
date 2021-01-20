import React from "react";
import { Route, Redirect} from "react-router-dom";
function PrivateRoute({ component: Component, path: Path, ...rest }){
    // console.log("rest.userId",rest.userId);
    
    return(
        <>
        <Route path={Path}>
            {(rest.userId !== "") ? (<Component {...rest}/>) : (
                <Redirect to="/login" />
            )}
        </Route>

        </>
        

    )
}

function PrivateGameRoute({ component: Component, path: Path, ...rest }){
    return(
        <>
            <Route exact path={Path}>
                { (rest.isPlaying ? (<Component {...rest}></Component>):(
                    <Redirect to="/user" />)
                )}
            </Route>
        </>

    );
}

export {PrivateRoute, PrivateGameRoute};