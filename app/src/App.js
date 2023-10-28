import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import './App.css';
import Home from './components/Home';
import Header from './components/Header';
import About from './components/About'
import Projects from './components/Projects';
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();
  return (
    
      <div className='App'>
        <Header/>
        <div className="content">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/About" element={<About />}></Route>
              <Route exact path="/Projects" element={<Projects />}></Route>
            </Routes>
          </AnimatePresence>
        </div>
      </div>
  );
}
export default App;
