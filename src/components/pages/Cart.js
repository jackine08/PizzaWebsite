import axios from "axios";
import React from "react";
import { CartList } from "../../helpers/CartList";
import Counter from "../../helpers/Counter";
import "../../styles/Cart.css";

const Cart = () => {
  function get_cart_data() {
    var obj = {
      uid: "",
      state: "Cart",
    };
    var contents = [];

    axios.post("order/get", obj).then((res) => {
      console.log("order get Success");
      console.log(res.data);
      contents = res.data;
    });
    return contents;
  }

  function pay() {}

  const CartItem = ({ key, menu, style, number, state }) => {
    return (
      <div className="cartItem" key={key}>
        <p>
          {menu}&nbsp;&nbsp;&nbsp;&nbsp;
          {style}
        </p>
        <p>{state}</p>
      </div>
    );
  };

  var cart_data = get_cart_data();

  return (
    <div className="cart">
      <h1 className="cartTitle">Cart</h1>
      <div className="cartList">
        {cart_data.map((cartItem) => {
          return (
            <CartItem
              key={cartItem.menu}
              menu={cartItem.menu}
              style={cartItem.style}
              number={cartItem.numbers}
              state={cartItem.status}
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
