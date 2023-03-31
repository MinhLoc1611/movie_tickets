import { SET_HE_THONG_RAP_CHIEU } from "../types/QuanLyRapType"


const stateDefault = {
    heThongRapChieu:[]
}

export const QuanLyRapReducer = (state=stateDefault,action) => {
    switch(action.type){

        case SET_HE_THONG_RAP_CHIEU:{
            return {...state,heThongRapChieu:action.heThongRapChieu}
        }

        default: return {...state}
    }
}