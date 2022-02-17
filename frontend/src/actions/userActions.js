import axios from "axios";
import { 
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    LOGIN_ERROR,
    LOGIN_REQUEST,
    LOGOUT,
    REGISTER_REQUEST,
    REGISTER_ERROR,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_ERROR, 
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_ERROR} from "./types";

export const login=(email,password)=>async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST});
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
        const {data} = await axios.post('/api/users/login',{email,password},config)
        dispatch({
            type:LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userData',JSON.stringify(data));
    } catch (error) {
        dispatch({type:LOGIN_ERROR,payload:error.response && error.response.data.msg ? error.response.data.msg : error.msg})
    }
}
export const register=(name,email,password)=>async(dispatch)=>{
    dispatch({type:REGISTER_REQUEST});
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
        const {data} = await axios.post('/api/users/',{name,email,password},config)
        dispatch({
            type:REGISTER_SUCCESS,
            payload: data
        })
        dispatch({
            type:LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userData',JSON.stringify(data));
    } catch (error) {
        dispatch({type:REGISTER_ERROR,payload:error.response && error.response.data.msg ? error.response.data.msg : error.msg})
    }
}
export const userDetails=()=>async(dispatch,getState)=>{
    try {
        dispatch({type:USER_DETAILS_REQUEST});
        const {userLogin:{userInfo}}=getState();
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get('/api/users/profile',config)
        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({type:USER_DETAILS_ERROR,payload:error.response && error.response.data.msg ? error.response.data.msg : error.msg})
    }
}
export const userUpdate=(updatedUser)=>async(dispatch,getState)=>{
    try {
        dispatch({type:USER_UPDATE_REQUEST});
        const {userLogin:{userInfo}}=getState();
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put('/api/users/profile',updatedUser,config)

        dispatch({
            type:USER_UPDATE_SUCCESS,
            payload: data
        })
        dispatch({
            type:LOGIN_SUCCESS,
            payload: data
        })
        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({type:USER_UPDATE_ERROR,payload:error.response && error.response.data.msg ? error.response.data.msg : error.msg})
    }
}

export const logout=()=>(dispatch)=>{
    localStorage.removeItem('userData');
    dispatch({type:LOGOUT})
}
