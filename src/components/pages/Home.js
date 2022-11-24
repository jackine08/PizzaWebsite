import React, { useState } from "react";
import { Link } from "react-router-dom";
import BannerImage from "../../images/home_rest.jpg";
import "../../styles/Home.css";
import axios from "axios";
const logcheck = async () => {
  const check = await axios.post("auth/check_login");
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
    if(name=="Manager"){
        return (
          <div className="home" style={{ backgroundImage: `url(${BannerImage}` }}>
            Welcome !
            <div className="headerContainer">
              <Link to="/OrderManage">
                <button>OrderManage</button>
              </Link>
              <Link to="/DeliveryManage">
                <button>DeliveryManage</button>
              </Link>
              <Link to="/IngredientManage">
                <button>IngredientManage</button>
              </Link>
            </div>
          </div>
      );
    }else{
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
  );};
  } else {
    return (
      <div className="home" style={{ backgroundImage: `url(${BannerImage}` }}>
        <div className="headerContainer">
          <Link to="/login">
            <button>Login</button>
          </Link>
          <h1></h1>
          <Link to="/Register">
            <button>Register</button>
          </Link>
        </div>
        <div className="headerContainer">
          <p>
            특별한 날에 집에서 편안히 보내며 당신의 남편,아내 엄마,아버지 또는
            친구를 감동시켜라.
          </p>
        </div>
      </div>
    );
  }
};

export default Home;
