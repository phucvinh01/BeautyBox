import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import { getBrand } from '../../axios/BrandRequest';
import './brandSilder.scss'
import { useSelector } from 'react-redux';
const BrandSlider = () => {

    const brands = useSelector((state) => state.brand.brand.data);

    const settings = {
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 4,
        speed: 1000,
        cssEase: "linear",
    };

    return (
        <div className='mb-3'>
            <div className='brand-slide'>
                <Slider {...settings}>
                    {
                        brands?.length > 0 && brands.map((item, index) => {
                            return (
                                <div key={index} className='slide-brand-item'>
                                    <img src={item.logo}></img>
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>
        </div>
    )
}

export default BrandSlider