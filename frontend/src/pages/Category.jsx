import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getProductByCategory } from '../axios/ProductRequest';
import { useSelector } from 'react-redux';
import Products from '../components/Products'
import { Breadcrumb } from 'antd';

const Category = () => {

    const [products, setProducts] = useState([]);

    let path = useParams();

    const getProducts = async (path) => {
        let res = await getProductByCategory(path.path)
        if (res) {
            setProducts(res)
        }
    }

    useEffect(() => {
        getProducts(path);
    }, [path])


    return (
        <>
            <div className='container '>
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
                    <div className='col-10'>
                        <Products products={ products } />
                    </div>

                </div>
            </div>
        </>
    )
}

export default Category