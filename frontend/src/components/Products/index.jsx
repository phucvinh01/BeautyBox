import React from 'react'
import Product from '../Product'
import { useSelector } from 'react-redux';
import { Empty } from 'antd';

const Products = (props) => {

    const { products, user } = props;
    return (
        <>
            <div className='container'>
                <div className='row'>
                    {
                        products && products.length > 0 ? products.map((product) => {
                            return (
                                <Product
                                    key={ product._id }
                                    { ...product }
                                    user={ user }
                                />
                            )
                        }) : <div style={ { height: 400 } } className='d-flex justify-content-center align-items-center'> <Empty /></div>
                    }
                </div>
            </div>
        </>
    )
}

export default Products