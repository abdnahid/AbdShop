import { FETCH_PRODUCTS , FETCH_PRODUCT, FETCH_ERROR, PRODUCT_REQUEST } from "../actions/types";

const initialState={
    products:[],
    loading:false,
    currentProduct:{},
    error:null
}

export const productListReducer = (state=initialState,action)=>{
    switch (action.type) {
        case PRODUCT_REQUEST :
            return {...state,loading:true}
        case FETCH_PRODUCTS:
            return {...state,products:action.payload,loading:false,currentProduct:{},error:null}
        case FETCH_ERROR:
            return {...state,error:action.payload,loading:false}
        case FETCH_PRODUCT:
            return {...state,currentProduct:action.payload,loading:false}
        default:
            return state
    }
}