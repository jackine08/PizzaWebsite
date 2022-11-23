import axios from "axios";
import React, { useState, useEffect } from "react";
import Counter from "../../helpers/Counter";
import "../../styles/Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  // function get_cart_data() {
  //   var obj = {
  //     uid: "",
  //     state: "Cart",
  //   };
  //   var contents = [];
  //   axios.post("order/get", obj).then((res) => {
  //     console.log("order get Success");
  //     console.log(res.data);
  //     set_data(res.data);
  //     console.log(data_to_show);
  //   });

  //   return contents;
  // }

  var [data_to_show, set_data] = useState([]);
  var [rend, set_rend] = useState(0);
  const fetch_data = async () => {
    try {
      var obj = { uid: "", state: "Cart" };
      const res = await axios.post("order/get", obj);
      // 받아온 데이터를 useState 를 이용하여 선언한다.
      console.log(res.data);
      set_data(res.data);
    } catch (e) {
      console.error(e.message);
    }
  };
  useEffect(() => {
    fetch_data();
  }, []);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [bChecked, setChecked] = useState(false);

  function delete_cart(order_id) {
    let obj = { order_id: order_id };
    axios.post("order/delete", obj).then((res) => {
      if (res.data === "Fail") {
        alert("삭제 실패");
      } else {
        alert("삭제 성공");
        fetch_data();
      }
    });
  }
  const checkedItemHandler = (id, isChecked) => {
    if (isChecked) {
      checkedItems.add(id);
      setCheckedItems(checkedItems);
    } else if (!isChecked && checkedItems.has(id)) {
      checkedItems.delete(id);
      setCheckedItems(checkedItems);
    }
    console.log("checked list : ", checkedItems);
  };
  const checkHandler = ({ target }) => {
    setChecked(!bChecked);
    console.log("Target : ", target);
    checkedItemHandler(target.value, target.checked);
  };
  function pay() {
    //cart에서 결제할 항목 선택 후 거기서 선택된 애들만 결제해야 함..
    console.log("checked list : ", checkedItems);
    var myArr = Array.from(checkedItems);
    var obj = { order_id: myArr, state: "before_pay" };
    console.log("order_id is:", obj.order_id);
    axios
      .post("order/modify", obj)
      .then((res) => {
        console.log("res :", res);
        if (res.data.status == "Success") {
          console.log("change Done");
          navigate("/Pay");
        } else console.log("change Fail");
      })
      .catch((e) => {
        console.error(e);
      });

    return 0;
  }
  const CartItem = ({
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
          <input
            type="checkbox"
            id={order_id}
            value={order_id}
            checked={bChecked}
            onChange={(e) => checkHandler(e)}
          />
          <label htmlFor={order_id + 1} />
        </p>
        <p>
          메뉴 : {menu}&nbsp;&nbsp;&nbsp;&nbsp; 스타일 : {style}
        </p>
        <p> 주문 수량 : {number}</p>
        <p> 추가 주문 사항 </p>
        <p>
          {steak > 0 && <p> Steak : {steak}</p>}{" "}
          {wine > 0 && <p> Liquor : {wine} </p>}
          {salad > 0 && <p> Salad : {salad}</p>}
          {egg > 0 && <p>Egg : {egg}</p>} {bacon > 0 && <p>Bacon : {bacon}</p>}{" "}
          {bread > 0 && <p>Bread : {bread}</p>}{" "}
        </p>
        <p>Price : {price}</p>
        <p>Delivery_Date : {delivery_date}</p>
        <p>Delivery_Time : {delivery_time}</p>
        <input
          type="button"
          value="삭제하기"
          onClick={() => {
            delete_cart(order_id);
          }}></input>
      </div>
    );
  };

  return (
    <div className="cart">
      <h1 className="cartTitle">Cart</h1>
      <div className="cartList">
        {data_to_show.map((cartItem) => {
          return (
            <CartItem
              key={cartItem.menu}
              menu={cartItem.menu}
              style={cartItem.style}
              number={cartItem.numbers}
              steak={cartItem.steak_num}
              salad={cartItem.salad_num}
              egg={cartItem.egg_num}
              bacon={cartItem.bacon_num}
              bread={cartItem.bread_num}
              wine={cartItem.wine_num}
              price={cartItem.total_price}
              order_id={cartItem.order_id}
              delivery_date={cartItem.delivery_date}
              delivery_time={cartItem.delivery_time}
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
