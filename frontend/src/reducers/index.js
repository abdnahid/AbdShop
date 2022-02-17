import { combineReducers } from "redux";
import { productListReducer } from "./productListReducer";
import { cartReducer } from "./cartReducer";
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateReducer } from "./userReducers";
import { loginModalReducer } from "./loginModalReducer";
import { promoReducer } from "./promoReducer";
import { orderReducer } from "./orderReducers";

export default combineReducers({
    productList:productListReducer,
    cartList:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdate:userUpdateReducer,
    loginModal:loginModalReducer,
    promo:promoReducer,
    order:orderReducer
})