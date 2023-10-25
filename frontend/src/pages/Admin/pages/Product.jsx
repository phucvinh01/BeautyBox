import React, { useEffect, useState } from 'react';
import PopupCreate from '../PopupCreate';
import Products from '../../../components/Products';
import { useSelector } from 'react-redux';
import { Space } from 'antd';
import TableProduct from '../../../components/TableProduct';


const ProductAdmin = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const products = useSelector((state) => state.product.products.data);
    return (
        <>
            <main >
                <div className="container pt-4">
                    <Space direction='vertical'>
                        <Space>
                            <PopupCreate />
                        </Space>
                        <TableProduct />
                    </Space>
                </div>
            </main>
        </>
    );
};

export default ProductAdmin;
