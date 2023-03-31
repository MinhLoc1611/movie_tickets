import {quanLyRapService} from '../../services/QuanLyRapService'
import { notifiFunction } from '../../util/Notification/notifiMovie'
import { SET_CHI_TIET_PHIM, SET_HE_THONG_RAP_CHIEU } from '../types/QuanLyRapType'

export const layDanhSachHeThongRapAction = () => {
    return async (dispatch) => {
        try{
            const result = await quanLyRapService.layDanhSachHeThongRap()
            dispatch({
                type: SET_HE_THONG_RAP_CHIEU,
                heThongRapChieu: result.data.content
            })
        } catch (err) {
            notifiFunction('warning','Error')
        }
    }
}

export const layThongTinChiTietPhimAction = (id) => {
    return async (dispatch) => {
        try{
            const result = await quanLyRapService.layThongTinLichChieuPhim(id)
            dispatch({
                type:SET_CHI_TIET_PHIM,
                filmDetail:result.data.content
            })

        } catch (err) {
            notifiFunction('warning','Error')
        }
    }
}