import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Books from "./pages/Saved";
import NoMatch from "./pages/NoMatch";
import Search from "./pages/Search"
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import Login from './Login';
import Register from './Register';

ReactDOM.render(
    <Router>
        <div>
          <Route exact path='/' component={App} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path="/saved" component={Books} />
          <Route exact path="/search" component={Search} />
        </div>
    </Router>,
    document.getElementById('root')
  );
