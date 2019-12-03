import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Books from "./pages/Saved";
import NoMatch from "./pages/NoMatch";
import Search from "./pages/Search"
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import Login from './Login';
import Register from './Register';
const axios = require("axios");

axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path="/saved" component={Books} />
      </Switch>
    </div>
  </Router >,
  document.getElementById('root')
);
