import { ADD_PROMO,GET_PROMO,PROMO_ERROR } from "../actions/types";


export const promoReducer = (state={},action)=>{
    switch (action.type) {
        case ADD_PROMO :
            return {...state,message:action.payload}
        case GET_PROMO:
            const {code,type,value}=action.payload
            return {...state,code,type,value}
        case PROMO_ERROR:
            return {...state,error:action.payload}
        default:
            return state
    }
}