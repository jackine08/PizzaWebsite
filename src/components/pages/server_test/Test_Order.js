import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Test_order = () => {
  const navigate = useNavigate();
  const testHandler1 = () => {
    //set Test
    var setObj = {
      menu: "Valentine",
      style: "Deluxe",
      state: "Cart",
      num: 1,
      change: "Nothing!",
    };
    axios.post("order/set", setObj).then((response) => {
      console.log("set Test : ", response);
      navigate("/Test_Order");
    });
  };
  const testHandler2 = () => {
    //modify Test
    var setObj = {
      order_id: 2,
      state: "Cook",
    };
    axios.post("order/modify", setObj).then((response) => {
      console.log("modify Test : ", response);
      navigate("/Test_Order");
    });
  };
  const testHandler3 = () => {
    //get Test

    axios
      .post("order/get", { uid: "Custmoer", state: "Cart" })
      .then((response) => {
        console.log("get Test : ", response);
        navigate("/Test_Order");
      });
  };
  return (
    <div>
      <input type="button" value="setTest" onClick={testHandler3}></input>
    </div>
  );
};
export default Test_order;
