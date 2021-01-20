import React from "react";
import { Route, Redirect } from "react-router-dom";
function PrivateRoute({ component: Component, ...rest }){
    // console.log("rest.userId",rest.userId);
    return(
        <Route path={rest.path}>
            {(rest.userId !== "") ? (<Component userId={rest.userId} />) : (
                <Redirect to="/login" />
            )}
        </Route>
    
    )
}

export {PrivateRoute};