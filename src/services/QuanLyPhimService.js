import { GROUPID } from "../util/settings/confis";
import { baseService } from "./baseService";

class QuanLyPhimService extends baseService{
    
    layDanhSachBanner = () => {
        return this.get('/api/QuanLyPhim/LayDanhSachBanner')
    }

    layDanhSachPhim = (tenPhim = '') =>{
        if(tenPhim !== ''){
            return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}&tenPhim=${tenPhim}`)
        }
        return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`)
    }

    themPhimUploadHinh = (formData) => {
        return this.post('/api/QuanLyPhim/ThemPhimUploadHinh',formData)
    }

    layThongTinPhim = (maPhim) =>{
        return this.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
    }

    capNhatPhimUpload = (formData) =>{
        return this.post('/api/QuanLyPhim/CapNhatPhimUpload',formData)
    }

    xoaPhim = (maPhim) =>{
        return this.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`)
    }
}

export const quanLyPhimService = new QuanLyPhimService()