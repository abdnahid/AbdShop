import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING,CART_RESET } from "../actions/types";



export const cartReducer=(state={},action)=>{
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const existItem = state.cartItems.find((x)=>(x.productId===item.productId))
            if (existItem) {
                return {...state,cartItems:state.cartItems.map((x)=>(x.productId===existItem.productId?item:x))}
            }else{
                return {...state,cartItems:[...state.cartItems,item]}
            }
        case REMOVE_FROM_CART:
            return {...state,cartItems:state.cartItems.filter((item)=>item.productId !== action.payload)}
        case SAVE_SHIPPING:
            return {...state,shippingAddress:action.payload}
        case CART_RESET:
            return {...state,cartItems:[]}
        default:
            return state
    }
}