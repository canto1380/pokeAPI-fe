import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './components/Home';
import PokeData from './components/PokeData';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route exact path='/pokemon/:id' element={<PokeData/>} />
      </Routes>
    </Router>
  );
}

export default App;
