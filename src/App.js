import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Menu from "./components/pages/Menu";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/menu" element={<Menu/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
