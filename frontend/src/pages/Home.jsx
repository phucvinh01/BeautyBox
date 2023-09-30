import React from 'react'
import { useSelector } from 'react-redux';
import { Card, Col, Row } from 'antd';
import './Home.scss'
import Products from '../components/Products';
const Home = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const products = useSelector((state) => state.product.products.data);
    const cate = useSelector((state) => state.category.category.data);

    return (
        <>
            <main className='container mt-3'>
                {/* banener */ }
                <section>
                    <div className='row'>
                        <div className='col-lg-12 col-md-12 col-sm-12'>
                            <div className='mb-2 rounded'>
                                <img className='rounded w-100' src='https://i.imgur.com/ClGiS1A.jpg' ></img>
                            </div>
                            <div className='rounded'>
                                <img className='rounded w-100' src='https://i.imgur.com/lsNkd31.jpg' ></img>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <h3 className='text-center mb-3'>SẢN PHẨM</h3>
                    <Products products={ products } user={ user } />
                </section>
            </main>
        </>
    )
}

export default Home