import { Route, BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import Header from "./Components/Header"
import Main from "./Components/Main"
import Profile from "./Components/Profile"
import Explore from "./Components/Explore"
import Login from "./Components/Login"
import Messages from "./Components/Messages"

import "./css/app.css"
import PopupPost from "./Components/PopupPost"
import Register from "./Components/Register"
import Logout from './Components/Logout'
import NewPost from './Components/NewPost'

const App = () => {
  const jwt = localStorage.getItem('jwt')
  if (!jwt)
    return (
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    )
  else
    return (
      <Router>
        <div className="app-container">
          <Switch>
            <Route path="/logout" component={Logout} />
            <Route>
              <Header />
              <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/profile/:uid" component={Profile} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/explore" component={Explore} />
                <Route exact path="/chat" component={Messages} />
                <Route exact path="/popup" component={PopupPost} />
                <Route exact path="/post/new" component={NewPost} />
                <Route path="*">
                  <Redirect to="/" />
                </Route>
              </Switch>
            </Route>
          </Switch>
        </div>
      </Router>
    )
}

export default App
