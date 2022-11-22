import React, { useState } from "react";
import { MenuList } from "../../helpers/MenuList";
import "../../styles/Menu.css";
import MenuItem from "../MenuItem";
import AudioItem from "../AudioItem";
const Menu = () => {
  function get_menu_list() {
    var contents = [];
    // axios
    //   .post("stock/get", obj)
    //   .then((res) => {
    //     contents = res.data;
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });

    //parsing
    var qwe = MenuList;
    for (var i = 0; i < qwe.length; i++) {
      if (qwe[i].available == 1) {
        contents.push(qwe[i]);
      }
    }

    // DB 통신해서 남은 수량이 있는것만 리스트에 담아서 리턴
    return contents;
  }

  var temp = get_menu_list();

  return (
    <div className="menu">
      <h1 className="menuTitle">Our Menu</h1>
      <p>
        <AudioItem />
      </p>
      <div className="menuList">
        {temp.map((menuItem, key) => {
          return (
            <MenuItem
              key={menuItem.id}
              image={menuItem.image}
              name={menuItem.name}
              price={menuItem.price}
              script={menuItem.script}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
