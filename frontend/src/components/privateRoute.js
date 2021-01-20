import React from "react";
import { Route, Redirect } from "react-router-dom";
function PrivateRoute({ component: Component, ...rest }){
    // const {userId, path} = props;
    return(
        <Route path={rest.path}>
            {(rest.userId !== "") ? (<Component />) : (
                <Redirect to="/login" />
            )}
        </Route>
    
    )
}

export {PrivateRoute};