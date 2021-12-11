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
                <h1>Great Ever Pizzeria!</h1>
                <p>PIZZA TO FIT ANY TASTE</p>
                <Link to="/menu">
                    <button>ORDER NOW</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;