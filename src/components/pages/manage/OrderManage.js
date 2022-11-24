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
  let [stock_data, set_stockdata] = useState([]);
  let [id_order, set_id] = useState([]);
  var contents = [];
  var view_state = 0;
  function confirm_pay(order_id) {
    //재고 목록 가져와서 available check
    // if fail alert No Success then just keep going
    //근데 재고 소진으로 주문 불가능 하면 상태를 바꿔주고 .. ?
    axios.post("order/getbyid", { order_id: order_id }).then((res) => {
      console.log("response is :", res);
      if (res.data === "Fail") {
        console.log("Error");
        return;
      } else {
        console.log(res.data);
        console.log("data test", res.data[0].menu, res.data[0].style);
        let user = res.data[0];
        if (user.menu === "발렌타인 디너") {
          if (user.numbers + user.steak > stock_data[0].steak) {
            console.log("over");
            alert("재고 소진, 주문 승인이 불가능 합니다.");
            return;
          } else {
            let tmp = -(user.numbers + user.steak_num);
            console.log("now tmp :", tmp);
            axios.post("stock/set", {
              steak: tmp,
              salad: 0,
              egg: 0,
              bacon: 0,
              bread: 0,
            });
            changeState(order_id, "payment_confirm");
          }
        } else if (user.menu === "프렌치 디너") {
          let nsteak, nsalad;
          nsteak = user.numbers + user.steak_num;
          nsalad = user.numbers + user.salad_num;
          if (nsteak > stock_data[0].steak || nsalad > stock_data[0].salad) {
            console.log("over");
            alert("재고 소진, 주문 승인이 불가능 합니다.");
            return;
          } else {
            nsteak = -nsteak;
            nsalad = -nsalad;
            axios.post("stock/set", {
              steak: nsteak,
              salad: nsalad,
              egg: 0,
              bacon: 0,
              bread: 0,
            });
            changeState(order_id, "payment_confirm");
          }
        } else if (user.menu === "잉글리시 디너") {
          let nsteak, negg, nbacon, nbread;
          nsteak = user.numbers + user.steak_num;
          negg = user.numbers + user.egg_num;
          nbacon = user.numbers + user.bacon_num;
          nbread = user.numbers + user.bread_num;
          if (
            nsteak > stock_data[0].steak ||
            negg > stock_data[0].egg ||
            nbacon > stock_data[0].bacon ||
            nbread > stock_data[0].bread
          ) {
            console.log("over");
            alert("재고 소진, 주문 승인이 불가능 합니다.");
            return;
          } else {
            nsteak = -nsteak;
            negg = -negg;
            nbacon = -nbacon;
            nbread = -nbread;
            axios.post("stock/set", {
              steak: nsteak,
              salad: 0,
              egg: negg,
              bacon: nbacon,
              bread: nbread,
            });
            changeState(order_id, "payment_confirm");
          }
        } else {
          let nsteak, nbread;
          nsteak = user.numbers + user.steak_num;
          nbread = user.numbers + user.bread_num;
          if (nsteak > stock_data[0].steak || nbread > stock_data[0].bread) {
            console.log("over");
            alert("재고 소진, 주문 승인이 불가능 합니다.");
            return;
          } else {
            nsteak = -nsteak;
            nbread = -nbread;
            axios.post("stock/set", {
              steak: nsteak,
              salad: 0,
              egg: 0,
              bacon: 0,
              bread: nbread,
            });
            changeState(order_id, "payment_confirm");
          }
        }
        console.log(
          "stock test",
          stock_data[0],
          stock_data[0].steak,
          stock_data[0].salad
        );
        set_id(res.data);
      }
    });
    console.log("id order check", id_order);
  }
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
    fetch_data();
  }

  const mounted = useRef(false);

  const fetch_data = async () => {
    try {
      var temp1 = [];
      var temp2 = [];
      var obj = { uid: "Manager" };
      const res = await axios.post("/order/get", obj);
      // 받아온 데이터를 useState 를 이용하여 선언한다.
      set_data(res.data);
      contents = res.data;

      for (var i = 0; i < contents.length; i++) {
        let state = contents[i].order_status;
        if (state == "cook_Done") {
          console.log("pushed done:", contents[i]);
          temp2.push(contents[i]);
        } else if (
          state == "payment" ||
          state == "payment_confirm" ||
          state == "cooking"
        ) {
          console.log("pushed no done:", contents[i]);
          temp1.push(contents[i]);
        }
      }
      set_order_data(temp1);
      set_order_data_done(temp2);
      console.log("now order data : ", temp1);
      console.log("now done order data", temp2);
      set_data(temp1);
      console.log("set_data_to_show_donw");

      const res2 = await axios.post("stock/get");
      set_stockdata(res2.data);
    } catch (e) {
      console.error(e.message);
    }
    console.log("In use Effect");
  };

  useEffect(() => {
    fetch_data();
  }, []);

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
  const OrderItem = ({
    key,
    menu,
    state,
    id,
    style,
    number,
    steak,
    salad,
    egg,
    bacon,
    bread,
    wine,
    delivery_date,
    delivery_time,
  }) => {
    console.log("in Order Item");
    return (
      <div className="orderItem">
        <h1>주문번호: {id}</h1>
        <p>
          name: {menu} style: {style} 수량 : {number}
        </p>
        <p>order_status: {state}</p>
        <p> 추가 주문 사항 </p>
        <p>
          {steak > 0 && <p> Steak : {steak}</p>}{" "}
          {wine > 0 && <p> Liquor : {wine} </p>}
          {salad > 0 && <p> Salad : {salad}</p>}
          {egg > 0 && <p>Egg : {egg}</p>}
          {bacon > 0 && <p>Bacon : {bacon}</p>}
          {bread > 0 && <p>Bread : {bread}</p>}{" "}
        </p>
        <p>Delivery_Date : {delivery_date}</p>
        <p>Delivery_Time : {delivery_time}</p>
        <input
          type="button"
          value="payment_comfirm"
          onClick={() => {
            confirm_pay(id);
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
              style={orderItem.style}
              number={orderItem.numbers}
              steak={orderItem.steak_num}
              salad={orderItem.salad_num}
              egg={orderItem.egg_num}
              bacon={orderItem.bacon_num}
              bread={orderItem.bread_num}
              wine={orderItem.wine_num}
              delivery_date={orderItem.delivery_date}
              delivery_time={orderItem.delivery_time}
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
