import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { datGheAction, datVeAction, layChiTietPhongVeAction } from '../../redux/actions/QuanLyDatVeActions';
import style from './Checkout.module.css'
import './Checkout.css'
import { CloseOutlined, UserOutlined, CheckOutlined, SmileOutlined, HomeOutlined } from '@ant-design/icons';
import { CHUYEN_TAB_ACTIVE, DAT_GHE } from '../../redux/types/QuanLyDatVeType';
import _ from 'lodash'
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe';
import { Tabs } from 'antd';
import { layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';
import moment from 'moment';
import { connection } from '../../index'
import {history} from '../../App'
import { TOKEN, USER_LOGIN } from '../../util/settings/confis';
import {NavLink} from 'react-router-dom'

function Checkout(props) {

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
    const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } = useSelector(state => state.QuanLyDatVeReducer);
    const dispatch = useDispatch()

    useEffect(() => {
        const action = layChiTietPhongVeAction(props.match.params.id)
        dispatch(action)

        connection.on('datVeThanhCong',()=>{
            dispatch(action)
        })

        connection.invoke('loadDanhSachGhe',props.match.params.id)

        connection.on('loadDanhSachGheDaDat', (dsGheKhachDat) => {
            dsGheKhachDat = dsGheKhachDat.filter(item => item.taiKhoan !== userLogin.taiKhoan)

            let arrGheKhachDat = dsGheKhachDat.reduce((result, item, index) => {
                let arrGhe = JSON.parse(item.danhSachGhe)
                return [...result, ...arrGhe];
            }, [])

            arrGheKhachDat = _.uniqBy(arrGheKhachDat, 'maGhe')
            dispatch({
                type: DAT_GHE,
                arrGheKhachDat
            })

            window.addEventListener('beforeunload', clearGhe)

            return () => {
                clearGhe()
                window.removeEventListener('beforeunload', clearGhe)
            }
        })
    
    }, [])

    
    const clearGhe = function (event) {
        connection.invoke('huyDat', userLogin.taiKhoan, props.match.params.id)
    }

    const { thongTinPhim, danhSachGhe } = chiTietPhongVe;

    const renderSeats = () => {
        return danhSachGhe.map((ghe, index) => {

            let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
            let classGheDaDat = ghe.daDat === true ? 'gheDaDat' : '';

            let indexGheDD = danhSachGheDangDat.findIndex(gheDD => gheDD.maGhe === ghe.maGhe)
            if (indexGheDD !== -1) {
                classGheDaDat = 'gheDangDat'
            }

            let classGheKhachDat = '';
            let indexGheKD = danhSachGheKhachDat.findIndex(gheKD => gheKD.maGhe === ghe.maGhe)
            if (indexGheKD !== -1) {
                classGheKhachDat = 'gheKhachDat'
            }

            let classGheDaDuocDat = '';
            if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
                classGheDaDuocDat = 'gheDaDuocDat'
            }

            return <Fragment key={index}>
                <button onClick={() => {
                    dispatch(datGheAction(ghe, props.match.params.id))
                }} disabled={ghe.daDat || classGheKhachDat !== ''} className={`ghe ${classGheKhachDat} ${classGheDaDuocDat} ${classGheVip} ${classGheDaDat}`}>
                    {ghe.daDat ? classGheDaDuocDat !== '' ? <UserOutlined /> : <CloseOutlined /> : classGheKhachDat !== '' ? <SmileOutlined /> : ghe.stt}
                </button>
                {(index + 1) % 16 === 0 ? <br /> : ''}
            </Fragment>
        })
    }

    return (
        <div className='min-h-screen'>
            <div className='grid grid-cols-4 min-h-screen'>
                <div className='col-span-3 container mx-auto'>
                    <div className='flex flex-col items-center mt-5'>
                        <div className='bg-black w-full h-3'>
                        </div>
                        <div className={`${style['trapezoid']} text-center`} >
                            <h3 className="mt-2 text-xl text-black">Màn hình</h3>
                        </div>
                        <div>
                            {renderSeats()}
                        </div>
                    </div>
                    <div className='mt-5 flex justify-center'>
                        <table className='divide-y divide-gray-200 w-full text-center'>
                            <thead className='bg-gray-50 p-5'>
                                <tr>
                                    <th>Ghế chưa đặt</th>
                                    <th>Ghế đang đặt</th>
                                    <th>Ghế vip</th>
                                    <th>Ghế đã đặt</th>
                                    <th>Ghế mình đặt</th>
                                    <th>Ghế khách đang đặt</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-gray-200'>
                                <tr>
                                    <td><button className='ghe text-center'> <CheckOutlined /> </button></td>
                                    <td><button className='ghe gheDangDat text-center'><CheckOutlined /></button></td>
                                    <td><button className='ghe gheVip text-center'><CheckOutlined /></button></td>
                                    <td><button className='ghe gheDaDat text-center'><CloseOutlined /></button></td>
                                    <td><button className='ghe gheDaDuocDat text-center'><UserOutlined /></button></td>
                                    <td><button className='ghe gheKhachDat text-center'><SmileOutlined /></button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='col-span-1 px-2'>
                    <h3 className='text-green-400 text-center text-2xl'>
                        {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                            return tongTien += ghe.giaVe
                        }, 0).toLocaleString()}đ
                    </h3>
                    <hr />
                    <h3 className='text-xl mt-2'> {thongTinPhim.tenPhim} </h3>
                    <p>Địa điểm: {thongTinPhim.tenCumRap} - {thongTinPhim.tenRap} </p>
                    <p>Ngày chiếu: {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu} </p>
                    <hr />
                    <div className='flex justify-between my-4'>
                        <div>
                            <span className='text-red-400 text-lg'>Ghế</span>
                            {_.sortBy(danhSachGheDangDat, ['stt']).map((gheDD, index) => {
                                return <span key={index} className='text-green-500'> {gheDD.stt} </span>
                            })}
                        </div>
                        <div>
                            <span className='text-green-400 text-lg'>
                                {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                                    return tongTien += ghe.giaVe
                                }, 0).toLocaleString()}đ
                            </span>
                        </div>
                    </div>
                    <hr />
                    <div className='my-4'>
                        <i className='text-gray-400'>Email</i> <br />
                        {userLogin.email}
                    </div>
                    <hr />
                    <div className='my-4'>
                        <i className='text-gray-400'>Phone</i> <br />
                        {userLogin.soDT}
                    </div>
                    <hr />
                    <div onClick={() => {
                        const thongTinDatVe = new ThongTinDatVe();
                        thongTinDatVe.maLichChieu = props.match.params.id
                        thongTinDatVe.danhSachVe = danhSachGheDangDat
                        dispatch(datVeAction(thongTinDatVe))

                    }} className='bg-green-500 text-white w-full cursor-pointer text-center py-3 font-bold text-2xl rounded-lg'>
                        ĐẶT VÉ
                    </div>
                </div>
            </div>
        </div>
    )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (props) {

    const { tabActive } = useSelector(state => state.QuanLyDatVeReducer)

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)

    const dispatch = useDispatch()

    useEffect(()=>{
        return () =>{
            dispatch({
                type:CHUYEN_TAB_ACTIVE,
                number:'1'
            })
        }
    },[])

    return <div className='p-5'>
        <Tabs
            defaultActiveKey='1'
            activeKey={tabActive}
            tabBarExtraContent={<>
                <button onClick={()=>{
            history.push('/profile')
        }}> <div className="flex uppercase w-12 h-12 justify-center items-center ml-5 text-2xl rounded-full bg-red-200">{userLogin.taiKhoan.substr(0,1)}</div>Hello ! {userLogin.taiKhoan}</button> <button onClick={()=>{
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(TOKEN);
            history.push('/home');
            window.location.reload();
        }} className="text-blue-800 ml-2">Đăng xuất</button>
            </>}
            items={[
                {
                    key: '1',
                    label: (<button onClick={() => {
                        dispatch({
                            type: CHUYEN_TAB_ACTIVE,
                            number: '1'
                        })
                    }}>01 CHỌN GHẾ & THANH TOÁN</button>),
                    children: (<Checkout {...props} />),
                },
                {
                    key: '2',
                    label: (<button onClick={() => {
                        dispatch({
                            type: CHUYEN_TAB_ACTIVE,
                            number: '2'
                        })
                    }}>02 KẾT QUẢ ĐẶT VÉ</button>),
                    children: (<KetQuaDatVe {...props} />),
                },
                {
                    key:'3',
                    label:(<NavLink to='/home'> <HomeOutlined className='text-xl ml-1'/> </NavLink>)
                }
            ]}
        />
    </div>
}

