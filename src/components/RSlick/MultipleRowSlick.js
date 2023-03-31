import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU } from "../../redux/types/QuanLyPhimType";
import FilmFlip from "../Film/FilmFlip";
import styleSlick from './MultipleRowSlick.module.css'

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-prev']}`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-prev']}`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
}


export default function MultipleRowSlick (props) {

    const dispatch = useDispatch()

    const {dangChieu,sapChieu} = useSelector(state => state.QuanLyPhimReducer)

    const renderFilm = () => {
        return props.arrFilm.slice(0,12).map((item, index) => {
            return <div className="mt-2" key={index}>
                <FilmFlip item={item} />
            </div>
        })
    }

    let activeClassDC = dangChieu===true ? 'active_Film' : 'none_active_Film';

    let activeClassSC = sapChieu === true ? 'active_Film' : 'none_active_Film';
    
        const settings = {
            className: "center",
            centerMode: true,
            infinite: true,
            centerPadding: "60px",
            slidesToShow: 2,
            speed: 500,
            rows: 2,
            slidesPerRow: 2,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        }
        return (
            <div>
                <button onClick={()=>{
                    dispatch({type:SET_FILM_DANG_CHIEU})
                }} className={`${styleSlick[activeClassDC]} px-8 py-3 font-semibold rounded  border-gray-800 border mr-2`}>PHIM ĐANG CHIẾU</button>
                <button onClick={()=>{
                    dispatch({type:SET_FILM_SAP_CHIEU})
                }} className={`${styleSlick[activeClassSC]} px-8 py-3 font-semibold rounded  border-gray-800 border`}>PHIM SẮP CHIẾU</button>
                <Slider {...settings}>
                    {renderFilm()}
                </Slider>
            </div>
        );
    
}