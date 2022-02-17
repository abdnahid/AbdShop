import { 
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    LOGIN_ERROR,LOGOUT,
    LOGIN_REQUEST,
    REGISTER_REQUEST,
    REGISTER_ERROR,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_ERROR,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_ERROR } from "../actions/types";

const initialState = {
    loading:false,
    userInfo:null,
    error:null
}

export const userLoginReducer=(state=initialState,action)=>{
    switch (action.type) {
        case LOGIN_REQUEST:
            return {...state,loading:true}
        case LOGIN_SUCCESS:
            return {userInfo:action.payload,loading:false,error:null}
        case LOGIN_ERROR:
            return {...state,error:action.payload}
        case LOGOUT:
            return {}
        default:
            return state
    }
}
export const userRegisterReducer=(state=initialState,action)=>{
    switch (action.type) {
        case REGISTER_REQUEST:
            return {...state,loading:true}
        case REGISTER_SUCCESS:
            return {...state,userInfo:action.payload,loading:false}
        case REGISTER_ERROR:
            return {...state,error:action.payload}
        default:
            return state
    }
}
export const userDetailsReducer=(state={user:{}},action)=>{
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {...state,loading:true}
        case USER_DETAILS_SUCCESS:
            return {...state,user:action.payload,loading:false}
        case USER_DETAILS_ERROR:
            return {...state,error:action.payload}
        default:
            return state
    }
}
export const userUpdateReducer=(state={},action)=>{
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return {...state,loading:true}
        case USER_UPDATE_SUCCESS:
            return {...state,userInfo:action.payload,loading:false}
        case USER_UPDATE_ERROR:
            return {...state,error:action.payload}
        default:
            return state
    }
}