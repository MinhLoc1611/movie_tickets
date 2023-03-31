import { quanLyDatVeService } from "../../services/QuanLyDatVeService"
import { notifiFunction } from "../../util/Notification/notifiMovie"
import { STATUS_CODE } from "../../util/settings/confis"
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe"
import { CHUYEN_TAB, DAT_VE, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from "../types/QuanLyDatVeType"
import { displayLoadingAction, hideLoadingAction } from "./LoadingActions"
import {connection} from '../../index'


export const layChiTietPhongVeAction = (maLichChieu) =>{
    return async dispatch =>{
        try{
            const result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu)

            if(result.status === STATUS_CODE.SUCCESS){
                dispatch({
                    type:SET_CHI_TIET_PHONG_VE,
                    chiTietPhongVe:result.data.content
                })
            }

        } catch(err){
            notifiFunction('warning','Error!')
        }
    }
}

export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
    return async (dispatch,getState) => {
        try{
            dispatch(displayLoadingAction)

            const result = await quanLyDatVeService.datVe(thongTinDatVe)

            if(result.status === STATUS_CODE.SUCCESS){
                await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu))
                await dispatch({type:DAT_VE_HOAN_TAT})
                notifiFunction('success','Đặt vé thành công')
                await dispatch(hideLoadingAction)

                let userLogin = getState().QuanLyNguoiDungReducer.userLogin
                connection.invoke('datGheThanhCong',userLogin.taiKhoan,thongTinDatVe.maLichChieu)

                dispatch({type:CHUYEN_TAB})
            }
        } catch(err){
            dispatch(hideLoadingAction)
            notifiFunction('warning','Đặt vé thất bại !')
        }
    }
}

export const datGheAction = (ghe,maLichChieu) => {
    return async (dispatch,getState) =>{
        await dispatch({
            type: DAT_VE,
            gheDuocChon: ghe
        })

        let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat
        let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan

        danhSachGheDangDat = JSON.stringify(danhSachGheDangDat)

        connection.invoke('datGhe',taiKhoan,danhSachGheDangDat,maLichChieu)
    }
}

export const taoLichChieuAction = (thongTinLichChieu) => {
    return async dispatch =>{
        try{
            const result = await quanLyDatVeService.taoLichChieu(thongTinLichChieu)
            if(result.status === STATUS_CODE.SUCCESS){
                notifiFunction('success','Tạo lịch chiếu thành công')
            }
        } catch(err){
            notifiFunction('warning','Tạo lịch chiếu thất bại !')
        }
    }
}