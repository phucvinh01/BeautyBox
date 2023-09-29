import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import './SlideNewProduct.scss'
import { getListNewProduct } from '../../axios/ProductRequest';
import Product from '../Product'
import { useSelector } from 'react-redux';
import _ from 'lodash'
import { Link } from 'react-router-dom';

const SlideNewProduct = () => {


    const products = useSelector((state) => state.product.products.data);

    const data = products?.slice(10);

    const settings = {
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 5,
        speed: 1000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
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
        <div className='slide-newproduct' >
            <Slider {...settings}>
                {
                    data?.length && data.map((item, index) => {
                        return (
                            <>
                                <Product
                                    key={index}
                                    {...item}
                                />
                            </>
                        )
                    })
                }
            </Slider>
            <div className='d-flex mb-3'>
                <Link className='btn btn-outline-dark rounded-3 mx-auto'>Xem tất cả sản phẩm</Link>
            </div>
        </div >
    )
}

export default SlideNewProduct