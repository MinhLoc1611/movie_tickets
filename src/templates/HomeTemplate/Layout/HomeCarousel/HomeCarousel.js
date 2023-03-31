import React, { useEffect } from 'react'
import { Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { getCarouselAction } from '../../../../redux/actions/CarouselActions';

const contentStyle = {
    height: '600px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundSize:'cover',
};

export default function HomeCarousel(props) {

    const { arrImg } = useSelector(state => state.CarouselReducer)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getCarouselAction())
    },[dispatch])

    const renderImg = () => {
        return arrImg.map((item, index) => {
            return <div key={index}>
                <div style={{...contentStyle,backgroundImage:`url(${item.hinhAnh})`}}>
                    <img src={item.hinhAnh} className='opacity-0' alt={item.hinhAnh} />
                </div>
            </div>
        })
    }

    return (
        <Carousel effect="fade">
            {renderImg()}

        </Carousel>
    )
}
