import axios from "axios";
import React, { useState, useEffect } from "react";
import "../../styles/Cart.css";
import { useNavigate } from "react-router-dom";

const Previous_Order = () => {
  const navigate = useNavigate();
  var [order_info, set_orderinfo] = useState([]);
  var [target, set_target] = useState();
  function reorderHandler(order_id) {
    console.log("called reorder handler");
    console.log("in : ", order_id);
    axios.post("order/reorder_byid", {
      order_id: order_id,
    });

    console.log("after reorder will navigate to pay page");
    navigate("/Pay");
  }
  const reorder = async () => {
    try {
      console.log("in reorder id is :", target);
      const res = await axios.post("order/reorder_byid", {
        order_id: target,
      });

      console.log("tmp log : ", res);
    } catch (e) {
      console.error(e.message);
    }
  };
  const OrderItem = ({
    key,
    menu,
    style,
    number,
    steak,
    salad,
    egg,
    bacon,
    bread,
    wine,
    price,
    order_id,
    delivery_date,
    delivery_time,
  }) => {
    return (
      <div className="cartItem" key={key}>
        <p>
          메뉴 : {menu}&nbsp;&nbsp;&nbsp;&nbsp; 스타일 : {style}{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;주문 수량 : {number}
        </p>
        <p> </p>
        <p> 추가 주문 사항 </p>
        <p>
          {steak > 0 && <p> Steak : {steak}</p>}{" "}
          {wine > 0 && <p> Liquor : {wine} </p>}
          {salad > 0 && <p> Salad : {salad}</p>}
          {egg > 0 && <p>Egg : {egg}</p>}
          {bacon > 0 && <p>Bacon : {bacon}</p>}
          {bread > 0 && <p>Bread : {bread}</p>}{" "}
        </p>
        <p>Price : {price}</p>
        <p>Delivery_Date : {delivery_date}</p>
        <p>Delivery_Time : {delivery_time}</p>
        <p></p>
        <div>
          <input
            type="button"
            value="Re-Order"
            onClick={() => {
              reorderHandler(order_id);
            }}></input>
        </div>
      </div>
    );
  };
  useEffect(async () => {
    console.log("in effect");
    try {
      let obj = { uid: "", state: "delivery_done" };
      const res2 = await axios.post("order/get", obj);
      console.log(res2.data);
      set_orderinfo(res2.data);
    } catch (e) {
      console.error(e.message);
    }
  }, []);
  return (
    <div>
      <div>
        <p>YOUR Previous ORDER</p>
      </div>
      <div className="cartList">
        {order_info.map((orderItem) => {
          return (
            <OrderItem
              key={orderItem.order_id}
              menu={orderItem.menu}
              style={orderItem.style}
              number={orderItem.numbers}
              steak={orderItem.steak_num}
              salad={orderItem.salad_num}
              egg={orderItem.egg_num}
              bacon={orderItem.bacon_num}
              bread={orderItem.bread_num}
              wine={orderItem.wine_num}
              price={orderItem.total_price}
              order_id={orderItem.order_id}
              delivery_date={orderItem.delivery_date}
              delivery_time={orderItem.delivery_time}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Previous_Order;
