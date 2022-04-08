import { 
    FETCH_PRODUCTS , 
    FETCH_PRODUCT, 
    FETCH_ERROR, 
    PRODUCT_REQUEST, 
    PRODUCT_DELETE_REQUEST, 
    PRODUCT_DELETE_SUCCESS, 
    PRODUCT_DELETE_ERROR,
    PRODUCT_DELETE_RESET,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_ERROR,
    PRODUCT_CREATE_RESET, 
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_ERROR,
    PRODUCT_UPDATE_RESET
} from "../actions/types";

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

export const productDeleteReducer=(state={},action)=>{
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return {loading:true}
        case PRODUCT_DELETE_SUCCESS:
            return {message:action.payload,loading:false}
        case PRODUCT_DELETE_ERROR:
            return {error:action.payload,loading:false}
        case PRODUCT_DELETE_RESET:
            return {}
        default:
            return state
    }
}

export const productCreateReducer=(state={},action)=>{
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return {loading:true}
        case PRODUCT_CREATE_SUCCESS:
            return {product:action.payload,loading:false}
        case PRODUCT_CREATE_ERROR:
            return {error:action.payload,loading:false}
        case PRODUCT_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const productUpdateReducer=(state={},action)=>{
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return {loading:true}
        case PRODUCT_UPDATE_SUCCESS:
            return {updatedProduct:action.payload,loading:false}
        case PRODUCT_UPDATE_ERROR:
            return {error:action.payload,loading:false}
        case PRODUCT_UPDATE_RESET:
            return {}
        default:
            return state
    }
}