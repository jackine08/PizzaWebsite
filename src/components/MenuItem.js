import React, { useState } from "react";
import { useRef } from "react";
import RadioGroup from "../helpers/RadioGroup";
import Radio from "../helpers/Radio";
import Counter from "../helpers/Counter";
import axios from "axios";
const MenuItem = ({ image, name, price }) => {
  const demand = useRef();
  // const style = useRef();
  const count = useRef();
  const wine_num = useRef();

  function incart() {
    var obj = {
      change: demand.current.value,
      style: { style }.style,
      menu: name,
      num: count.current.value,
    };

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

  const [style, setStyle] = useState("simple");

  return (
    <div className="menuItem">
      <div style={{ backgroundImage: `url(${image})` }}></div>
      <h1>{name}</h1>
      <p>${price}</p>
      {name != "샴페인 축제 디너" && (
        <p>
          <input
            type="radio"
            name="style"
            value="simple"
            onClick={() => {
              setStyle("simple");
            }}
          />
          심플
        </p>
      )}
      <input
        type="radio"
        name="style"
        value="grand"
        onClick={() => {
          setStyle("grand");
        }}
      />
      그랜드
      <input
        type="radio"
        name="style"
        value="deluxe"
        onClick={() => {
          setStyle("deluxe");
        }}
      />
      디럭스
      <p>
        요청사항
        <input type="text" ref={demand}></input>
      </p>
      <p>
        수량
        <input type="text" ref={count} />
      </p>
      <p>
        와인
        <input type="text" ref={wine_num} />
      </p>
      <input type="button" value="장바구니 담기" onClick={incart}></input>
    </div>
  );
};

export default MenuItem;
