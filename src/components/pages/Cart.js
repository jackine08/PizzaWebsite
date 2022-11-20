import axios from "axios";
import React, { useState, useEffect } from "react";
import Counter from "../../helpers/Counter";
import "../../styles/Cart.css";

const Cart = () => {


    function get_cart_data() {
        var obj = {
          uid: "",
          state: "Cart"
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


      return 0;
  }

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

  useEffect(async() => {
    try{
        var obj = { uid: "", state: "Cart"};
        const res = await axios.post('/order/get', obj);
        // 받아온 데이터를 useState 를 이용하여 선언한다.
        set_data(res.data);
        } catch(e) {
            console.error(e.message)
        }
    },[])

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
