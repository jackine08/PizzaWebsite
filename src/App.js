import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
                <Route  path="/" element={<Navbar/>}/>

            </Routes>
        </Router>
      <Navbar/>
    </div>
  );
}

export default App;
