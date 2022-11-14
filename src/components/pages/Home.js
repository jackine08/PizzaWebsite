import React from 'react';
import {Link} from 'react-router-dom';
import BannerImage from '../../images/pizza.jpeg';
import '../../styles/Home.css';

const Home = () => {
    return (
        <div
            className="home"
            style={{backgroundImage: `url(${BannerImage}`}}
        >
            <div className="headerContainer">
                <Link to="/login">
                    <button>Login</button>
                </Link>
                <h1> </h1>
                <Link to="/Register">
                    <button>Register</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
