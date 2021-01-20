import React, {useState, useEffect} from "react";
import { Login, Register } from './components/Login.js';
import { UserMenu} from './components/UserMenu.js';
import { Link, Route, Switch, useHistory } from "react-router-dom";
import { PrivateRoute} from './components/privateRoute.js';
import { useClientSocket } from './useClientSocket.js';

export default function App() {
  const [userId, setUserId] = useState("");
  

  const { opponent, stepReceived, boardId, color, isPlaying } = useClientSocket();
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
        component={UserMenu} color={color} opponent={opponent} stepReceived={stepReceived}
          boardId={boardId}
        />
      </Switch>
    </div>
  );
}

const Menu = () => {
  return (
    <>
      <h1>GO game</h1>
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
