// export const CartList = [
//     {
//         menu: "잉글리시 디너",
//         style: "심플",
//         price: "20000",
//     },
//     {
//
//         menu: "프렌치 디너",
//         style: "그랜드",
//         price: "30000",
//     },
// ]
import axios from "axios";

export const CartList = ()=>{
    var qq = [];
        var obj = {
          uid: "",
          state: "Cart"
        };

    axios.post("order/get", obj).then((res) => {
      console.log("order get Success");
      console.log(res.data);
      qq = res.data;
    });

    return qq;
}
