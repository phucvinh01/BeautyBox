import React from 'react';
import NavItem from '../NavItem';

const Nav = () => {
    return (
        <>
            <nav
                id='sidebarMenu'
                className='collapse d-lg-block sidebar collapse bg-white'>
                <div className='position-sticky'>
                    <div className='list-group list-group-flush mx-3 mt-4'>
                        <NavItem
                            icon={'fa-brands fa-product-hunt fa-fw me-3'}
                            title={'Product'}
                            href={'/admin/product'}

                        />
                        <NavItem
                            icon={'fas fa-chart-bar fa-fw me-3'}
                            title={'Orders'}
                            href={'/admin/order'}

                        />

                        <NavItem
                            icon={'fas fa-users fa-fw me-3'}
                            title={'Users'}
                            href={'/admin/employee'}

                        />
                        <NavItem
                            href={'/admin/sale'}
                            icon={'fas fa-money-bill fa-fw me-3'}
                            title={'Sales'}
                        />
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Nav;
