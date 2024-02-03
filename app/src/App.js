import React from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from './components/Home';
import Header from './components/Header';
import About from './components/About'
import Projects from './components/Projects';
import SpaceInvaders from "./components/projects/SpaceInvaders";
import Snake from "./components/projects/Snake";
import { AnimatePresence } from "framer-motion";

function App() {

  return (

    <div className='App'>
      <Header />
      <div className="content">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/About" element={<About />}></Route>
            <Route path="/Projects" element={<Projects />}></Route>
            <Route path="Projects/SpaceInvaders" element={<SpaceInvaders />}></Route>
            <Route path="Projects/Snake" element={<Snake />}></Route>
            
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
