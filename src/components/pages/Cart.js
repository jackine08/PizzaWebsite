import React from 'react';
import {CartList} from '../../helpers/CartList';
import Counter from '../../helpers/Counter';
import '../../styles/Cart.css';


const Cart = () => {
    function get_cart_data(id){
        var a = CartList;
        return a;
    };
    function pay(){
        
    }


    const CartItem = ({key, menu, style, price}) => {
        return (
            <div className="cartItem" key = {key}>
                <p>
                    {menu}&nbsp;&nbsp;&nbsp;&nbsp;
                    {style}
                    <Counter/>
                </p>
                <p>
                {price}
                </p>
                

            </div>
        );
    };


    var cart_data = get_cart_data(998);

    return (
        <div className="cart">
            <h1 className="cartTitle">Cart</h1>
            <div className="cartList">
                {cart_data.map((cartItem) => {
                    return (<CartItem
                            key={cartItem.menu}
                            menu={cartItem.menu}
                            style={cartItem.style}
                            price = {cartItem.price}/>
                    );
                })}
            </div>
            <div>
            <input type="button" value="결제하기" onClick={pay}></input>
            </div>
        </div>
    );
};

export default Cart;