import axios from "axios"
import { ADD_TO_CART, REMOVE_FROM_CART,SAVE_SHIPPING } from "./types";

export const addToCart=(id,qty)=>async(dispatch,getState)=>{
    const {data} = await axios.get(`/api/products/${id}`)
    const {_id,name,image,price,countInStock}=data;
    dispatch({
        type:ADD_TO_CART,
        payload:{
            productId:_id,
            qty,
            name,
            image,
            price,
            countInStock
        }
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cartList.cartItems));
}

export const removeFromCart =(id)=>(dispatch,getState)=>{
    dispatch({type:REMOVE_FROM_CART,payload:id});
    localStorage.setItem('cartItems',JSON.stringify(getState().cartList.cartItems));
}
export const saveShipping =(data)=>(dispatch)=>{
    dispatch({type:SAVE_SHIPPING,payload:data});
    localStorage.setItem('shippingAddress',JSON.stringify(data));
}
