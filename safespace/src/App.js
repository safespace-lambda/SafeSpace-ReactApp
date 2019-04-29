import React from 'react';
import {Route} from 'react-router-dom';

import './App.scss';


import Header from './components/Header';
import SafeSpace from './components/SafeSpace';
import Login from './components/Login';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
      <Header />
      <Route path='/login' component={Login} />
      <Route path='/' component={SafeSpace} />
      <Footer />
    </div>
  );
}

export default App;
