import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import {OrderList} from '../../../helpers/OrderList';
import '../../../styles/Order.css';

const OrderManage = () => {

    var order_data = [];
    var order_data_done = [];

    const [data_to_show, set_data] = useState(get_order_data(0));
    var data_state = 0;

    function get_order_data(id){
        //get order using post communication
        var contents = OrderList;

        //parsing
        for(var i=0; i<contents.length; i++){
            if(contents[i].state == "Done"){
                order_data_done.push(contents[i]);
            }else{
                order_data.push(contents[i]);
            }
        }
        return order_data;

    };

    function changeState(orderNum, state){
        console.log(state);
        console.log(orderNum);
        var obj = {orderNum : orderNum, state : state, INDEX: 5};

        // axios
        //   .post("/state/changestate", obj)
        //   .then((res) => {
        //     if(res.data == true){
        //         console.log("change Done")
        //     }
        //   })
        //   .catch((e) => {
        //     console.error(e);
        //   });


    };


    const OrderItem = ({key, menu, state, id}) => {
        return (
            <div className="orderItem" key = {key}>
                <h1>{id}</h1>
                <p>{menu}</p>
                <p>{state}</p>
                <input type="button" value = "state_before" onClick={()=>{changeState(id,"before");}}></input>
                <input type="button" value = "state_after" onClick={()=>{changeState(id,"after");}}></input>
                <input type="button" value = "state_done" onClick={()=>{changeState(id,"done");}}></input>
            </div>
        );
    };


    function change_data_to_show(state){

        if(state == 1){
            set_data(order_data_done);
        }else{
            set_data(order_data)
        }
    }


    const element = (
        <div className="order">
            <h1 className="orderTitle">Order list</h1>
            <input type="button" value = "InProgress" onClick={()=>change_data_to_show(0)}/>
            <input type="button" value = "Done" onClick={()=>change_data_to_show(1)}/>
            <div className="orderList">
                {data_to_show.map((orderItem) => {
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

    return (element);
};

export default OrderManage;
