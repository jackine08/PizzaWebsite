import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { OrderList } from "../../../helpers/OrderList";
import "../../../styles/Order.css";
import { LocalParking } from "@material-ui/icons";
import Login from "../Login";

const OrderManage = () => {
  const [data_to_show, set_data] = useState([]);
  let [order_data, set_order_data] = useState([]);
  let [order_data_done, set_order_data_done] = useState([]);
  var contents = [];

  function changeState(order_id, state) {
    var obj = { order_id: order_id, state: state };
    console.log(obj);
    axios
      .post("order/modify", obj)
      .then((res) => {
        if (res.data.status == "Success") {
          console.log("change Done");
        } else console.log("change Fail");
      })
      .catch((e) => {
        console.error(e);
      });
  }

  const mounted = useRef(false);
  let [view_state, set_viewstate] = useState();

  useEffect(async () => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      try {
        var temp1 = [];
        var temp2 = [];
        var obj = { uid: "Manager" };
        const res = await axios.post("/order/get", obj);
        // 받아온 데이터를 useState 를 이용하여 선언한다.
        set_data(res.data);
        contents = res.data;

        for (var i = 0; i < contents.length; i++) {
          if (contents[i].order_status == "cook_Done") {
            console.log("pushed done:", contents[i]);
            temp2.push(contents[i]);
          } else {
            console.log("pushed no done:", contents[i]);
            temp1.push(contents[i]);
          }
        }
        set_order_data(temp1);
        set_order_data_done(temp2);
        console.log("now order data : ", temp1);
        console.log("now done order data", temp2);
      } catch (e) {
        console.error(e.message);
      }
    }
    console.log("In use Effect");
  }, [view_state]);

  function Change_data_to_show(state) {
    console.log("change_data_to_show");
    // console.log(order_data);
    // console.log(order_data_done);
    if (state == 1) {
      set_viewstate(view_state + 1);
      set_data(order_data_done);
      console.log("load done data", data_to_show);
    } else {
      set_viewstate(view_state + 1);
      set_data(order_data);
      console.log("load not done data ", data_to_show);
    }
  }

  //console.log("Point5");
  const OrderItem = ({ key, menu, state, id }) => {
    console.log("in Order Item");
    return (
      <div className="orderItem">
        <h1>주문번호: {id}</h1>
        <p>name: {menu}</p>
        <p>order_status: {state}</p>
        <input
          type="button"
          value="payment_comfirm"
          onClick={() => {
            changeState(id, "payment");
          }}></input>
        <input
          type="button"
          value="cooking"
          onClick={() => {
            changeState(id, "cooking");
          }}></input>
        <input
          type="button"
          value="cook_done"
          onClick={() => {
            changeState(id, "cook_Done");
          }}></input>
      </div>
    );
  };

  const element = (
    <div className="order">
      <h1 className="orderTitle">Order list</h1>
      <input
        type="button"
        value="InProgress"
        onClick={() => Change_data_to_show(0)}
      />
      <input
        type="button"
        value="cook_Done"
        onClick={() => Change_data_to_show(1)}
      />
      <div className="orderList">
        {data_to_show.map((orderItem) => {
          return (
            <OrderItem
              key={orderItem.order_id}
              menu={orderItem.menu}
              state={orderItem.order_status}
              id={orderItem.order_id}
            />
          );
        })}
      </div>
    </div>
  );
  //console.log("Point5");
  return element;
};

export default OrderManage;
