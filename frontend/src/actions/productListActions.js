import axios from "axios"
import { 
    FETCH_ERROR, 
    FETCH_PRODUCTS, 
    FETCH_PRODUCT, 
    PRODUCT_REQUEST,
    PRODUCT_DELETE_ERROR,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_RESET,
    PRODUCT_CREATE_REQUEST, 
    PRODUCT_CREATE_SUCCESS, 
    PRODUCT_CREATE_ERROR, 
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_ERROR,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_RESET,
    REVIEW_CREATE_REQUEST,
    REVIEW_CREATE_SUCCESS,
    REVIEW_CREATE_ERROR} from "./types"

export const fetchProducts=(keyword="",pageNumber="")=>async(dispatch)=>{
    try {
        dispatch({type:PRODUCT_REQUEST});
        const {data}=await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
        dispatch({type:FETCH_PRODUCTS,payload:data})
    } catch (error) {
        dispatch({type:FETCH_ERROR,payload:error.response && error.response.data.msg ? error.response.data.msg : error.msg})
    }
}
export const fetchProduct=(id)=>async(dispatch)=>{
    try {
        dispatch({type:PRODUCT_REQUEST});
        const {data}=await axios.get(`/api/products/${id}`);
        dispatch({type:FETCH_PRODUCT,payload:data})
    } catch (error) {
        dispatch({type:FETCH_ERROR,payload:error.response && error.response.data.msg ? error.response.data.msg : error.msg})
    }
}

export const productDelete=(id)=>async(dispatch,getState)=>{
    try {
        dispatch({type:PRODUCT_DELETE_REQUEST});
        const {userLogin:{userInfo}}=getState();
        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.delete(`/api/products/${id}`,config);

        dispatch({
            type:PRODUCT_DELETE_SUCCESS,
            payload:data
        })
        setTimeout(() => {
            dispatch({type:PRODUCT_DELETE_RESET})
        }, 2000);
    } catch (error) {
        dispatch({type:PRODUCT_DELETE_ERROR,payload:error.response && error.response.data.msg ? error.response.data.msg : error.msg})
    }
}

export const productCreate=()=>async(dispatch,getState)=>{
    try {
        dispatch({type:PRODUCT_CREATE_REQUEST});
        const {userLogin:{userInfo}}=getState();
        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post('/api/products',{},config);
        dispatch({
            type:PRODUCT_CREATE_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({type:PRODUCT_CREATE_ERROR,payload:error.response && error.response.data.msg ? error.response.data.msg : error.msg})
    }
}

export const productUpdate=(updatedProduct)=>async(dispatch,getState)=>{
    try {
        dispatch({type:PRODUCT_UPDATE_REQUEST});
        const {userLogin:{userInfo}}=getState();
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(`/api/products/${updatedProduct.id}`,updatedProduct,config);

        dispatch({
            type:PRODUCT_UPDATE_SUCCESS,
            payload: data
        })
        setTimeout(() => {
            dispatch({type:PRODUCT_UPDATE_RESET})
        }, 2000);
    } catch (error) {
        dispatch({type:PRODUCT_UPDATE_ERROR,payload:error.response && error.response.data.msg ? error.response.data.msg : error.msg})
    }
}


export const createReview=(id,review)=>async(dispatch,getState)=>{
    try {
        dispatch({type:REVIEW_CREATE_REQUEST});
        const {userLogin:{userInfo}}=getState();
        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        await axios.post(`/api/products/${id}/reviews`,review,config);
        dispatch({
            type:REVIEW_CREATE_SUCCESS,
        })
    } catch (error) {
        dispatch({type:REVIEW_CREATE_ERROR,payload:error.response && error.response.data.msg ? error.response.data.msg : error.msg})
    }
}