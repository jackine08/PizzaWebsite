import React, { useState } from "react";
import Logo from "../images/pizzaLogo.png";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import ReorderIcon from "@material-ui/icons/Reorder";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//<Link to="/Test_Order">Test</Link>
const logcheck = async () => {
  const check = await axios.get("auth/check_login");
  console.log(check);
  console.log(check.data);
  console.log(check.data.islogin);
  console.log(check.data.name);
  return check.data;
};

const Navbar = () => {
  const [openLinks, setOpenLinks] = useState(false);
  const navigate = useNavigate();
  let [is_logined, setIs_logined] = useState([]);
  let [name, setName] = useState([]);
  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };
  const logoutHandler = () => {
    axios.post("auth/logout").then((response) => {
      setIs_logined("False");
      navigate("/");
    });
  };

  const getcheck = logcheck();
  getcheck.then((res) => {
    console.log("PT1");
    console.log("pro res : ", res);
    console.log("pro val", res.name, res.islogin);
    setIs_logined(res.islogin);
    setName(res.name);
  });
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
          </div>
        </div>
        <div className="rightSide">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/cart">Cart</Link>
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
          </div>
        </div>
        <div className="rightSide">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/OrderManage">OrderManage</Link>
          <Link to="/IngredientManage">IngredientManage</Link>
          <Link to="/DeliveryManage">DeliveryManage</Link>
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
