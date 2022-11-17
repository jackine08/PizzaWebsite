import React, { useState } from 'react';
import {MenuList} from '../../helpers/MenuList';
import '../../styles/Menu.css';
import MenuItem from "../MenuItem";

const Menu = () => {

    var cart = [{}];

    function menu_choice(name, style, count){


    };

    function payment(){


    };

    function get_menu_list(){

        
        // DB 통신해서 남은 수량이 있는것만 리스트에 담아서 리턴
        return MenuList
    };

    var temp = get_menu_list();

    return (
        <div className="menu">
            <h1 className="menuTitle">Our Menu</h1>
            <div className="menuList">
                {temp.map((menuItem, key) => {
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
