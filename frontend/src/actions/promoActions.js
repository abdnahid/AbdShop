import axios from "axios";
import { ADD_PROMO,GET_PROMO,PROMO_ERROR } from "./types";

export const addPromo=(promoData)=>async(dispatch)=>{
    try {
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const {data} = await axios.post("/api/promos",promoData,config)
        dispatch({
            type:ADD_PROMO,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:PROMO_ERROR,
            payload:error.response && error.response.data.msg ? error.response.data.msg : error.msg
        })
    } 
}

export const getPromo=(promo)=>async(dispatch)=>{
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    console.log(promo)
    try {
        const {data} = await axios.get('/api/promos', {params: {code: promo}},config)
        dispatch({
            type:GET_PROMO,
            payload:data
        })
    } catch (error) {
        console.log(error.response.data)
        dispatch({
            type:PROMO_ERROR,
            payload:error.response && error.response.data.msg ? error.response.data.msg : error.msg
        })
    }
    
}
