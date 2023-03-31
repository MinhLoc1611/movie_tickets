import React, { useEffect } from "react";
import { Table, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { layDanhSachPhimAction, xoaPhimAction } from "../../../redux/actions/QuanLyPhimActions";
import { NavLink } from "react-router-dom";
import { EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import { history } from "../../../App";

const { Search } = Input;

export default function Films() {
    const { arrFilmDefault } = useSelector((state) => state.QuanLyPhimReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(layDanhSachPhimAction());
    }, [dispatch]);

    const columns = [
        {
            title: "maPhim",
            dataIndex: "maPhim",
            sorter: (a, b) => a.maPhim - b.maPhim,
            defaultSortOrder: "descend",
            width: '10%'
        },
        {
            title: "Hình Ảnh",
            dataIndex: "hinhAnh",
            render: (text, film, index) => {
                return (
                    <>
                        <img src={film.hinhAnh} alt={film.tenPhim} className="w-12 h-12" onError={(e) => { e.target.onError = null; e.target.src = `https://picsum.photo/id/${index}/50/50` }} />
                    </>
                );
            },
            width: '10%'
        },
        {
            title: "Tên Phim",
            dataIndex: "tenPhim",
            sorter: (a, b) => {
                let tenPhimA = a.tenPhim.toLowerCase().trim();
                let tenPhimB = a.tenPhim.toLowerCase().trim();
                if (tenPhimA > tenPhimB) {
                    return 1;
                }
                return -1;
            },
            sortDirections: ['descend', 'ascend'],
            width: '30%'
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            render: (text, film) => {
                return <>
                    {film.moTa.length > 50 ? film.moTa.substr(0, 50) + ' ...' : film.moTa}
                </>
            },
            width: '30%'
        },
        {
            title: 'Hành động',
            dataIndex: 'maPhim',
            render: (text, film) => {
                return <>
                    <NavLink key={1} className=" mr-2 text-2xl" to={`/admin/films/edit/${film.maPhim}`}><EditOutlined style={{ color: 'blue' }} /> </NavLink>
                    
                    <span key={2} className="text-2xl cursor-pointer" onClick={()=>{
                        if(window.confirm('Bạn có chắc muốn xoá phim ' + film.tenPhim)){
                            dispatch(xoaPhimAction(film.maPhim))
                        }
                    }} ><DeleteOutlined style={{ color: 'red' }} /> </span>
                   
                    <NavLink key={3} className=" mr-2 text-2xl" to={`/admin/films/showtime/${film.maPhim}/${film.tenPhim}`} onClick={() => {
                        localStorage.setItem('filmParams', JSON.stringify(film));
                    }}><CalendarOutlined style={{ color: 'green' }} /> </NavLink>
                </>
            },
            width: '20%'
        }
    ];

    const onSearch = (value) => {
        dispatch(layDanhSachPhimAction(value))
    };

    return (
        <div>
            <h3 className="text-4xl">Quản lý Phim</h3>
            <Button onClick={() => {
                history.push('/admin/films/addnew')
            }} className="mb-3">Thêm phim</Button>
            <Search
                className="mb-5"
                placeholder="input search text"
                onSearch={onSearch}
            />
            <Table
                rowKey={'maPhim'}
                columns={columns}
                dataSource={arrFilmDefault}
            />
        </div>
    );
}