function KetQuaDatVe(props) {

    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(layThongTinNguoiDungAction())
    }, [dispatch])

    console.log(thongTinNguoiDung)

    const renderTicketItem = () => {
        return thongTinNguoiDung.thongTinDatVe.map((ticket, index) => {
            const seats = _.first(ticket.danhSachGhe)
            return <div key={index} className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                    <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={ticket.hinhAnh} />
                    <div className="flex-grow">
                        <h2 className="text-gray-900 title-font font-medium">{ticket.tenPhim}</h2>
                        <p className="text-gray-500 mb-0">{moment(ticket.ngayDat).format('DD.MM.yyyy')}</p>
                        <p className='mb-0'>Địa điểm: {seats.tenHeThongRap}</p>
                        <p className='mb-0'>Tên rạp: {seats.tenCumRap} - Ghế {ticket.danhSachGhe.map((ghe, index) => { return <span className='text-green-400' key={index}> {ghe.tenGhe} </span> })} </p>
                    </div>
                </div>
            </div>
        })
    }

    return <div className='container mx-auto'>
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-5 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-purple-600">Lịch sử đặt vé khách hàng</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Hãy xem thông tin địa điểm và thời gian để xem phim vui vẻ bạn nhé</p>
                </div>
                <div className="flex flex-wrap -m-2">
                    {renderTicketItem()}
                </div>
            </div>
        </section>

    </div>
}