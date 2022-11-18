import React, { useState } from "react";
import { Link } from "react-router-dom";
import BannerImage from "../../images/pizza.jpeg";
import "../../styles/Home.css";
import axios from "axios";
const logcheck = async () => {
  const check = await axios.get("auth/check_login");
  return check.data;
};
const Home = () => {
  let [is_logined, setIs_logined] = useState([]);
  let [name, setName] = useState([]);
  const getcheck = logcheck();
  getcheck.then((res) => {
    setIs_logined(res.islogin);
    setName(res.name);
  });
  if (is_logined === "True") {
    return (
      <div className="home" style={{ backgroundImage: `url(${BannerImage}` }}>
        Welcome !
        <div className="headerContainer">
          <Link to="/menu">
            <button>Get Order!</button>
          </Link>
          <h1> </h1>
        </div>
      </div>
    );
  } else {
    return (
      <div className="home" style={{ backgroundImage: `url(${BannerImage}` }}>
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
  }
};

export default Home;
