import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { OrderList } from "../../../helpers/OrderList";
import "../../../styles/Order.css";
import { LocalParking } from "@material-ui/icons";
import Login from "../Login";

const OrderManage = () => {

  const [data_to_show, set_data] = useState([]);
  var order_data = [];
  var order_data_done = [];
  var contents = [];


  function get_order_data(){
    order_data = [];
    order_data_done = [];

    const temp = async() => {
      try{
          var obj = { uid: "Manager"};
          const res = await axios.post('/order/get', obj);
          // 받아온 데이터를 useState 를 이용하여 선언한다.
          contents = res.data;
          } catch(e) {
              console.error(e.message)
          }
      }
    // 받아온 데이터를 useState 를 이용하여 선언한다.

    for (var i = 0; i < contents.length; i++) {
        console.log("state check", contents[i].order_status);
        if (contents[i].order_status == "Done") {
        //console.log("pushed done");
        order_data_done.push(contents[i]);
        } else {
        //console.log("pushed no done");
        order_data.push(contents[i]);
        }
    }
    // console.log("Point1");
    return order_data;
  };

  function changeState(order_id, state) {
    var obj = { order_id: order_id, state: state };
    console.log(obj);
    axios
      .post("order/modify", obj)
      .then((res) => {
        if (res.status == "Success") {
          console.log("change Done");
        } else console.log("change Fail");
      })
      .catch((e) => {
        console.error(e);
      });
    };


  function change_data_to_show(state) {
    console.log("change_data_to_show");
    console.log(order_data);
    console.log(order_data_done);

    if (state == 1) {
      set_data(order_data_done);
    } else {
      set_data(order_data);
    }
  }

  useEffect(async() => {
      try{
          var obj = { uid: "Manager"};
          const res = await axios.post('/order/get', obj);
          // 받아온 데이터를 useState 를 이용하여 선언한다.
          set_data(res.data);
          contents = res.data;
          for (var i = 0; i < contents.length; i++) {
              if (contents[i].order_status == "Done") {
              //console.log("pushed done");
                order_data_done.push(contents[i]);
              } else {
              //console.log("pushed no done");
              order_data.push(contents[i]);
              }
          }
          console.log(order_data);
          console.log(order_data_done);
          } catch(e) {
              console.error(e.message)
          }
    },[])

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
