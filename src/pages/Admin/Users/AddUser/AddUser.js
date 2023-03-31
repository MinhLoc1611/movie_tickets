import React, { useEffect } from 'react'
import { Button, Form, Input, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { layDanhSachLoaiNguoiDungAction, themNguoiDungAction } from '../../../../redux/actions/QuanLyNguoiDungAction'
import { useFormik } from 'formik'
import { GROUPID } from '../../../../util/settings/confis'

export default function AddUser() {

    const { arrLoaiNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
            email: '',
            hoTen: '',
            soDt: '',
            maLoaiNguoiDung: '',
            maNhom: GROUPID
        },
        onSubmit: (values) => {
            dispatch(themNguoiDungAction(values))
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
            <h3 className='mb-5 text-lg'>Thêm người dùng</h3>
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
                    <Input name='taiKhoan' onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Mật khẩu">
                    <Input name='matKhau' onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Email">
                    <Input name='email' onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Họ tên">
                    <Input name='hoTen' onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Số điện thoại">
                    <Input name='soDt' onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Mã loại người dùng">
                    <Select onChange={handleChangeLoaiNguoiDung} name='maLoaiNguoiDung' options={arrLoaiNguoiDung?.map((item, index) => ({ label: item.tenLoai, value: item.maLoaiNguoiDung }))} />
                </Form.Item>
                <Form.Item label='Tác vụ'>
                    <Button htmlType='submit' type='primary' className='bg-blue-500 text-white'>Thêm người dùng</Button>
                </Form.Item>
            </Form>
        </>
    )
}
