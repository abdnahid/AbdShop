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
    USER_UPDATE_ERROR, 
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_ERROR,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_ERROR,
    USER_DETAILS_RESET} from "../actions/types";

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
        case USER_DETAILS_RESET:
            return {user:{}}
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
            return {...state,error:action.payload,loading:false}
        default:
            return state
    }
}
export const userListReducer=(state={users:[]},action)=>{
    switch (action.type) {
        case USER_LIST_REQUEST:
            return {...state,loading:true}
        case USER_LIST_SUCCESS:
            return {...state,users:action.payload,loading:false}
        case USER_LIST_ERROR:
            return {...state,error:action.payload,loading:false}
        default:
            return state
    }
}
export const userDeleteReducer=(state={},action)=>{
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return {loading:true}
        case USER_DELETE_SUCCESS:
            return {message:action.payload,loading:false}
        case USER_DELETE_ERROR:
            return {error:action.payload,loading:false}
        default:
            return state
    }
}