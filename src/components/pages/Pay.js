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
  const OrderItem = ({ key, menu, style, number, changelist }) => {
    return (
      <div className="orderItem" key={key}>
        <p>
          MENU : {menu}&nbsp;&nbsp;&nbsp;&nbsp; STYLE : {style}
        </p>
        <p> NUMBERS : {number}</p>
        <p> CHANGES : {changelist}</p>
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
              changelist={orderItem.change_list}
            />
          );
        })}
      </div>
      <form>
        <p>
          <input type="button" value="결제하기" onClick={payhandler} />
        </p>
      </form>
    </div>
  );
};

export default Pay;
