import React from 'react';
import {IngredientList} from '../../../helpers/IngredientList';
import '../../../styles/Order.css';

const IngredientManage = () => {

    function get_ingredient_data(id){

        return IngredientList;
    };

    function change_ingredient_count(id){


    }

    const IngredientItem = ({key, name, count}) => {
        return (
            <div className="orderItem" key = {key}>
                <h1>{name}</h1>
                <p>{count}</p>
                <input type="text"></input>
                <input type="button" value = "confirm" onClick={change_ingredient_count}></input>
            </div>
        );
    };


    var ingredient_data = get_ingredient_data(998);

    return (
        <div className="order">
            <h1 className="orderTitle">Ingredient list</h1>
            <div className="orderList">
                {ingredient_data.map((ingredientItem) => {
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
