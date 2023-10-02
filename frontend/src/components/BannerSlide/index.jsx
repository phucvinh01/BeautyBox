import React from 'react'
import Slider from "react-slick";
import './slider.scss'
const Slide = () => {
    const settings = {
        autoplay: true,
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 1000,
        autoplaySpeed: 1500,
        cssEase: "linear"
    };
    return (
        <>
            <div className='position-relative'>
                <Slider {...settings}>
                    <div>
                        <img className='w-100 rounded  ' src='https://image.hsv-tech.io/1920x0/bbx/common/1c1722ab-40d6-481c-911d-cbbb49422f2d.webp'></img>
                    </div>
                    <div>
                        <img className='w-100 rounded ' src='https://image.hsv-tech.io/1920x0/bbx/common/7687bcbd-0804-4617-8ecf-7a373c171997.webp'></img>

                    </div>
                    <div>
                        <img className='w-100 rounded ' src='https://image.hsv-tech.io/1920x0/bbx/common/1db78a05-68c0-45a6-9290-fe71a4d3862d.webp'></img>

                    </div>
                    <div>
                        <img className='w-100 rounded ' src='https://image.hsv-tech.io/1920x0/bbx/common/088ade3c-204d-4850-8f50-fc3e437772d6.webp'></img>
                    </div>
                </Slider>
            </div>
        </>
    )
}

export default Slide