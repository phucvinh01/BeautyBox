import React from 'react'
import Product from '../Product'
import { useSelector } from 'react-redux';

const Products = (props) => {

    const { products, user } = props;
    return (
        <>
            <div className='container'>
                <div className='row'>
                    {
                        products && products.length > 0 && products.map((product) => {
                            return (
                                <Product
                                    key={product._id}
                                    {...product}
                                    user={user}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Products