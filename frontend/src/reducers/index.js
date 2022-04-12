import { combineReducers } from "redux";
import { productCreateReducer, productDeleteReducer, productListReducer, productUpdateReducer, reviewCreateReducer } from "./productListReducer";
import { cartReducer } from "./cartReducer";
import { userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateReducer } from "./userReducers";
import { loginModalReducer } from "./loginModalReducer";
import { promoReducer } from "./promoReducer";
import { adminOrdersReducer, myOrdersReducer, orderCreateReducer,orderDetailsReducer, orderPayReducer } from "./orderReducers";

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
    adminOrders:adminOrdersReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    productDelete:productDeleteReducer,
    productUpdate:productUpdateReducer,
    productCreate:productCreateReducer,
    reviewCreate:reviewCreateReducer
})