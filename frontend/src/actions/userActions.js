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
    USER_UPDATE_ERROR,
    USER_LIST_SUCCESS,
    USER_LIST_REQUEST,
    USER_LIST_ERROR,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_ERROR,
    USER_DETAILS_RESET,
    USER_ALL_ORDERS_RESET,
    ORDER_CREATE_RESET,
    ORDER_DETAILS_RESET
} from "./types";

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
export const userDetails=(id)=>async(dispatch,getState)=>{
    try {
        dispatch({type:USER_DETAILS_REQUEST});
        const {userLogin:{userInfo}}=getState();
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/users/profile?id=${id}`,config)
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
        const {data} = await axios.put('/api/users/profile',updatedUser,config);

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
export const userUpdateByAdmin=(updatedUser)=>async(dispatch,getState)=>{
    try {
        dispatch({type:USER_UPDATE_REQUEST});
        const {userLogin:{userInfo}}=getState();
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(`/api/users/${updatedUser.id}`,updatedUser,config);

        dispatch({
            type:USER_UPDATE_SUCCESS,
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
    dispatch({type:LOGOUT});
    dispatch({type:USER_ALL_ORDERS_RESET});
    dispatch({type:USER_DETAILS_RESET});
    dispatch({type:ORDER_CREATE_RESET});
    dispatch({type:ORDER_DETAILS_RESET});
}

//user actions for admins

export const userLists=()=>async(dispatch,getState)=>{
    try {
        dispatch({type:USER_LIST_REQUEST});
        const {userLogin:{userInfo}}=getState();
        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get('/api/users',config);

        dispatch({
            type:USER_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({type:USER_LIST_ERROR,payload:error.response && error.response.data.msg ? error.response.data.msg : error.msg})
    }
}


export const userDelete=(id)=>async(dispatch,getState)=>{
    try {
        dispatch({type:USER_DELETE_REQUEST});
        const {userLogin:{userInfo}}=getState();
        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.delete(`/api/users/${id}`,config);

        dispatch({
            type:USER_DELETE_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({type:USER_DELETE_ERROR,payload:error.response && error.response.data.msg ? error.response.data.msg : error.msg})
    }
}

