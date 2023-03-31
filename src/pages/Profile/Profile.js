import React, { useEffect } from 'react'
import { Tabs, Form, Input, Button } from 'antd';
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux';
import { GROUPID } from '../../util/settings/confis';
import { capNhatTaiKhoanCaNhanAction, layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction'
import _ from 'lodash'
import moment from 'moment';

export default function Profile() {

    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(layThongTinNguoiDungAction())
    }, [dispatch])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: thongTinNguoiDung.taiKhoan,
            matKhau: thongTinNguoiDung.matKhau,
            email: thongTinNguoiDung.email,
            hoTen: thongTinNguoiDung.hoTen,
            soDt: thongTinNguoiDung.soDT,
            maLoaiNguoiDung: '',
            maNhom: GROUPID
        },
        onSubmit: (values) => {
            dispatch(capNhatTaiKhoanCaNhanAction(values))
        }
    })

    return (
        <div>
            <div className='h-80 bg-cover bg-center' style={{ backgroundImage: `url(https://picsum.photos/100)` }}></div>
            <div className='container mx-auto'>
                <Tabs style={{ minHeight: '300px' }} defaultActiveKey="1" items={[
                    {
                        key: '1',
                        label: `Thông tin cá nhân`,
                        children: (<Form
                            onSubmitCapture={formik.handleSubmit}
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{
                                maxWidth: 600,
                            }}
                            initialValues={{ size: 'default' }}
                        >
                            <Form.Item label="Tài khoản">
                                <Input disabled name='taiKhoan' value={formik.values.taiKhoan} />
                            </Form.Item>
                            <Form.Item label="Mật khẩu">
                                <Input name='matKhau' onChange={formik.handleChange} value={formik.values.matKhau} />
                            </Form.Item>
                            <Form.Item label="Email">
                                <Input name='email' onChange={formik.handleChange} value={formik.values.email} />
                            </Form.Item>
                            <Form.Item label="Họ tên">
                                <Input name='hoTen' onChange={formik.handleChange} value={formik.values.hoTen} />
                            </Form.Item>
                            <Form.Item label="Số điện thoại">
                                <Input name='soDt' onChange={formik.handleChange} value={formik.values.soDt} />
                            </Form.Item>
                            <Form.Item label='Tác vụ'>
                                <Button onClick={() => {
                                    if (thongTinNguoiDung.loaiNguoiDung === "Quản trị") {
                                        formik.setFieldValue('maLoaiNguoiDung', 'QuanTri')
                                    } else {
                                        formik.setFieldValue('maLoaiNguoiDung', 'KhachHang')
                                    }
                                }} htmlType='submit' type='primary' className='bg-blue-500 text-white'>Cập nhật</Button>
                            </Form.Item>
                        </Form>),
                    },
                    {
                        key: '2',
                        label: `Lịch sử đặt vé`,
                        children: (<div className='grid grid-cols-2'>
                            {thongTinNguoiDung.thongTinDatVe.map((item, index) => {
                                const seats = _.first(item.danhSachGhe)
                                return <div key={index}>
                                    <div className='flex my-2'>
                                        <img className='w-28 h-28' src={item.hinhAnh} alt={item.hinhAnh} />
                                        <div className='ml-2'>
                                            <h1 className='text-2xl text-green-700'> {item.tenPhim} </h1>
                                            <p className="text-gray-500 mb-0">Ngày đặt vé: {moment(item.ngayDat).format('DD/MM/yyyy')}</p>
                                            <p className='mb-0'>{seats.tenHeThongRap}</p>
                                            <p className='mb-0'>{seats.tenCumRap} - Ghế: {item.danhSachGhe.map((ghe, index) => { return <span className='text-green-400' key={index}> {ghe.tenGhe} </span> })}</p>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>),
                    }
                ]} />
            </div>
        </div>
    )
}
