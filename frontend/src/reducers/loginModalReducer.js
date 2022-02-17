import { MODAL_OPEN,MODAL_CLOSE } from "../actions/types";

const initialState = {
    isOpen:false
}

export const loginModalReducer=(state=initialState,action)=>{
    switch (action.type) {
        case MODAL_OPEN:
            return {...state,isOpen:true}
        case MODAL_CLOSE:
            return {...state,isOpen:false}
        default:
            return state
    }
}