import React, {useState, useEffect} from "react";
import { Login, Register } from './components/Login.js';
import { UserMenu} from './components/UserMenu.js';
import { Link, Route, Switch, useHistory } from "react-router-dom";
import { PrivateRoute} from './components/privateRoute.js';
import { useClientSocket } from './useClientSocket.js';

import go_img from './img/go-game.jpg'

export default function App() {
  const [userId, setUserId] = useState("");
  

  const { opponent, stepReceivedStr, boardId, color, isPlaying } = useClientSocket();
  const history = useHistory()
  useEffect(()=>{
      if(isPlaying){
        history.push('/user/game')
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying])
  
  return (
    <div>
      {/* {(displayHomepage && userId === "") ? Menu(): <></>} */}

      <Switch>
      <Route exact path='/'>
        <Menu />
      </Route>
        <Route exact path="/login">
          <Login setUserId={setUserId} history={history} />
        </Route>
        <Route exact path="/register">
          <Register setUserId={setUserId} history={history} />
        </Route>

        <PrivateRoute path="/user" userId={userId} isPlaying={isPlaying} 
        component={UserMenu} color={color} opponent={opponent}
        // stepReceivedRow={stepReceivedRow} 
        stepReceivedStr={stepReceivedStr}
          boardId={boardId}
        />
      </Switch>
    </div>
  );
}

const Menu = () => {
  return (
    <>
      <h1 className="title glow-on-hover" >GO game</h1>
      <img src={go_img} id="figure-1" />
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          <Link to="/login" className="nav-item"><li>Login</li></Link>
          <Link to="/register" className="nav-item"><li>Register</li></Link>
        </ul>
      </nav>
    </>
  )
}
