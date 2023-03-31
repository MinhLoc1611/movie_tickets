import React, { useEffect } from 'react'
import { Button, Form, Input, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { capNhatThongTinNguoiDungAction, layDanhSachLoaiNguoiDungAction } from '../../../../redux/actions/QuanLyNguoiDungAction'
import { useFormik } from 'formik'
import { GROUPID } from '../../../../util/settings/confis'

export default function EditUser() {

    let user = {}
    if(localStorage.getItem('userParams')){
        user = JSON.parse(localStorage.getItem('userParams'))
    }

    const { arrLoaiNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            taiKhoan: user.taiKhoan,
            matKhau: user.matKhau,
            email: user.email,
            hoTen: user.hoTen,
            soDt: user.soDt,
            maLoaiNguoiDung: user.maLoaiNguoiDung,
            maNhom: GROUPID
        },
        onSubmit: (values) => {
            dispatch(capNhatThongTinNguoiDungAction(values))
        }
    })

    useEffect(() => {
        dispatch(layDanhSachLoaiNguoiDungAction())
    }, [dispatch])

    const handleChangeLoaiNguoiDung = (value) => {
        formik.setFieldValue('maLoaiNguoiDung', value)
    }

    return (
        <>
            <h3 className='mb-5 text-lg'>Edit người dùng</h3>
            <Form
                onSubmitCapture={formik.handleSubmit}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{ size: 'default' }}
            >
                <Form.Item label="Tài khoản">
                    <Input disabled name='taiKhoan' value={formik.values.taiKhoan}/>
                </Form.Item>
                <Form.Item label="Mật khẩu">
                    <Input name='matKhau' onChange={formik.handleChange} value={formik.values.matKhau}/>
                </Form.Item>
                <Form.Item label="Email">
                    <Input name='email' onChange={formik.handleChange} value={formik.values.email}/>
                </Form.Item>
                <Form.Item label="Họ tên">
                    <Input name='hoTen' onChange={formik.handleChange} value={formik.values.hoTen}/>
                </Form.Item>
                <Form.Item label="Số điện thoại">
                    <Input name='soDt' onChange={formik.handleChange} value={formik.values.soDt}/>
                </Form.Item>
                <Form.Item label="Mã loại người dùng">
                    <Select defaultValue={formik.maLoaiNguoiDung} onChange={handleChangeLoaiNguoiDung} name='maLoaiNguoiDung' options={arrLoaiNguoiDung?.map((item, index) => ({ label: item.tenLoai, value: item.maLoaiNguoiDung }))} />
                </Form.Item>
                <Form.Item label='Tác vụ'>
                    <Button htmlType='submit' type='primary' className='bg-blue-500 text-white'>Cập nhật</Button>
                </Form.Item>
            </Form>
        </>
    )
}
