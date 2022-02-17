import { MODAL_OPEN,MODAL_CLOSE } from "./types";

export const openModal=()=>(dispatch)=>{
    dispatch({
        type:MODAL_OPEN
    })
}
export const closeModal=()=>(dispatch)=>{
    dispatch({
        type:MODAL_CLOSE
    })
}