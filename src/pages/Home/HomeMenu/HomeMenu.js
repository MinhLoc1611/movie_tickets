import React from 'react'
import { Tabs } from 'antd';
import { NavLink } from 'react-router-dom';
import moment from 'moment'

export default function HomeMenu(props) {

    const { heThongRapChieu } = props

    return (
        <>
            <Tabs
                tabPosition='left'
                items={heThongRapChieu?.map((heThongRap, index) => {
                    return {
                        label: (<img src={heThongRap.logo} alt={heThongRap.maHeThongRap} className='rounded-full w-8' />),
                        key: index,
                        children: (<Tabs
                            tabPosition='left'
                            items={heThongRap.lstCumRap?.slice(0,5).map((cumRap, index) => {
                                return {
                                    label: (<div className='flex'>
                                        <img src="https://s3img.vcdn.vn/123phim/2018/09/ddc-dong-da-15379624326697.jpg" alt={heThongRap.maHeThongRap} className='w-12' />
                                        <div className='text-left ml-2'> {cumRap.tenCumRap}
                                            <p className='text-red-200'>Chi tiết</p>
                                        </div>
                                    </div>),
                                    key: index,
                                    children: (<>
                                        {cumRap.danhSachPhim.slice(0,4).map((phim, index) => {
                                            return <div key={index}>
                                                <div className='my-2'>
                                                    <div className='flex'>
                                                        <img className='w-16 h-16' src={phim.hinhAnh} alt={phim.hinhAnh} />
                                                        <div className='ml-2'>
                                                            <h1 className='text-2xl text-green-700'> {phim.tenPhim} </h1>
                                                            <p>{cumRap.diaChi}</p>
                                                        </div>
                                                    </div>
                                                    <div className='grid grid-cols-5 gap-4'>
                                                        {phim.lstLichChieuTheoPhim?.slice(0,10).map((lichChieu, index) => {
                                                            return <NavLink className='text-green-400' to={`/checkout/${lichChieu.maLichChieu}`} key={index}>
                                                                {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                            </NavLink>
                                                        })}
                                                    </div>
                                                </div>
                                                <hr />
                                            </div>
                                        })}
                                    </>)
                                }
                            })}
                        />),
                    };
                })}
            />
        </>
    )
}
