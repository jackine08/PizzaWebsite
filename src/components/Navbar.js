import React, { useState } from "react";
import Logo from "../images/pizzaLogo.png";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import ReorderIcon from "@material-ui/icons/Reorder";
import axios from "axios";
var is_login;
const Navbar = () => {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };
  //login session정보 받아오기
  //true 면 Welcom, $(name) , (linkt to /auth/logout)logout
  //false면 Login(link to login(this))
  //let is_logined;
  //let name;
  console.log("before axios1");
  console.log("before axios2");
  axios
    .get("/auth/check_login")
    .then((response) => {
      console.log(response.data.islogin);
      if (response.data.islogin === "True") {
        console.log("Already Logined!");
        is_login = (
          <p>
            <i>Welcome! ${response.data.name}</i>{" "}
            <a href="/auth/logout">logout</a>
          </p>
        );
        //is_logined = true;
        //name = response.data.name;
      } else {
        is_login = <Link to="/login">Login</Link>;
        //is_logined = false;
      }
    })
    .catch((e) => {
      console.error(e);
    });
  //   if (is_logined) {
  //     is_login = (
  //       <p>
  //         <i>Welcome! ${name}</i> <a href="/auth/logout">logout</a>
  //       </p>
  //     );
  //   } else {
  //     is_login = <Link to="/login">Login</Link>;
  //   }
  console.log("before Return and after axios");
  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <img src={Logo} alt="logo" />
        <div className="hiddenLinks">
          <Link to="/home">Home</Link>
          <Link to="/menu">Menu</Link>
        </div>
        ${is_login}
      </div>
      <div className="rightSide">
        <Link to="/home">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <button onClick={toggleNavbar}>
          <ReorderIcon />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
