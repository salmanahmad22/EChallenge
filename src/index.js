import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Home'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserProfile from './UserProfile';
import UserPosts from './UserPosts';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path = "/profile">
          <UserProfile></UserProfile>
        </Route>
        <Route exact path = "/posts">
          <UserPosts></UserPosts>
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
