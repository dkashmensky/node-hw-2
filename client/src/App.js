import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.scss';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';

const App = () => {
  let loggedIn = false;
  const token = window.localStorage.getItem('jwt_token');
  if(token) {
    loggedIn = true;
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {loggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          {!loggedIn ? <Login /> : <Redirect to="/" />}
        </Route>
        <Route path="/register">
          {!loggedIn ? <Register /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;