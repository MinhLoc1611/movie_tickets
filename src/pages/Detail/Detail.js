import React, { useEffect } from 'react'
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import '../../assets/styles/circle.css'
import { Tabs, Rate } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinChiTietPhimAction } from '../../redux/actions/QuanLyRapActions';
import moment from 'moment'
import {NavLink} from 'react-router-dom'


export default function Detail(props) {

    const { filmDetail } = useSelector(state => state.QuanLyPhimReducer)
    
    const arrTab = [
        {
            key: '1',
            label: `Lịch chiếu`,
            children: (<Tabs

                tabPosition='left'
                items={filmDetail.heThongRapChieu?.map((htr, index) => {
                    return {
                        label: (<div className='flex items-center'>
                            <img src={htr.logo} alt={htr.logo} className='rounded-full w-12 mr-2' />
                            {htr.tenHeThongRap}
                        </div>),
                        key: index,
                        children: (<>
                            {htr.cumRapChieu?.map((cumRap, index) => {
                                return <div key={index}>
                                    <div className='flex items-center'>
                                        <img src={cumRap.hinhAnh} alt={cumRap.hinhAnh} className='w-14' />
                                        <div className='ml-2'>
                                            <p className='text-2xl mb-0'> {cumRap.tenCumRap} </p>
                                            <p className='mb-0 text-gray-400'> {cumRap.diaChi} </p>
                                        </div>
                                    </div>
                                    <div className='mt-2 grid grid-cols-4 gap-4'>
                                        {cumRap.lichChieuPhim?.slice(0,10).map((lichChieu,index)=>{
                                           return <NavLink className='text-green-400' to={`/checkout/${lichChieu.maLichChieu}`} key={index}>
                                            {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                        </NavLink>
                                        })}
                                    </div>
                                </div>
                            })}
                        </>),
                    };
                })}
            />),
        },
        {
            key: '2',
            label: `Thông tin`,
            children: 'Thông tin phim',
        },
        {
            key: '3',
            label: `Đánh giá`,
            children: 'Đánh giá phim',
        },
    ]

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(layThongTinChiTietPhimAction(props.match.params.id))
    }, [dispatch, props.match.params])

    return (
        <div style={{ backgroundImage: `url(${filmDetail.hinhAnh})`, backgroundSize: 'cover', minHeight: '100vh' }}>
            <CustomCard
                style={{ minHeight: '100vh', paddingTop: '150px' }}
                effectColor="#fff" // required
                color="#fff" // default color is white
                blur={12} // default blur value is 10px
                borderRadius={0} // default border radius value is 10px
            >
                <div className='grid grid-cols-12'>
                    <div className='col-span-5 col-start-3'>
                        <div className='grid grid-cols-5'>
                            <img className='col-span-2' src={filmDetail.hinhAnh} alt={filmDetail.hinhAnh} />
                            <div className='ml-2 col-span-3 flex-col flex justify-center'>
                                <p className='mb-1'>{moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                                <p className='text-2xl'> {filmDetail.tenPhim} </p>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-4'>
                        <h1 style={{ marginLeft: '20%', color: 'yellow', fontWeight: 'bold', fontSize: 15 }}>Đánh giá</h1>
                        <h1 style={{ marginLeft: '5%' }} className="text-green-400 text-2xl"><Rate allowHalf value={filmDetail.danhGia / 2} style={{ color: '#78ed78', fontSize: 30 }} /></h1>
                        <div className={`c100 p${filmDetail.danhGia * 10} big`}>
                            <span>
                                {filmDetail.danhGia * 10}%
                            </span>
                            <div className="slice">
                                <div className="bar"></div>
                                <div className="fill"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-10 container mx-auto'>
                    <Tabs
                        className='bg-white p-5'
                        defaultActiveKey="1"
                        centered
                        items={arrTab}
                    />

                </div>
            </CustomCard>
        </div>
    )
}
