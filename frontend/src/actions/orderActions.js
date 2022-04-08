import axios from "axios";
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
    USER_ALL_ORDERS_REQUEST,
    USER_ALL_ORDERS_SUCCESS,
    USER_ALL_ORDERS_ERROR,
    ADMIN_ALL_ORDERS_REQUEST,
    ADMIN_ALL_ORDERS_SUCCESS,
    ADMIN_ALL_ORDERS_ERROR
} from "./types";

export const addOrder=(orderData)=>async(dispatch,getState)=>{
    try {
        dispatch({type:ORDER_CREATE_REQUEST});
        const {userLogin:{userInfo}}=getState();
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post('/api/orders',orderData,config)
        console.log(data);

        dispatch({
            type:ORDER_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({type:ORDER_CREATE_ERROR,payload:error.response && error.response.data.msg ? error.response.data.msg : error.msg})
    }
}
export const getOrderList=(id)=>async(dispatch,getState)=>{
        dispatch({type:ORDER_DETAILS_REQUEST});
        const {userLogin:{userInfo}}=getState();
        if (userInfo) {
            const config = {
                headers:{
                    Authorization:`Bearer ${userInfo.token}`
                }
            }
            const {data} = await axios.get(`/api/orders/${id}`,config)
            dispatch({
                type:ORDER_DETAILS_SUCCESS,
                payload: data
            })
        }else{
            dispatch({type:ORDER_DETAILS_ERROR,payload:"User not authorized"})
        }
    }
export const payOrderAction=(id,paymentResult)=>async(dispatch,getState)=>{
        dispatch({type:ORDER_PAY_REQUEST});
        const {userLogin:{userInfo}}=getState();
        if (userInfo) {
            const config = {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization:`Bearer ${userInfo.token}`
                }
            }
            const {data} = await axios.put(`/api/orders/${id}/pay`,paymentResult,config)
            dispatch({
                type:ORDER_PAY_SUCCESS,
                payload: data
            })
        }else{
            dispatch({type:ORDER_PAY_ERROR,payload:"User not authorized"})
        }
    }
export const deliverOrderAction=(delivered,id)=>async(dispatch,getState)=>{
        dispatch({type:ADMIN_ALL_ORDERS_REQUEST});
        const {userLogin:{userInfo}}=getState();
        if (userInfo) {
            const config = {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization:`Bearer ${userInfo.token}`
                }
            }
            const {data} = await axios.put(`/api/orders/${id}/deliver`,{delivered},config)
            dispatch({
                type:ADMIN_ALL_ORDERS_SUCCESS,
                payload: data
            })
        }else{
            dispatch({type:ADMIN_ALL_ORDERS_ERROR,payload:"User not authorized"})
        }
    }
export const getMyOrders=()=>async(dispatch,getState)=>{
        dispatch({type:USER_ALL_ORDERS_REQUEST});
        const {userLogin:{userInfo}}=getState();
        if (userInfo) {
            const config = {
                headers:{
                    Authorization:`Bearer ${userInfo.token}`
                }
            }
            const {data} = await axios.get('/api/orders/myorders',config)
            dispatch({
                type:USER_ALL_ORDERS_SUCCESS,
                payload: data
            })
        }else{
            dispatch({type:USER_ALL_ORDERS_ERROR,payload:"User not authorized"})
        }
    }
export const getAdminOrders=()=>async(dispatch,getState)=>{
        dispatch({type:ADMIN_ALL_ORDERS_REQUEST});
        const {userLogin:{userInfo}}=getState();
        try {
            const config = {
                headers:{
                    Authorization:`Bearer ${userInfo.token}`
                }
            }
            const {data} = await axios.get('/api/orders',config)
            if (data) {
                dispatch({
                    type:ADMIN_ALL_ORDERS_SUCCESS,
                    payload: data
                }) 
            }else{
                dispatch({
                    type:ADMIN_ALL_ORDERS_ERROR,
                    payload:"Not authorized. Only Admin can view this."
                })
            }
        } catch (error) {
            dispatch({type:ADMIN_ALL_ORDERS_ERROR,payload:error.response && error.response.data.msg ? error.response.data.msg : error.msg})
        }
    }