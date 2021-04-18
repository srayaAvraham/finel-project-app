import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {Login} from './features/user/Login';
import {Signup} from './features/user/Signup';
// import Dashboard from './features/User/Dashboard';
import { PrivateRoute } from './helpers/PrivateRoute';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact component={Login} path="/login" />
          <Route exact component={Signup} path="/register" />
          <PrivateRoute exact component={() => <div>sraya</div>} path="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
