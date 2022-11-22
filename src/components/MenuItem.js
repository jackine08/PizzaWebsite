import React, { useState, useEffect } from "react";
import { useRef } from "react";
import RadioGroup from "../helpers/RadioGroup";
import Radio from "../helpers/Radio";
import Counter from "../helpers/Counter";
import axios from "axios";
const MenuItem = ({ image, name, price, script }) => {
  // const style = useRef();
  const count = useRef();
  const wine_num = useRef();
  const steak_num = useRef();
  const salad_num = useRef();
  const egg_num = useRef();
  const bacon_num = useRef();
  const bread_num = useRef();
  var [total_price, set_price] = useState();
  var [min_num, set_min] = useState(1);
  var [max_num, set_max] = useState();
  function incart() {
    var obj;
    if (name === "발렌타인 디너") {
      obj = {
        style: { style }.style,
        menu: name,
        num: Math.max(count.current.value, 1),
        total_price: total_price,
        steak_num: Math.max(steak_num.current.value, 0),
      };
    } else if (name === "프렌치 디너") {
      obj = {
        style: { style }.style,
        menu: name,
        num: Math.max(count.current.value, 1),
        total_price: total_price,
        steak_num: Math.max(steak_num.current.value, 0),
        salad_num: Math.max(salad_num.current.value, 0),
      };
    } else if (name === "잉글리시 디너") {
      obj = {
        style: { style }.style,
        menu: name,
        num: Math.max(count.current.value, 1),
        total_price: total_price,
        steak_num: Math.max(steak_num.current.value, 0),
        egg_num: Math.max(egg_num.current.value, 0),
        bacon_num: Math.max(bacon_num.current.value, 0),
        bread_num: Math.max(bread_num.current.value, 0),
      };
    } else {
      obj = {
        style: { style }.style,
        menu: name,
        num: Math.max(count.current.value, 2),
        total_price: total_price,
        steak_num: Math.max(steak_num.current.value, 0),
        bread_num: Math.max(bread_num.current.value, 0),
      };
    }

    console.log(obj);
    axios
      .post("order/set", obj)
      .then((res) => {
        if (res.data.status == "Success") {
          console.log("menu in cart Success");
          alert("메뉴가 장바구니에 추가되었습니다.");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }

  //var [stock, set_stock] = useState([]);
  useEffect(async () => {
    try {
      const res = await axios.post("stock/get");
      // 받아온 데이터를 useState 를 이용하여 선언한다.

      console.log("stock info : ", res.data[0]);
      console.log(res.data[0].steak);
      if (name === "샴페인 축제 디너") {
        set_min(2);
        set_price(price * 2);
      } else {
        set_min(1);
        set_price(price);
      }
      if (name === "발렌타인 디너") {
        set_max(res.data[0].steak);
      } else if (name === "프렌치 디너") {
        set_max(Math.min(res.data[0].steak, res.data[0].salad));
      } else if (name === "잉글리시 디너") {
        let t1 = Math.min(res.data[0].steak, res.data[0].bread);
        let t2 = Math.min(res.data[0].bacon, res.data[0].egg);
        set_max(Math.min(t1, t2));
      } else {
        set_max(Math.min(res.data[0].steak, res.data[0].bread));
      }
      console.log("max is : ", max_num);
    } catch (e) {
      console.error(e.message);
    }
  }, []);
  const [style, setStyle] = useState("simple");

  function pricechange() {
    //console.log("now count is :", count.current.value);
    let now_price = price * count.current.value;
    //등급별 추가 지불 금액
    let grade_price;
    console.log("now style : ", style);
    if (style === "simple") grade_price = 3000;
    else if (style === "grand") grade_price = 5000;
    else grade_price = 10000;
    now_price += grade_price;
    //스테이크,와인 추가 지불
    now_price += Math.max(steak_num.current.value, 0) * 5000;
    if (name !== "잉글리시 디너") {
      now_price += Math.max(wine_num.current.value, 0) * 3000;
    }
    if (name === "잉글리시 디너") {
      now_price += Math.max(egg_num.current.value, 0) * 500;
      now_price += Math.max(bacon_num.current.value, 0) * 500;
      now_price += Math.max(bread_num.current.value, 0) * 300;
    } else if (name === "프렌치 디너") {
      now_price += Math.max(salad_num.current.value, 0) * 1000;
    } else if (name === "샴페인 축제 디너") {
      //now_price -= 5000; //steak..
      now_price += Math.max(bread_num.current.value, 0) * 600;
    }

    set_price(now_price);
  }
  return (
    <div className="menuItem">
      <div style={{ backgroundImage: `url(${image})` }}></div>
      <h1>{name}</h1>
      <p>₩{price}</p>
      <p>{script}</p>
      <p> Style List </p>
      {name != "샴페인 축제 디너" && (
        <p>
          <input
            type="radio"
            name="style"
            value="simple"
            onClick={() => {
              setStyle("simple");
              pricechange();
            }}
          />
          심플: 상자 접시, 냅킨, 플라스틱 쟁반, 플리스틱 잔 ₩3000
        </p>
      )}
      <p>
        <input
          type="radio"
          name="style"
          value="grand"
          onClick={() => {
            setStyle("grand");
            pricechange();
          }}
        />
        그랜드: 도자기 접시,컵 흰색 면 냅킨, 나무 쟁반 ₩5000
      </p>
      <p>
        <input
          type="radio"
          name="style"
          value="deluxe"
          onClick={() => {
            setStyle("deluxe");
            pricechange();
          }}
        />
        디럭스: 은 쟁반, 작은 꽃병, 도자기 접시, 린넨 냅킨 ₩10000
      </p>
      <p>
        수량
        <input
          type="number"
          ref={count}
          min={min_num}
          max={max_num}
          placeholder={min_num}
          onChange={pricechange}
        />
      </p>
      <p>추가 주문 사항</p>
      <p>
        스테이크(₩5000)
        <input
          type="number"
          ref={steak_num}
          min="0"
          placeholder="0"
          onChange={pricechange}
        />
      </p>
      {name != "잉글리시 디너" && (
        <p>
          와인(₩3000)
          <input
            type="number"
            ref={wine_num}
            min="0"
            placeholder="0"
            onChange={pricechange}
          />
        </p>
      )}
      {name === "프렌치 디너" && (
        <p>
          샐러드(₩1000)
          <input
            type="number"
            ref={salad_num}
            min="0"
            placeholder="0"
            onChange={pricechange}
          />
        </p>
      )}
      {name === "잉글리시 디너" && (
        <p>
          <p>
            계란(₩500)
            <input
              type="number"
              ref={egg_num}
              min="0"
              placeholder="0"
              onChange={pricechange}
            />
          </p>
          <p>
            베이컨(₩500)
            <input
              type="number"
              ref={bacon_num}
              min="0"
              placeholder="0"
              onChange={pricechange}
            />
          </p>
          <p>
            빵(₩300)
            <input
              type="number"
              ref={bread_num}
              min="0"
              placeholder="0"
              onChange={pricechange}
            />
          </p>
        </p>
      )}
      {name === "샴페인 축제 디너" && (
        <p>
          빵(₩600, 4piece)
          <input
            type="number"
            ref={bread_num}
            min="0"
            placeholder="0"
            onChange={pricechange}
          />
        </p>
      )}
      <p> Total : ₩{total_price}</p>
      <input type="button" value="장바구니 담기" onClick={incart}></input>
    </div>
  );
};

export default MenuItem;
