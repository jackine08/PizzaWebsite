import React, {useState} from 'react';
import Logo from '../images/pizzaLogo.png';
import '../styles/Navbar.css';
import {Link} from "react-router-dom";
import ReorderIcon from "@material-ui/icons/Reorder";

const Navbar = () => {
    const [openLinks, setOpenLinks] = useState(false);

    const toggleNavbar = () => {
          setOpenLinks(!openLinks);
    };

    return (
        <div className='navbar'>
            <div className="leftSide" id={openLinks? "open" : "close"}>
                <img src={Logo} alt="logo"/>
                <div className="hiddenLinks">
                    <Link to="/home">Home</Link>
                    <Link to="/menu">Menu</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                </div>
            </div>
            <div className="rightSide">
                <Link to="/home">Home</Link>
                <Link to="/menu">Menu</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <button onClick={toggleNavbar}>
                    <ReorderIcon/>
                </button>
            </div>
        </div>
    );
};

export default Navbar;
