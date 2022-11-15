import React from 'react';
import RadioGroup from "../helpers/RadioGroup";
import Radio from "../helpers/Radio";
const MenuItem = ({image, name, price}) => {
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
        </div>
    );
};

export default MenuItem;
