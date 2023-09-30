import React, { useEffect, useState } from 'react';
import PopupCreate from '../PopupCreate';
import Products from '../../../components/Products';
import { useSelector } from 'react-redux';


const ProductAdmin = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const products = useSelector((state) => state.product.products.data);
    return (
        <>
            <main style={{ marginTop: "58px", minHeight: "100vh" }}>
                <div className="container pt-4">
                    <div className='row'>
                        <div className='col-lg-12 col-md-12 col-sm-6 text-end mb-3' >
                            <PopupCreate />
                        </div>
                    </div>
                    <Products products={products} user={user} />
                </div>
            </main>
        </>
    );
};

export default ProductAdmin;
