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
  let [user_info, set_userinfo] = useState([]);
  let [order_info, set_orderinfo] = useState([]);
  //유저 정보 불러오기
  axios.get("auth/get").then((res) => {
    if (res === "Fail") {
      alert("cannot load user info");
      navigate("/");
    } else {
      set_userinfo(res);
      console.log("set user info");
    }
  });
  console.log(user_info);
  // 고객 정보 불러오기
  let obj = { uid: "", state: "before_pay" };
  axios.post("order/get", obj).then((res) => {
    if (res === "Fail") {
      alert("cannot load  user's order info");
      navigate("/");
    } else {
      set_orderinfo(res);
      console.log("set order info");
    }
  });
  console.log(order_info);
  return (
    <div>
      <form>
        <p>
          <input type="button" value="결제하기" onClick={payhandler} />
        </p>
      </form>
    </div>
  );
};

export default Pay;
