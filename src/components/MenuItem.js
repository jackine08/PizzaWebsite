import React from 'react';
import RadioGroup from "../helpers/RadioGroup";
import Radio from "../helpers/Radio";
import Counter from "../helpers/Counter";
const MenuItem = ({image, name, price}) => {
    function order(){


    };

    function incart(){


  }
    return (
        <div className="menuItem">
            <div style={{backgroundImage: `url(${image})`}}></div>
            <h1>{name}</h1>
            <p>${price}</p>
            <RadioGroup>
        <Radio name="contact" value="EMAIL">
          심플
        </Radio>
        <Radio name="contact" value="PHONE">
          그랜드
        </Radio>
        <Radio name="contact" value="FAX">
          디럭스
        </Radio>

      </RadioGroup>
        <p>요청사항
        <input type="text"></input>
        </p>
        수량
        <Counter />
        샴페인?
        <Counter />
        <input type="button" value="주문하기" onClick={order}></input>
        <input type="button" value="장바구니 담기" onClick={incart}></input>
        </div>
    );
};

export default MenuItem;
