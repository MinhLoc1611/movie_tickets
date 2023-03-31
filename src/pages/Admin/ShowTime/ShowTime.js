import React, { useEffect, useState } from 'react'
import {
    Form,
    InputNumber,
    Button,
    DatePicker,
    Select
} from 'antd';
import { quanLyRapService } from '../../../services/QuanLyRapService';
import { STATUS_CODE } from '../../../util/settings/confis';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { taoLichChieuAction } from '../../../redux/actions/QuanLyDatVeActions';

const dateFormat = "DD/MM/YYYY hh:mm:ss"

export default function ShowTime(props) {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues:{
            maPhim:props.match.params.id,
            ngayChieuGioChieu:'',
            maRap:'',
            giaVe:''
        },
        onSubmit: async (values)=>{
            dispatch(taoLichChieuAction(values))
        }
    })

    const [state,setState] = useState({
        heThongRapChieu:[],
        cumRapChieu:[]
    })

    async function layHTR(){
        try{
            let result = await quanLyRapService.layThongTinHeThongRap();
            setState({
                ...state,
                heThongRapChieu:result.data.content
            })
        } catch(err){
            alert('error!')
        }
    }

    useEffect(()=>{
        layHTR()
    },[])

    const handleChangeHeThongRap = async (value) =>{
        try{
            let result = await quanLyRapService.layThongTinCumRap(value)
            if(result.status === STATUS_CODE.SUCCESS){
                setState({
                    ...state,
                    cumRapChieu:result.data.content
                })
            }
        }catch(err){
            alert('error!')
        }
    }

    const handleChangeCumRap = (value) =>{
        formik.setFieldValue('maRap',value)
    }

    const onChangeDate = (value) => {
        formik.setFieldValue('ngayChieuGioChieu',moment(value).format(dateFormat))
    }

    const onOk = (value) => {
        formik.setFieldValue('ngayChieuGioChieu',moment(value).format(dateFormat))
    };

    const onChangeInputNumber = (value) =>{
        formik.setFieldValue('giaVe',value)
    }

    let film = {}
    if(localStorage.getItem('filmParams')){
        film = JSON.parse(localStorage.getItem('filmParams'))
    }

  return (
    <div className='container'>
        <h3 className='text-2xl'>Tạo lịch chiếu - {props.match.params.tenphim}</h3>
        <img src={film.hinhAnh} className='w-32' alt={film.tenPhim}/>
        <Form
            name='basic'
            labelCol={{span:8}}
            wrapperCol={{span:16}}
            style={{
                maxWidth: 600,
              }}
            initialValues={{size: 'default'}}
            onSubmitCapture={formik.handleSubmit}
        >
            <Form.Item label='Hệ thống rạp'>
              <Select options={state.heThongRapChieu?.map((htr,index)=>({label:htr.tenHeThongRap,value:htr.maHeThongRap}))}  onChange={handleChangeHeThongRap} placeholder='Chọn hệ thống rạp'/>
            </Form.Item>
            <Form.Item label='Cụm rạp'>
              <Select options={state.cumRapChieu?.map((cumRap,index)=>({label:cumRap.tenCumRap,value:cumRap.maCumRap}))} onChange={handleChangeCumRap} placeholder='Chọn hệ thống rạp'/>
            </Form.Item>
            <Form.Item label='Ngày chiếu giờ chiếu'>
              <DatePicker format={dateFormat} showTime onChange={onChangeDate} onOk={onOk}/>
            </Form.Item>
            <Form.Item label='Giá vé'>
              <InputNumber min={75000} max={150000} onChange={onChangeInputNumber}/>
            </Form.Item>
            <Form.Item label='Tác vụ'>
              <Button htmlType='submit' type='primary' className='bg-blue-500 text-white'>Tạo lịch chiếu</Button>
            </Form.Item>
        </Form>
    </div>
  )
}
