import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MultipleRowSlick from '../../components/RSlick/MultipleRowSlick'
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimActions'
import { layDanhSachHeThongRapAction } from '../../redux/actions/QuanLyRapActions'
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel'
import HomeMenu from './HomeMenu/HomeMenu'

export default function Home(props) {

    const { arrFilm } = useSelector(state => state.QuanLyPhimReducer)

    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(layDanhSachPhimAction())
        dispatch(layDanhSachHeThongRapAction())
    }, [dispatch])

    return (
        <>
            <HomeCarousel />
            <div className='container mx-auto pb-8'>


                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-16 mx-auto">
                        <MultipleRowSlick arrFilm={arrFilm} />
                    </div>
                </section>

                <HomeMenu heThongRapChieu={heThongRapChieu} />
            </div>
        </>
    )
}
