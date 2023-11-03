import React from 'react'
import Products from '../components/Products'
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
const Product = () => {

    const user = useSelector((state) => state.auth.login.currentUser);
    const products = useSelector((state) => state.product.products.data);
    return (
        <>
            <Helmet>
                <title>Beauty Box | Tất cả sản phẩm</title>
            </Helmet>
            <div className='container'>
                <Breadcrumb className='mb-3'
                    items={ [
                        {
                            title: <Link to={ '/' }>Trang chủ</Link>,
                        },
                        {
                            title: <span>Sản phẩm</span>,
                        },
                    ] }
                />

                <div className='row'>
                    <div className='col-2'>

                    </div>
                    <div className='col-10' style={ { minHeight: '100vh' } }>
                        <Products products={ products } user={ user } />
                    </div>

                </div>
            </div>
        </>
    )
}

export default Product