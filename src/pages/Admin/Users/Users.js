import React, { useEffect } from 'react'
import { Table, Input, Button } from "antd";
import { NavLink } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { history } from "../../../App";
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachNguoiDungAction, xoaNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';

const { Search } = Input;

export default function Users() {

    const {arrNguoiDung} = useSelector(state => state.QuanLyNguoiDungReducer);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(layDanhSachNguoiDungAction())
    },[dispatch])

    const columns = [
        {
            title: "Tài khoản",
            dataIndex: "taiKhoan",
            sorter: (a, b) => {
                let taiKhoanA = a.taiKhoan.toLowerCase().trim();
                let taiKhoanB = a.taiKhoan.toLowerCase().trim();
                if (taiKhoanA > taiKhoanB) {
                    return 1;
                }
                return -1;
            },
            sortDirections: ['descend', 'ascend'],
            width: '15%'
        },
        {
            title: 'Họ tên',
            dataIndex: 'hoTen',
            sorter: (a, b) => {
                let hoTenA = a.hoTen.toLowerCase().trim();
                let hoTenB = a.hoTen.toLowerCase().trim();
                if (hoTenA > hoTenB) {
                    return 1;
                }
                return -1;
            },
            sortDirections: ['descend', 'ascend'],
            width: '15%'
        },
        {
            title:'Email',
            dataIndex:'email',
            with:'30%'
        },
        {
            title:'Số điện thoại',
            dataIndex:'soDt',
            with:'20%'
        },
        {
            title: 'Hành động',
            render: (text, user) => {
                return <>
                    <NavLink key={1} className=" mr-2 text-2xl" to={`/admin/users/edituser`} onClick={() => {
                        localStorage.setItem('userParams', JSON.stringify(user));
                    }} ><EditOutlined style={{ color: 'blue' }} /> </NavLink>
                    
                    <span key={2} className="text-2xl cursor-pointer" onClick={()=>{
                        if(window.confirm('Bạn có chắc muốn xoá người dùng ' + user.taiKhoan)){
                            dispatch(xoaNguoiDungAction(user.taiKhoan))
                        }
                    }} ><DeleteOutlined style={{ color: 'red' }} /> </span>
                   
                    
                </>
            },
            width: '20%'
        }
    ];

    const onSearch = (value) => {
        dispatch(layDanhSachNguoiDungAction(value))
    };

  return (
    <div>
            <h3 className="text-4xl">Quản lý Người dùng</h3>
            <Button onClick={() => {
                history.push('/admin/users/adduser')
            }} className="mb-3">Thêm người dùng</Button>
            <Search
                className="mb-5"
                placeholder="input search text"
                onSearch={onSearch}
            />
            <Table
                columns={columns}
                dataSource={arrNguoiDung}
            />
        </div>
  )
}
