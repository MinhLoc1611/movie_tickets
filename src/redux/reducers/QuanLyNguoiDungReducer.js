import { TOKEN, USER_LOGIN } from "../../util/settings/confis"
import { ThongTinNguoiDung } from "../../_core/models/ThongTinNguoiDung";
import { DANG_NHAP_ACTION, GET_MA_LOAI_NGUOI_DUNG, SET_DANH_SACH_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG } from "../types/QuanLyNguoiDungType"

let user = {};
if(localStorage.getItem(USER_LOGIN)){
    user = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const stateDefault = {
    userLogin:user,
    thongTinNguoiDung: new ThongTinNguoiDung(),
    arrNguoiDung:[],
    arrLoaiNguoiDung:[]
}

export const QuanLyNguoiDungReducer = (state = stateDefault, action) =>{
    switch(action.type){

        case DANG_NHAP_ACTION:{
            const {userLogin} = action
            localStorage.setItem(USER_LOGIN,JSON.stringify(userLogin))
            localStorage.setItem(TOKEN,userLogin.accessToken)
            return {...state,userLogin:userLogin}
        }

        case SET_THONG_TIN_NGUOI_DUNG:{
            return {...state,thongTinNguoiDung:action.thongTinNguoiDung}
        }

        case SET_DANH_SACH_NGUOI_DUNG:{
            return {...state,arrNguoiDung:action.arrNguoiDung}
        }

        case GET_MA_LOAI_NGUOI_DUNG:{
            return {...state,arrLoaiNguoiDung:action.arrLoaiNguoiDung}
        }

        default: return{...state}
    }
}