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
                            icon={ 'fa-brands fa-product-hunt fa-fw me-3' }
                            title={ 'Sản Phẩm' }
                            href={ '/admin/product' }

                        />
                        <NavItem
                            icon={ 'fas fa-chart-bar fa-fw me-3' }
                            title={ 'Orders' }
                            href={ '/admin/order' }

                        />

                        <NavItem
                            icon={ 'fas fa-users fa-fw me-3' }
                            title={ 'Nhân viên' }
                            href={ '/admin/employee' }

                        />
                        <NavItem
                            href={ '/admin/distributor' }
                            icon={ 'fa-solid fa-building-circle-arrow-right me-3' }
                            title={ 'Nhà phân phối' }
                        />
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Nav;
