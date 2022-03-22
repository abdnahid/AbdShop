import { combineReducers } from "redux";
import { productListReducer } from "./productListReducer";
import { cartReducer } from "./cartReducer";
import { userDetailsReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateReducer } from "./userReducers";
import { loginModalReducer } from "./loginModalReducer";
import { promoReducer } from "./promoReducer";
import { myOrdersReducer, orderCreateReducer,orderDetailsReducer, orderPayReducer } from "./orderReducers";

export default combineReducers({
    productList:productListReducer,
    cartList:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdate:userUpdateReducer,
    loginModal:loginModalReducer,
    promo:promoReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    myOrders:myOrdersReducer,
    userList:userListReducer
})