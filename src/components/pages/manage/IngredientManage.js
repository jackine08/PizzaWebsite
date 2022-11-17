import React, { useState } from 'react';
import {IngredientList} from '../../../helpers/IngredientList';
import '../../../styles/Order.css';

const IngredientManage = () => {

    function get_ingredient_data(id){
        var contents;

        var obj = {INDEX:120};

        //get ingredients data through post communication
        // axios
        //   .post("/ingredients/get_data", obj)
        //   .then((res) => {
        //     contents = res.data;
        //   })
        //   .catch((e) => {
        //     console.error(e);
        //   });
        contents = IngredientList

        return contents;
    };


    function change_ingredient_count(name, count){
        //change ingredients count through post communication

        var obj = {name: name, count: count};

        // axios
        //   .post("/ingredients/change_count", obj)
        //   .then((res) => {
        //     if(res.data==true){
        //         console.log("change_count");
        //     }
        //   })
        //   .catch((e) => {
        //     console.error(e);
        //   });

        
    }

    const IngredientItem = ({key, name, count}) => {
        return (
            <div className="orderItem" key = {key}>
                <h1>{name}</h1>
                <p>{count}</p>
                <input type="text"></input>
                <input type="button" value = "confirm" onClick={()=>{change_ingredient_count(name, count);}}></input>
            </div>
        );
    };


    var [data_to_show, change_data] = useState(get_ingredient_data(132));

    return (
        <div className="order">
            <h1 className="orderTitle">Ingredient list</h1>
            <div className="orderList">
                {data_to_show.map((ingredientItem) => {
                    return (<IngredientItem
                            key={ingredientItem.name}
                            name={ingredientItem.name}
                            count={ingredientItem.count}/>
                    );
                })}
            </div>
        </div>
    );
};

export default IngredientManage;
