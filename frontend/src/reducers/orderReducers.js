import { 
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_ERROR, 
    ORDER_DETAILS_REQUEST, 
    ORDER_DETAILS_SUCCESS, 
    ORDER_DETAILS_ERROR, 
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_ERROR,
    ORDER_PAY_RESET,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_ERROR,
    ALL_ORDERS_RESET
} from "../actions/types";


export const orderCreateReducer = (state={},action)=>{
    switch (action.type) {
        case ORDER_CREATE_REQUEST :
            return {loading:true}
        case ORDER_CREATE_SUCCESS:
            return {order:action.payload,success:true,loading:false}
        case ORDER_CREATE_ERROR:
            return {error:action.payload,loading:false}
        default:
            return state
    }
}
export const orderDetailsReducer = (state={loading:true,orderList:[],error:null},action)=>{
    switch (action.type) {
        case ORDER_DETAILS_REQUEST :
            return {...state,loading:true}
        case ORDER_DETAILS_SUCCESS:
            return {...state,orderList:action.payload,loading:false}
        case ORDER_DETAILS_ERROR:
            return {...state,error:action.payload,loading:false}
        default:
            return state
    }
}
export const myOrdersReducer = (state={loading:true,myOrders:[],error:null},action)=>{
    switch (action.type) {
        case ALL_ORDERS_REQUEST :
            return {...state,loading:true}
        case ALL_ORDERS_SUCCESS:
            return {...state,myOrders:action.payload,loading:false}
        case ALL_ORDERS_ERROR:
            return {...state,error:action.payload,loading:false}
        case ALL_ORDERS_RESET:
            return {loading:true,myOrders:[],error:null}
        default:
            return state
    }
}
export const orderPayReducer = (state={},action)=>{
    switch (action.type) {
        case ORDER_PAY_REQUEST :
            return {loading:true}
        case ORDER_PAY_SUCCESS:
            return {success:true,loading:false}
        case ORDER_PAY_RESET:
            return {}
        case ORDER_PAY_ERROR:
            return {error:action.payload,loading:false}
        default:
            return state
    }
}