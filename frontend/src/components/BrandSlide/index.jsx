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
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className='mb-3'>
            <div className='brand-slide'>
                <Slider { ...settings }>
                    {
                        brands?.length > 0 && brands.map((item, index) => {
                            return (
                                <div key={ index } className='slide-brand-item '>
                                    <img className='w-100' src={ item.logo }></img>
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