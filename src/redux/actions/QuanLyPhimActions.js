import { history } from '../../App'
import { quanLyPhimService } from '../../services/QuanLyPhimService'
import { notifiFunction } from '../../util/Notification/notifiMovie'
import { STATUS_CODE } from '../../util/settings/confis'
import { SET_DANH_SACH_PHIM, SET_THONG_TIN_PHIM } from '../types/QuanLyPhimType'

export const layDanhSachPhimAction = (tenPhim = '') =>{
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.layDanhSachPhim(tenPhim)
            if(result.status === STATUS_CODE.SUCCESS){
                dispatch({
                    type: SET_DANH_SACH_PHIM,
                    arrFilm: result.data.content
                })
            }
        } catch (err) {
            notifiFunction('warning','Error')
        }
    }
}

export const themPhimUploadHinhAction = (formData) =>{
    return async dispatch =>{
        try{
            const result = await quanLyPhimService.themPhimUploadHinh(formData)
            if(result.status === STATUS_CODE.SUCCESS){
                notifiFunction('success','Thêm phim thành công')
                history.push('/admin/films')
            }

        }catch(err){
            notifiFunction('warning','Thêm phim thất bại !')
        }
    }
}

export const layThongTinPhimAction = (maPhim) =>{
    return async dispatch => {
        try{
            const result = await quanLyPhimService.layThongTinPhim(maPhim);
            if(result.status === STATUS_CODE.SUCCESS){
                dispatch({
                    type:SET_THONG_TIN_PHIM,
                    thongTinPhim:result.data.content
                })
            }
        }catch(err){
            notifiFunction('warning','Error')
        }
    }
}

export const capNhatPhimUploadAction = (formData) =>{
    return async dispatch =>{
        try{
            const result = await quanLyPhimService.capNhatPhimUpload(formData)
            if(result.status === STATUS_CODE.SUCCESS){
                notifiFunction('success','Cập nhật phim thành công')
                history.push('/admin/films')
            }

        }catch(err){
            notifiFunction('warning','Cập nhật phim thất bại !')
        }
    }
}

export const xoaPhimAction = (maPhim) =>{
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.xoaPhim(maPhim)
            if(result.status===STATUS_CODE.SUCCESS){
                notifiFunction('success','Xoá phim thành công')
                dispatch(layDanhSachPhimAction())
            }
        } catch (err) {
            notifiFunction('warning','Xoá phim thất bại !')
        }
    }
}