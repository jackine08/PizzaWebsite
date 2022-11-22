import axios from "axios";
import React, { useState, useEffect } from "react";
import Counter from "../../helpers/Counter";
import "../../styles/Cart.css";
import { useNavigate } from "react-router-dom";

const Pay = () => {
  const navigate = useNavigate();

  //before pay인 애들을 get 해서 정보 조작 필요..
  //고객의 정보, 주문 정보 불러와서 화면에 보여주고
  //메뉴?로 이동시키기
  function payhandler() {
    var obj = { order_id: "", state: "payment" };
    console.log("now total !!", total_price);
    //visit 증가시킴
    axios.post("auth/set").then((res) => {
      if (res.data == "Fail") {
        alert("결제에 실패했습니다");
        navigate("/Pay");
      }
    });

    axios
      .post("order/modify", obj)
      .then((res) => {
        if (res.data.status == "Success") {
          console.log("pay Done");
          alert("결제가 완료되었습니다.");
          navigate("/menu");
        } else console.log("pay Fail");
      })
      .catch((e) => {
        console.error(e);
      });
  }
  var [user_info, set_userinfo] = useState([]);
  var [order_info, set_orderinfo] = useState([]);
  var [total_price, set_total] = useState(0);
  const UserItem = ({ key, name, phone, credit, address, visit }) => {
    return (
      <div className="userItem" key={key}>
        <p>
          Your Name : {name}&nbsp;&nbsp;&nbsp;&nbsp; Your Phone : {phone}
        </p>
        <p>Credit : {credit}</p>
        <p>Your address : {address}</p>
        <p>your visit : {visit}</p>
      </div>
    );
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
  }) => {
    return (
      <div className="orderItem" key={key}>
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
      </div>
    );
  };
  useEffect(async () => {
    console.log("in effect");
    try {
      let obj = { uid: "", state: "before_pay" };
      const res1 = await axios.get("auth/get");
      set_userinfo(res1.data);

      const res2 = await axios.post("order/get", obj);
      set_orderinfo(res2.data);
      const res3 = await axios.post("order/get_price");
      // console.log(res3);
      // console.log(res3.data);
      // console.log(res3.data[0].tp);
      // console.log(res3.tp);
      set_total(res3.data[0].tp);
      console.log("now total is : ", total_price);
    } catch (e) {
      console.error(e.message);
    }
  }, []);

  return (
    <div>
      <div className="userinfo">
        {user_info.map((userItem) => {
          return (
            <UserItem
              key={userItem.name}
              name={userItem.name}
              phone={userItem.phone}
              credit={userItem.credit}
              address={userItem.address}
              visit={userItem.visit}
            />
          );
        })}
      </div>
      <div>
        <p>YOUR ORDER</p>
      </div>
      <div className="orderinfo">
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
            />
          );
        })}
      </div>
      총 결제 금액 : {total_price}
      <form>
        <p>
          <input type="button" value="결제하기" onClick={payhandler} />
        </p>
      </form>
    </div>
  );
};

export default Pay;
