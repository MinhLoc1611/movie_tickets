import React, { useEffect, useState } from 'react'
import {
    DatePicker,
    Form,
    Input,
    InputNumber,
    Switch
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatPhimUploadAction, layThongTinPhimAction } from '../../../../redux/actions/QuanLyPhimActions';
import { GROUPID } from '../../../../util/settings/confis';

const Edit = (props) => {
    const [imgSrc, setImgSrc] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(layThongTinPhimAction(props.match.params.id))
    }, [dispatch, props.match.params.id])

    const { thongTinPhim } = useSelector(state => state.QuanLyPhimReducer)

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: thongTinPhim.maPhim,
            dangChieu: thongTinPhim.dangChieu,
            sapChieu: thongTinPhim.sapChieu,
            hot: thongTinPhim.hot,
            danhGia: thongTinPhim.danhGia,
            tenPhim: thongTinPhim.tenPhim,
            trailer: thongTinPhim.trailer,
            moTa: thongTinPhim.moTa,
            maNhom: GROUPID,
            ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
            hinhAnh: null
        },
        onSubmit: (values) => {
            values.maNhom = GROUPID
            let formData = new FormData()
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key])
                } else {
                    if (values.hinhAnh !== null) {
                        formData.append('File', values.hinhAnh, values.hinhAnh.name)
                    }
                }
            }
            dispatch(capNhatPhimUploadAction(formData))
        }
    })

    const handleChangeDatePicker = (value) => {
        let ngayKhoiChieu = moment(value)
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
    }

    const handleChangeSwitch = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }

    const handleChangeFile = async (e) => {
        let file = e.target.files[0]
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif') {
            await formik.setFieldValue('hinhAnh', file)
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setImgSrc(e.target.result)
            }  
        }
    }

    return (
        <>
            <h3 className='mb-5 text-lg'>Edit Phim</h3>
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
                    <Input name='tenPhim' onChange={formik.handleChange} value={formik.values.tenPhim}/>
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name='trailer' onChange={formik.handleChange} value={formik.values.trailer}/>
                </Form.Item>
                <Form.Item label="Mô tả">
                    <Input name='moTa' onChange={formik.handleChange} value={formik.values.moTa}/>
                </Form.Item>
                <Form.Item label="Ngày khởi chiếu">
                    <DatePicker format='DD/MM/YYYY' onChange={handleChangeDatePicker} defaultValue={moment(formik.values.ngayKhoiChieu)}/>
                </Form.Item>
                <Form.Item label="Đang chiếu" valuePropName="checked">
                    <Switch onChange={handleChangeSwitch('dangChieu')} className='bg-gray-400' checked={formik.values.dangChieu}/>
                </Form.Item>
                <Form.Item label="Sắp chiếu" valuePropName="checked">
                    <Switch onChange={handleChangeSwitch('sapChieu')} className='bg-gray-400' checked={formik.values.sapChieu}/>
                </Form.Item>
                <Form.Item label="Hot" valuePropName="checked">
                    <Switch onChange={handleChangeSwitch('hot')} className='bg-gray-400' checked={formik.values.hot}/>
                </Form.Item>
                <Form.Item label="Số sao">
                    <InputNumber onChange={handleChangeSwitch('danhGia')} min={1} max={10} value={formik.values.danhGia}/>
                </Form.Item>
                <Form.Item label="Hình ảnh">
                    <input type='file' accept='image/jpeg, image/jpg, image/gif, image/png' onChange={handleChangeFile} />
                    <br />
                    <img className='w-36 h-36' src={imgSrc === '' ? thongTinPhim.hinhAnh : imgSrc} alt='...' />
                </Form.Item>
                <Form.Item label="Tác vụ">
                    <button className='bg-blue-500 rounded-lg p-2 text-white' type='submit' >Cập nhật</button>
                </Form.Item>
            </Form>
        </>
    );
}


export default Edit;