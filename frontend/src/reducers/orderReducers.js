import { ORDER_REQUEST,ORDER_SUCCESS,ORDER_ERROR } from "../actions/types";


export const orderReducer = (state={},action)=>{
    switch (action.type) {
        case ORDER_REQUEST :
            return {loading:true}
        case ORDER_SUCCESS:
            return {order:action.payload,success:true,loading:false}
        case ORDER_ERROR:
            return {error:action.payload,loading:false}
        default:
            return state
    }
}