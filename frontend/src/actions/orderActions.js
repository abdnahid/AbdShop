import axios from "axios";
import { ORDER_REQUEST,ORDER_SUCCESS,ORDER_ERROR } from "./types";

export const addOrder=(orderData)=>async(dispatch,getState)=>{
    console.log(orderData)
    try {
        dispatch({type:ORDER_REQUEST});
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
            type:ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({type:ORDER_ERROR,payload:error.response && error.response.data.msg ? error.response.data.msg : error.msg})
    }
}