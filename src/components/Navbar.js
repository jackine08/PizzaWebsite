import React, { useState } from "react";
import Logo from "../images/pizzaLogo.png";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import ReorderIcon from "@material-ui/icons/Reorder";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//<Link to="/Test_Order">Test</Link>
const Navbar = () => {
  const [openLinks, setOpenLinks] = useState(false);
  const navigate = useNavigate();
  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };
  const logoutHandler = () => {
    axios.post("auth/logout").then((response) => {
      navigate("/home");
    });
  };

  let [is_logined, setIs_logined] = useState([]);
  let [name, setName] = useState([]);
  axios
    .get("auth/check_login")
    .then((response) => {
      //console.log(response.data.islogin);
      if (response.data.islogin === "True") {
        //console.log("Already Logined!");
        setIs_logined("True");
        setName(response.data.name);
      } else {
        //console.log("entered else");
        setIs_logined("False");
        setName("");
      }
    })
    .catch((e) => {
      console.error(e);
    });
  //console.log(is_logined);
  //console.log(name);
  //이거 welcome name부분 글자색이 검은색임 ㅠㅠ
  if (is_logined === "True") {
    console.log("yes login");
    return (
      <div className="navbar">
        <div>
          <p>
            Welcome! {name}
            <button onClick={logoutHandler}>Logout</button>
          </p>
        </div>
        <div className="leftSide" id={openLinks ? "open" : "close"}>
          <img src={Logo} alt="logo" />
          <div className="hiddenLinks">
            <Link to="/">Home</Link>
            <Link to="/menu">Menu</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div className="rightSide">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/OrderManage">OrderManage</Link>
          <Link to="/IngredientManage">IngredientManage</Link>

          <Link to="/Test_Stock">Test2</Link>
          <button onClick={toggleNavbar}>
            <ReorderIcon />
          </button>
        </div>
      </div>
    );
  } else {
    console.log("no login");
    return (
      <div className="navbar">
        <div className="leftSide" id={openLinks ? "open" : "close"}>
          <img src={Logo} alt="logo" />
          <Link to="/login">Login</Link>
          <div className="hiddenLinks">
            <Link to="/">Home</Link>
            <Link to="/menu">Menu</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div className="rightSide">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/OrderManage">OrderManage</Link>
          <Link to="/IngredientManage">IngredientManage</Link>

          <Link to="/Test_Stock">Test2</Link>
          <button onClick={toggleNavbar}>
            <ReorderIcon />
          </button>
        </div>
      </div>
    );
  }
};
export default Navbar;
