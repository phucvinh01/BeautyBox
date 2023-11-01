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
    const [data, setData] = useState([])
    useEffect(() => {
        if (products) {
            setData(products.length > 0 && products?.slice(5))
        }
    }, [products])

    const settings = {
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 5,
        speed: 1000,
        cssEase: "linear"
    };
    return (
        <div className='slide-newproduct' >
            <Slider { ...settings }>
                {
                    data?.length && data.map((item, index) => {
                        return (
                            <div key={ index }>
                                <Product
                                    key={ index }
                                    { ...item }
                                />
                            </div>
                        )
                    })
                }
            </Slider>
            <div className='d-flex mb-3'>
                <Link to={ '/product' } className='btn btn-outline-dark rounded-3 mx-auto'>Xem tất cả sản phẩm</Link>
            </div>
        </div >
    )
}

export default SlideNewProduct