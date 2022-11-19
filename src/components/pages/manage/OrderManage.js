import React, { useState } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { OrderList } from "../../../helpers/OrderList";
import "../../../styles/Order.css";
import { LocalParking } from "@material-ui/icons";
const get_order = async () => {
  var obj = { uid: "Manager" };
  console.log("get in sss");
  const order_data = axios.post("order/get", obj);
  console.log("will return order data");
  return (await order_data).data;
};

const OrderManage = () => {
  var order_data = [];
  var order_data_done = [];

  const [data_to_show, set_data] = useState(Get_order_data(0));

  var data_state = 0;

  function Get_order_data() {
    //get order using post communication
    console.log("will get order data");
    let [contents, setContents] = useState([]);
    //let contents;
    const Order_promise = get_order();
    Order_promise.then((res) => {
      console.log("res is : ", res);
      //contents = res;
      setContents(res);
    });

    console.log("contents is : ", contents);
    for (var i = 0; i < contents.length; i++) {
      if (contents[i].state == "Done") {
        console.log("pushed done");
        order_data_done.push(contents[i]);
      } else {
        console.log("pushed no done");
        order_data.push(contents[i]);
      }
    }
    console.log("Point1");
    return order_data;
  }

  function changeState(order_id, state) {
    var obj = { order_id: order_id, state: state };
    console.log(obj);
    axios
      .post("order/modify", obj)
      .then((res) => {
        if (res.status == "Success") {
          console.log("change Done");
        }
      })
      .catch((e) => {
        console.error(e);
      });
    console.log("S1");
    set_data(Get_order_data());
    console.log("S2");
    console.log("Point3");
  }

  const OrderItem = ({ key, menu, state, id }) => {
    console.log("in Order Item");
    return (
      <div className="orderItem">
        <h1>{id}</h1>
        <p>{menu}</p>
        <p>{state}</p>
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
            changeState(id, "Done");
          }}></input>
      </div>
    );
  };

  function change_data_to_show(state) {
    //console.log("Point4");
    if (state == 1) {
      set_data(order_data_done);
    } else {
      set_data(order_data);
    }
  }
  //console.log("Point5");
  const element = (
    <div className="order">
      <h1 className="orderTitle">Order list</h1>
      <input
        type="button"
        value="InProgress"
        onClick={() => change_data_to_show(0)}
      />
      <input
        type="button"
        value="Done"
        onClick={() => change_data_to_show(1)}
      />
      <div className="orderList">
        {data_to_show.map((orderItem) => {
          return (
            <OrderItem
              key={orderItem.order_id}
              menu={orderItem.menu}
              state={orderItem.state}
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
