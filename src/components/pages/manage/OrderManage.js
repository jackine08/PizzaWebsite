import React from 'react';
import {OrderList} from '../../../helpers/OrderList';
import '../../../styles/Order.css';

const OrderManage = () => {

    function get_order_data(id){
        var a = OrderList;
        return a;
    };

    const changeState_before = (key)=>{

    };

    const changeState_after = (key)=>{

    };

    const changeState_done = (key) =>{

    };

    const OrderItem = ({key, menu, state, id}) => {
        return (
            <div className="orderItem" key = {key}>
                <h1>{id}</h1>
                <p>{menu}</p>
                <p>{state}</p>
                <input type="button" value = "state_before" onClick={changeState_before}></input>
                <input type="button" value = "state_after" onClick={changeState_after}></input>
                <input type="button" value = "state_done" onClick={changeState_done}></input>
            </div>
        );
    };


    var order_data = get_order_data(998);

    return (
        <div className="order">
            <h1 className="orderTitle">Order list</h1>
            <div className="orderList">
                {order_data.map((orderItem) => {
                    return (<OrderItem
                            key={orderItem.order_id}
                            menu={orderItem.menu}
                            state={orderItem.state}
                            id = {orderItem.order_id}/>
                    );
                })}
            </div>
        </div>
    );
};

export default OrderManage;
