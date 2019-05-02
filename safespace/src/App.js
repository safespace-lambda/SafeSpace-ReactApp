import React from 'react';
import {Route,Redirect,Switch} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';


import './App.scss';

import Header from './components/Header';
import SafeSpace from './components/SafeSpace';
import Login from './components/Login';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
        <Route exact path='/' component={Header} />
        <Route path='/login' component={Login} />
        <PrivateRoute exact path='/' component={SafeSpace} />
        <Route exact path='/' component={Footer} />
    </div>
  );
}

export default App;
