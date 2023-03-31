import React, { useState } from 'react'
import {
    DatePicker,
    Form,
    Input,
    InputNumber,
    Switch
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { themPhimUploadHinhAction } from '../../../../redux/actions/QuanLyPhimActions';
import { GROUPID } from '../../../../util/settings/confis';

const AddNew = () => {
    const [imgSrc, setImgSrc] = useState('')
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            tenPhim: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: '',
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: {}
        },
        onSubmit: (values) => {
            values.maNhom = GROUPID
            let formData = new FormData()
            for(let key in values){
                if(key !== 'hinhAnh'){
                    formData.append(key,values[key])
                } else {
                    formData.append('File',values.hinhAnh,values.hinhAnh.name)
                }
            }
            dispatch(themPhimUploadHinhAction(formData))
        }
    })

    const handleChangeDatePicker = (value) => {
        let ngayKhoiChieu = moment(value).format('DD/MM/YYYY')
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
    }

    const handleChangeSwitch = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }

    const handleChangeFile = (e) => {
        let file = e.target.files[0]
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif') {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setImgSrc(e.target.result)
            }
            formik.setFieldValue('hinhAnh', file)
        }
    }

    return (
        <>
            <h3 className='mb-5 text-lg'>Thêm mới phim</h3>
            <Form
                onSubmitCapture={formik.handleSubmit}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={{
                    size: 'default',
                }}
                size='default'
                style={{
                    maxWidth: '100%',
                }}
            >

                <Form.Item label="Tên phim">
                    <Input name='tenPhim' onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name='trailer' onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Mô tả">
                    <Input name='moTa' onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Ngày khởi chiếu">
                    <DatePicker format={'DD/MM/YYYY'} onChange={handleChangeDatePicker} />
                </Form.Item>
                <Form.Item label="Đang chiếu" valuePropName="checked">
                    <Switch onChange={handleChangeSwitch('dangChieu')} className='bg-gray-400' />
                </Form.Item>
                <Form.Item label="Sắp chiếu" valuePropName="checked">
                    <Switch onChange={handleChangeSwitch('sapChieu')} className='bg-gray-400' />
                </Form.Item>
                <Form.Item label="Hot" valuePropName="checked">
                    <Switch onChange={handleChangeSwitch('hot')} className='bg-gray-400' />
                </Form.Item>
                <Form.Item label="Số sao">
                    <InputNumber onChange={handleChangeSwitch('danhGia')} min={1} max={10} />
                </Form.Item>
                <Form.Item label="Hình ảnh">
                    <input type='file' accept='image/jpeg, image/jpg, image/gif, image/png' onChange={handleChangeFile}/>
                    <br />
                    <img className='w-36 h-36' src={imgSrc} alt='...' />
                </Form.Item>
                <Form.Item label="Tác vụ">
                    <button className='bg-blue-500 rounded-lg p-2 text-white' type='submit' >Thêm phim</button>
                </Form.Item>
            </Form>
        </>
    );
}


export default AddNew;