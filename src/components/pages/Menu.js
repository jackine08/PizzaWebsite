import React from 'react';
import {MenuList} from '../../helpers/MenuList';
import '../../styles/Menu.css';
import MenuItem from "../MenuItem";

const Menu = () => {
    return (
        <div className="menu">
            <h1 className="menuTitle">Our Menu</h1>
            <div className="menuList">
                {MenuList.map((menuItem, key) => {
                    return (<MenuItem
                            key={menuItem.id}
                            image={menuItem.image}
                            name={menuItem.name}
                            price={menuItem.price}/>
                            
                    );
                })}
            </div>
        </div>
    );
};

export default Menu;
