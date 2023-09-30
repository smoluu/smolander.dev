import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, NavLink, Routes, HashRouter } from "react-router-dom";
import './App.css';
import Home from './components/Home';
import Header from './components/Header';
import About from './components/About'
import Projects from './components/Projects';

function App() {
  return (
    <HashRouter>
      <div className='App'>
        <Header></Header>
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/About" element={<About />}></Route>
            <Route exact path="/Projects" element={<Projects/>}></Route>
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}
export default App;
