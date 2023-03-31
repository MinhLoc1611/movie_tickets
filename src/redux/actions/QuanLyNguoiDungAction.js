import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService"
import { STATUS_CODE } from "../../util/settings/confis"
import { DANG_NHAP_ACTION, GET_MA_LOAI_NGUOI_DUNG, SET_DANH_SACH_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG } from "../types/QuanLyNguoiDungType"
import {history} from '../../App'
import { notifiFunction } from "../../util/Notification/notifiMovie"


export const dangNhapAction = (thongTinDangNhap) => {
    return async (dispatch) =>{
        try{
            const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap)
            if(result.status === STATUS_CODE.SUCCESS){
                dispatch({
                    type:DANG_NHAP_ACTION,
                    userLogin:result.data.content
                })
                notifiFunction('success','Đăng nhập thành công')
                history.goBack()
            }
        } catch(err){
            notifiFunction('warning',err.response?.data.content)
        }
    }
}

export const layThongTinNguoiDungAction = () =>{
    return async (dispatch) =>{
        try{
            const result = await quanLyNguoiDungService.layThongTinNguoiDung()

        if(result.status === STATUS_CODE.SUCCESS){
            dispatch({
                type:SET_THONG_TIN_NGUOI_DUNG,
                thongTinNguoiDung:result.data.content
            })
        }
        } catch(err){
            notifiFunction('warning','Error')
        }
        
    } 
}

export const dangKyAction = (thongTinDangKy) => {
    return async (dispatch) =>{
        try{
            const result = await quanLyNguoiDungService.dangKy(thongTinDangKy)
            if(result.status === STATUS_CODE.SUCCESS){
                notifiFunction('success','Đăng ký thành công')
                history.push('/login')
            }
        } catch(err){
            notifiFunction('warning',err.response?.data.content)
        }
    }
}

export const layDanhSachNguoiDungAction = (key = '') =>{
    return async dispatch =>{
        try{
            const result = await quanLyNguoiDungService.layDanhSachNguoiDung(key);
            if(result.status === STATUS_CODE.SUCCESS){
                dispatch({
                    type:SET_DANH_SACH_NGUOI_DUNG,
                    arrNguoiDung:result.data.content
                })
            }
        }catch(err){
            notifiFunction('warning','Error')
        }
    }
}

export const layDanhSachLoaiNguoiDungAction = () =>{
    return async dispatch =>{
        try{
            const result = await quanLyNguoiDungService.layDanhSachLoaiNguoiDung();
            if(result.status === STATUS_CODE.SUCCESS){
                dispatch({
                    type:GET_MA_LOAI_NGUOI_DUNG,
                    arrLoaiNguoiDung:result.data.content
                })
            }
        }catch(err){
            notifiFunction('warning','Error')
        }
    }
}

export const themNguoiDungAction = (thongTinNguoiDung) =>{
    return async dispatch =>{
        try{
            const result = await quanLyNguoiDungService.themNguoiDung(thongTinNguoiDung)
            if(result.status === STATUS_CODE.SUCCESS){
                notifiFunction('success','Thêm người dùng thành công')
                history.push('/admin/users')
            }
        }catch(err){
            notifiFunction('warning',err.response?.data.content)
        }
    }
}

export const capNhatThongTinNguoiDungAction = (thongTinNguoiDung) =>{
    return async dispatch =>{
        try{
            const result = await quanLyNguoiDungService.capNhatThongTinNguoiDung(thongTinNguoiDung)
            if(result.status === STATUS_CODE.SUCCESS){
                notifiFunction('success','Cập nhật thành công')
                history.push('/admin/users')
            }
        }catch(err){
            notifiFunction('warning',err.response?.data.content)
        }
    }
}

export const xoaNguoiDungAction = (taiKhoan) =>{
    return async dispatch =>{
        try{
            const result = await quanLyNguoiDungService.xoaNguoiDung(taiKhoan)
            if(result.status === STATUS_CODE.SUCCESS){
                notifiFunction('success','Xoá người dùng thành công')
                dispatch(layDanhSachNguoiDungAction())
            }
        }catch(err){
            notifiFunction('warning',err.response?.data.content)
        }
    }
}

export const capNhatTaiKhoanCaNhanAction = (thongTinTaiKhoan) =>{
    return async dispatch =>{
        try{
            const result = await quanLyNguoiDungService.capNhatTaiKhoanCaNhan(thongTinTaiKhoan)
            if(result.status === STATUS_CODE.SUCCESS){
                notifiFunction('success','Cập nhật tài khoản thành công')
                dispatch(layThongTinNguoiDungAction())
            }
        }catch(err){
            notifiFunction('warning',err.response?.data.content)
        }
    }
}