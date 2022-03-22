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
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS
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
export const getMyOrders=()=>async(dispatch,getState)=>{
        dispatch({type:ALL_ORDERS_REQUEST});
        const {userLogin:{userInfo}}=getState();
        if (userInfo) {
            const config = {
                headers:{
                    Authorization:`Bearer ${userInfo.token}`
                }
            }
            const {data} = await axios.get('/api/orders/myorders',config)
            dispatch({
                type:ALL_ORDERS_SUCCESS,
                payload: data
            })
        }else{
            dispatch({type:ORDER_DETAILS_ERROR,payload:"User not authorized"})
        }
    }