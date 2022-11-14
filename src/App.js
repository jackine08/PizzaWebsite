import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Menu from "./components/pages/Menu";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Footer from "./components/Footer";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

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
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;
