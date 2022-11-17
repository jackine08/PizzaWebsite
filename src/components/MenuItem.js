import React, {useState} from 'react';
import {useRef} from 'react'
import RadioGroup from "../helpers/RadioGroup";
import Radio from "../helpers/Radio";
import Counter from "../helpers/Counter";
const MenuItem = ({image, name, price}) => {


    const demand = useRef();
    // const style = useRef();
    const menu_num = useRef();
    const wine_num = useRef();

    function incart(){
        var obj = {demand: demand.current.value, style: {style}, menu_num:menu_num.current.value, wine_num: wine_num.current.value};

        console.log(obj);
        //axios.post("order/set")

    };

    const [style, setStyle] = useState("simple");

    return (
        <div className="menuItem">
            <div style={{backgroundImage: `url(${image})`}}></div>
            <h1>{name}</h1>
            <p>${price}</p>

                {name != "샴페인 축제 디너" &&
                <p><input type='radio' name="style" value='simple' onClick={()=>{setStyle("simple")}}/>심플</p>
                }
                <input type='radio' name="style" value='grand' onClick={()=>{setStyle("grand")}}/>그랜드
                <input type='radio' name="style" value='deluxe' onClick={()=>{setStyle("deluxe")}}/>디럭스

            <p>요청사항
            <input type="text" ref={demand}></input>
            </p>
            <p>
            수량
            <input type="text" ref={menu_num} />
            </p>
            <p>
            와인
            <input type="text" ref={wine_num}/>
            </p>
            <input type="button" value="장바구니 담기" onClick={incart}></input>
        </div>
    );
};

export default MenuItem;
