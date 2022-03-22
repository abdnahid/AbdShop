import {applyMiddleware, createStore} from "redux";
import reducers from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";

const cartItemsInStorage = localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[];
const userInfoInStorage = localStorage.getItem('userData')?JSON.parse(localStorage.getItem('userData')):null;
const shippingAddressInStorage = localStorage.getItem('shippingAddress')?JSON.parse(localStorage.getItem('shippingAddress')):{
    name:"",
    email:"",
    phone:"",
    address:"",
    zip:"",
    country:""
};

const initialState = {
    cartList: {cartItems:cartItemsInStorage,shippingAddress:shippingAddressInStorage},
    userLogin: {userInfo:userInfoInStorage}
}
const middleware = [thunk]

const store = createStore(reducers,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;