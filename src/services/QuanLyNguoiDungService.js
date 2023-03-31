import { GROUPID } from "../util/settings/confis";
import { baseService } from "./baseService";

class QuanLyNguoiDungService extends baseService{
    
    dangNhap = (thongTinDangNhap) =>{
        return this.post('/api/QuanLyNguoiDung/DangNhap',thongTinDangNhap)
    }

    layThongTinNguoiDung = () =>{
        return this.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan')
    }

    dangKy = (thongTinDangKy) =>{
        return this.post('/api/QuanLyNguoiDung/DangKy',thongTinDangKy)
    }

    layDanhSachNguoiDung = (key = '') =>{
        if(key !== ''){
            return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}&tuKhoa=${key}`)
        }
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`)
    }

    layDanhSachLoaiNguoiDung = () =>{
        return this.get('/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung')
    }

    themNguoiDung = (thongTinNguoiDung) => {
        return this.post('/api/QuanLyNguoiDung/ThemNguoiDung',thongTinNguoiDung)
    }

    capNhatThongTinNguoiDung = (thongTinNguoiDung) => {
        return this.post('/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung',thongTinNguoiDung)
    }

    xoaNguoiDung = (taiKhoan) => {
        return this.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
    }

    capNhatTaiKhoanCaNhan = (thongTinTaiKhoan) =>{
        return this.put('/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung',thongTinTaiKhoan)
    }
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService()