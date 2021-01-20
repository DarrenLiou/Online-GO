import React, {useState, useEffect} from "react";
import { Login, Register } from './components/Login.js';
import { UserMenu} from './components/UserMenu.js';
import { Link, Route, Switch, useHistory } from "react-router-dom";
import { PrivateRoute} from './components/privateRoute.js';
import { useClientSocket } from './useClientSocket.js';

import go_img from './img/go-game.jpg'

export default function App() {
  const [userId, setUserId] = useState("");

  const { opponent, stepReceived, boardId, color } = useClientSocket();

  const history = useHistory()
  return (
    <div>
      {userId? <></> : Menu()}

      <Switch>
        <Route exact path="/login">
          <Login setUserId={setUserId} history={history}/>
        </Route>
        <Route exact path="/register">
          <Register setUserId={setUserId} history={history}/>
        </Route>

        <PrivateRoute path="/user" userId={userId} component={UserMenu}/>
      </Switch>
    </div>
  );
}

const Menu = () => {
  return (
    <>
      <h1 className="title" >GO game</h1>
      <img src={go_img} id="figure-1" />
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          <li>
            <Link to="/login" className="nav-item">Login</Link>
          </li>
          <li>
            <Link to="/register" className="nav-item">Register</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
