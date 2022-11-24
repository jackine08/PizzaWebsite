import React, { useState, useEffect } from "react";
import { useRef } from "react";
import axios from "axios";
import "../../../styles/Order.css";

const IngredientManage = () => {
  var refList = [useRef(), useRef(), useRef(), useRef(), useRef()];
  var [turn, setturn] = useState(0);
  const fetch_data = async () => {
    console.log("start fetch_data");
    var obj = { uid: "manager" };
    var __temp = [];
    const res = await axios
      .post("stock/get", obj)
      .then((res) => {
        console.log(res.data[0]);
        set_data(res.data[0]);
      })
      .catch((e) => {
        console.error(e);
      });
    setturn(turn + 1);
    console.log("end fetch_data");
  };

  function change_ingredient_count(name, count) {
    //change ingredients count through post communication
    var obj = {
      steak: parseInt(refList[0].current.value),
      salad: parseInt(refList[1].current.value),
      egg: parseInt(refList[2].current.value),
      bacon: parseInt(refList[3].current.value),
      bread: parseInt(refList[4].current.value),
    };
    console.log(obj);
    console.log("send data to server");
    axios
      .post("stock/set", obj)
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

  const IngredientItem = ({ value, name, count }) => {
    console.log(value);
    return (
      <div className="orderItem">
        <h1>{name}</h1>
        <p>{count}</p>
        <input type="text" id={name} ref={refList[value]}></input>
      </div>
    );
  };

  var [data_to_show, set_data] = useState([]);

  useEffect(() => {
    fetch_data();
  }, []);

  return (
    <div className="order">
      <h1 className="orderTitle">Ingredient list</h1>
      <div className="orderList">
        <IngredientItem value="0" name="steak" count={data_to_show.steak} />
        <IngredientItem value="1" name="salad" count={data_to_show.salad} />
        <IngredientItem value="2" name="egg" count={data_to_show.egg} />
        <IngredientItem value="3" name="bacon" count={data_to_show.bacon} />
        <IngredientItem value="4" name="bread" count={data_to_show.bread} />
      </div>
      <button onClick={change_ingredient_count}>
        {" "}
        change Ingreditne Count{" "}
      </button>
    </div>
  );
};

export default IngredientManage;
