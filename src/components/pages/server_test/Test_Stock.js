import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Test_Stock = () => {
  const navigate = useNavigate();
  const testHandler1 = () => {
    //get Test

    axios.post("stock/get").then((response) => {
      console.log("get Test : ", response);
      navigate("/Test_Stock");
    });
  };
  const testHandler2 = () => {
    //get Test
    var setObj = {
      steak: -2,
      salad: -1,
      egg: -2,
      bacon: -2,
      bread: -1,
    };
    axios.post("stock/set", setObj).then((response) => {
      console.log("set Test : ", response);
      navigate("/Test_Stock");
    });
  };
  return (
    <div>
      <input type="button" value="Test" onClick={testHandler2}></input>
    </div>
  );
};

export default Test_Stock;
