import { ThongTinLichChieu } from "../../_core/models/ThongTinPhongVe"
import { CHUYEN_TAB, CHUYEN_TAB_ACTIVE, DAT_GHE, DAT_VE, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from "../types/QuanLyDatVeType"


const stateDefault = {
    chiTietPhongVe:new ThongTinLichChieu(),
    danhSachGheDangDat:[],
    danhSachGheKhachDat:[],
    tabActive: '1'
}

export const QuanLyDatVeReducer = (state=stateDefault,action) => {
    switch (action.type){

        case SET_CHI_TIET_PHONG_VE:{
            return {...state,chiTietPhongVe:action.chiTietPhongVe}
        }

        case DAT_VE:{
            let danhSachGheCapNhat = [...state.danhSachGheDangDat]
            let index = danhSachGheCapNhat.findIndex(gheDD => gheDD.maGhe === action.gheDuocChon.maGhe);
            if(index !== -1){
                danhSachGheCapNhat.splice(index,1)
            } else {
                danhSachGheCapNhat.push(action.gheDuocChon)
            }
            return {...state,danhSachGheDangDat:danhSachGheCapNhat}
        }

        case DAT_GHE:{
            return {...state,danhSachGheKhachDat:action.arrGheKhachDat}
        }

        case DAT_VE_HOAN_TAT:{
            return {...state,danhSachGheDangDat:[]}
        }

        case CHUYEN_TAB : {
            return {...state,tabActive:'2'}
        }

        case CHUYEN_TAB_ACTIVE:{
            return {...state,tabActive:action.number}
        }

        default: return {...state}
    }
}