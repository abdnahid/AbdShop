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
    USER_ALL_ORDERS_SUCCESS,
    USER_ALL_ORDERS_REQUEST,
    USER_ALL_ORDERS_ERROR,
    USER_ALL_ORDERS_RESET,
    ADMIN_ALL_ORDERS_SUCCESS,
    ADMIN_ALL_ORDERS_REQUEST,
    ADMIN_ALL_ORDERS_ERROR,
    ADMIN_ALL_ORDERS_RESET
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
        case USER_ALL_ORDERS_REQUEST :
            return {...state,loading:true}
        case USER_ALL_ORDERS_SUCCESS:
            return {...state,myOrders:action.payload,loading:false}
        case USER_ALL_ORDERS_ERROR:
            return {...state,error:action.payload,loading:false}
        case USER_ALL_ORDERS_RESET:
            return {loading:true,myOrders:[],error:null}
        default:
            return state
    }
}
export const adminOrdersReducer = (state={loading:true,adminOrders:[],error:null},action)=>{
    switch (action.type) {
        case ADMIN_ALL_ORDERS_REQUEST :
            return {...state,loading:true}
        case ADMIN_ALL_ORDERS_SUCCESS:
            return {...state,adminOrders:action.payload,loading:false}
        case ADMIN_ALL_ORDERS_ERROR:
            return {...state,error:action.payload,loading:false}
        case ADMIN_ALL_ORDERS_RESET:
            return {loading:true,adminOrders:[],error:null}
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