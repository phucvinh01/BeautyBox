import React from 'react'
import Products from '../components/Products'
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Product = () => {

    const user = useSelector((state) => state.auth.login.currentUser);
    const products = useSelector((state) => state.product.products.data);
    return (
        <>
            <div className='container'>
                <div className='d-flex gap-3' style={{ height: "40px" }}>
                    <Link to={'/'} className='text-dark'>Home</Link>
                    <span>&gt;</span>
                    <p className='text-muted'>Product</p>
                </div>

                <div className='row'>
                    <div className='col-2'>

                    </div>
                    <div className='col-md-10 col-sm-12'>
                        <Products products={products} user={user} />
                    </div>

                </div>
            </div>
        </>
    )
}

export default Product