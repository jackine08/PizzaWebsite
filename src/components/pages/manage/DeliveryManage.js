import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { OrderList } from "../../../helpers/OrderList";
import "../../../styles/Order.css";
import { LocalParking } from "@material-ui/icons";
import Login from "../Login";

const DeliveryManage = () => {
  const [data_to_show, set_data] = useState([]);
  let [order_data, set_order_data] = useState([]);
  let [order_data_done, set_order_data_done] = useState([]);
  var contents = [];
  var view_state = 0;


  function changeState(order_id, state) {
    var obj = { order_id: order_id, state: state };
    console.log(obj);
    const __data_temp = async()=>{
        try{
            console.log(obj);
            const __res = await axios.post("order/modify", obj);
            var __temp = __res.data;
            console.log(__res.data);
            if (__temp.status == "Success") {
              console.log("delivery change Done");
          } else console.log("delivery change Fail");
        } catch (e) {
          console.error(e.message);
        }
    }
    fetch_data();
  }

  const mounted = useRef(false);

  const fetch_data = async () => {
      try {
        var temp1 = [];
        var temp2 = [];
        var obj = { uid: "Manager", state:"" };
        const res = await axios.post("order/get", obj);
        // 받아온 데이터를 useState 를 이용하여 선언한다.
        contents = res.data;
        console.log("contents: ",contents);

        for (var i = 0; i < contents.length; i++) {
          if (contents[i].order_status == "cook_Done" || contents[i].order_status == "on_Delivery") {
            console.log("pushed done:", contents[i]);
            temp1.push(contents[i]);
        } else if(contents[i].order_status == "Delivery_done"){
            console.log("pushed no done:", contents[i]);
            temp2.push(contents[i]);
          }
        }
        set_order_data(temp1);
        set_order_data_done(temp2);
        console.log("now order data : ", temp1);
        console.log("now done order data", temp2);;
        set_data(temp1);
        console.log("set_data_to_show_donw");
      } catch (e) {
        console.error(e.message);
      }
    console.log("In use Effect");
    };

  useEffect(()=>{fetch_data();}, []);

  function Change_data_to_show(state) {
    console.log("change_data_to_show");
    // console.log(order_data);
    // console.log(order_data_done);
    if (state == 1) {
      set_data(order_data_done);
      console.log("load done data", data_to_show);
    } else {
      set_data(order_data);
      console.log("load not done data ", data_to_show);
    }
  }

  //console.log("Point5");
  const DeliveryItem = ({ key, menu, state, id, change }) => {
    console.log("in Delivery Item");
    return (
      <div className="orderItem">
        <h1>주문번호: {id}</h1>
        <p>name: {menu}</p>
        <p>order_status: {state}</p>
        <p>change: {change}</p>
        <input
          type="button"
          value="cook_Done"
          onClick={() => {
            changeState(id, "cook_Done");
          }}></input>
        <input
          type="button"
          value="on_Delivery"
          onClick={() => {
            changeState(id, "on_Delivery");
          }}></input>
        <input
          type="button"
          value="Delivery_done"
          onClick={() => {
            changeState(id, "Delivery_done");
          }}></input>
      </div>
    );
  };

  const element = (
    <div className="order">
      <h1 className="orderTitle">Delivery list</h1>
      <input
        type="button"
        value="InDelivery"
        onClick={() => Change_data_to_show(0)}
      />
      <input
        type="button"
        value="Delivery_Done"
        onClick={() => Change_data_to_show(1)}
      />
      <div className="orderList">
        {data_to_show.map((orderItem) => {
          return (
            <DeliveryItem
              key={orderItem.order_id}
              menu={orderItem.menu}
              state={orderItem.order_status}
              id={orderItem.order_id}
              change={orderItem.change_list}
            />
          );
        })}
      </div>
    </div>
  );
  //console.log("Point5");
  return element;
};

export default DeliveryManage;
