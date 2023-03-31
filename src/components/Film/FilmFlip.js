import React from 'react'
import './FilmFlip.css'
import { PlayCircleOutlined } from '@ant-design/icons'
// import {history} from '../../App'
import { NavLink } from 'react-router-dom'

export default function FilmFlip(props) {

    const { item } = props

    return (
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img src={item.hinhAnh} alt='Avatar' style={{ width: 180, height: 180 }} />
                </div>
                <div className="flip-card-back">
                    <div style={{ position: 'absolute', top: 0, left: 0 }} >
                        <img src={item.hinhAnh} alt="Avatar" style={{ width: 180, height: 180 }} />
                    </div>
                    <div className="w-full h-full" style={{ position: 'absolute', backgroundColor: 'rgba(0,0,0,.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div>
                            <div className="rounded-full cursor-pointer"><PlayCircleOutlined style={{ fontSize: '50px' }} /></div>
                            <div className="text-xl mt-2 font-bold">{item.tenPhim}</div>
                        </div>
                    </div>
                </div>
            </div>
            <NavLink to={`/detail/${item.maPhim}`} className="block text-center rounded-lg cursor-pointer py-2 bg-indigo-300 my-2 text-success-50 font-bold">ĐẶT VÉ</NavLink>
        </div>

    )
}
