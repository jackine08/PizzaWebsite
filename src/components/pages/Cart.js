import axios from "axios";
import React, { useState, useEffect } from "react";
import Counter from "../../helpers/Counter";
import "../../styles/Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  function get_cart_data() {
    var obj = {
      uid: "",
      state: "Cart",
    };
    var contents = [];
    axios.post("order/get", obj).then((res) => {
      console.log("order get Success");
      set_data(res.data);
      console.log(data_to_show);
    });

    return contents;
  }
  var [data_to_show, set_data] = useState([]);

  function pay() {
    //cart에서 결제할 항목 선택 후 거기서 선택된 애들만 결제해야 함..

    var obj = { order_id: "", state: "before_pay" };
    axios
      .post("order/modify", obj)
      .then((res) => {
        console.log("res :", res);
        if (res.data.status == "Success") {
          console.log("change Done");
          navigate("/Pay");
        } else console.log("change Fail");
      })
      .catch((e) => {
        console.error(e);
      });

    return 0;
  }

  const CartItem = ({ key, menu, style, number, state }) => {
    return (
      <div className="cartItem" key={key}>
        <p>
          {menu}&nbsp;&nbsp;&nbsp;&nbsp;
          {style}
        </p>
        <p>{number}</p>
        <p>{state}</p>
      </div>
    );
  };

  useEffect(async () => {
    try {
      var obj = { uid: "", state: "Cart" };
      const res = await axios.post("order/get", obj);
      // 받아온 데이터를 useState 를 이용하여 선언한다.
      set_data(res.data);
    } catch (e) {
      console.error(e.message);
    }
  }, []);

  return (
    <div className="cart">
      <h1 className="cartTitle">Cart</h1>
      <input type="button" value="load" onClick={get_cart_data}></input>
      <div className="cartList">
        {data_to_show.map((cartItem) => {
          return (
            <CartItem
              key={cartItem.menu}
              menu={cartItem.menu}
              style={cartItem.style}
              number={cartItem.numbers}
              state={cartItem.order_status}
            />
          );
        })}
      </div>
      <div>
        <input type="button" value="결제하기" onClick={pay}></input>
      </div>
    </div>
  );
};

export default Cart;
