import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import {DeliveryList} from '../../../helpers/DeliveryList';
import '../../../styles/Delivery.css';

const DeliveryManage = () => {

    var contents

    const [data_to_show, set_data] = useState(get_delivery_data(0));
    var data_state = 0;

    function get_delivery_data(id){
        //get delivery using post communication
        var obj = {id : "Manager"};
        // axios
        //   .post("order/get", obj)
        //   .then((res) => {
        //     contents = res.data;
        //   })
        //   .catch((e) => {
        //     console.error(e);
        //   });
        contents = DeliveryList;

        //parsing
        return contents;

    };

    function changeState(deliveryNum, state){
        console.log(state);
        console.log(deliveryNum);
        var obj = {order_id : deliveryNum, state : state};

        // axios
        //   .post("order/modify", obj)
        //   .then((res) => {
        //     if(res.status == "Success"){
        //         console.log("change Done")
        //     }
        //   })
        //   .catch((e) => {
        //     console.error(e);
        //   });

        get_delivery_data(123);
        set_data(contents);
    };


    const DeliveryItem = ({key, deliveryman, order_num, state}) => {
        return (
            <div className="deliveryItem">
                <h1>{deliveryman}</h1>
                <p>{order_num}</p>
                <p>{state}</p>
                <input type="button" value = "state_before" onClick={()=>{changeState(order_num,"before");}}></input>
                <input type="button" value = "state_on_going" onClick={()=>{changeState(order_num,"on going");}}></input>
                <input type="button" value = "state_done" onClick={()=>{changeState(order_num,"done");}}></input>
            </div>
        );
    };




    const element = (
        <div className="delivery">
            <h1 className="deliveryTitle">Delivery list</h1>
            <div className="deliveryList">
                {data_to_show.map((deliveryItem) => {
                    return (<DeliveryItem
                            key={deliveryItem.delivery_man}
                            deliveryman={deliveryItem.deliveryman}
                            order_num={deliveryItem.order_num}
                            state={deliveryItem.state} />
                    );
                })}
            </div>
        </div>
    );

    return (element);
};

export default DeliveryManage;
