import axios from "axios"
import { FETCH_ERROR, FETCH_PRODUCTS, SET_LOADING,FETCH_PRODUCT } from "./types"

export const fetchProducts=()=>async(dispatch)=>{
    try {
        dispatch({type:SET_LOADING});
        const {data}=await axios.get('/api/products');
        dispatch({type:FETCH_PRODUCTS,payload:data})
    } catch (error) {
        dispatch({type:FETCH_ERROR,payload:error.response && error.response.data.msg ? error.response.data.msg : error.msg})
    }
}
export const fetchProduct=(id)=>async(dispatch)=>{
    try {
        dispatch({type:SET_LOADING});
        const {data}=await axios.get(`/api/products/${id}`);
        dispatch({type:FETCH_PRODUCT,payload:data})
    } catch (error) {
        dispatch({type:FETCH_ERROR,payload:error.response && error.response.data.msg ? error.response.data.msg : error.msg})
    }
}