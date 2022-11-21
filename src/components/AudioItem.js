import React, { useState } from "react";
import { useRef } from "react";
import RadioGroup from "../helpers/RadioGroup";
import Radio from "../helpers/Radio";
import Counter from "../helpers/Counter";
import axios from "axios";
import { useSpeechRecognition } from 'react-speech-kit';

function VC(props) {
  const [VC_value, setValue] = useState('');
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      // 음성인식 결과가 value 상태값으로 할당됩니다.
      setValue(result);
    },
  });

  const submit = ()=>{
      props.propFunction(VC_value, props.name);
  }
  return (
    <p>
      <p>{props.name}: {VC_value}</p>
      <button onMouseDown={listen} onMouseUp={stop}>
        🎤      {listening && <p>음성인식 활성화 중 </p>}
      </button>
      <button onClick={submit}>확인</button>
    </p>
  );
}

const AudioItem = () => {
  var change = '';
  // const style = useRef();
  var num = '1';
  var wine_num = '';
  var menu = '';
  var style = '';

  function get_value(text, name){

    if(name=='menu'){
        menu=text;
    }else if(name=='style'){
        style=text;
    }else if(name=='change'){
        change=text;
    }else if(name=='num'){
        num=text;
    }

    console.log('allocation done');

  }

  function incart() {
    var obj = {
      change: change,
      style: style,
      menu: menu,
      num: num
    };

    console.log(obj);
    axios
      .post("order/set", obj)
      .then((res) => {
        if (res.data.status == "Success") {
          console.log("menu in cart Success");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }

  return (
    <div className="menuItem">
        <p> <h1>{menu}</h1>
            <VC propFunction={get_value} name='menu'/>
            <VC propFunction={get_value} name='style'/>
            <VC propFunction={get_value} name='change'/>
            <VC propFunction={get_value} name='num'/>
        </p>

        <input type="button" value="장바구니 담기" onClick={incart}></input>
    </div>
  );
};

export default AudioItem;
