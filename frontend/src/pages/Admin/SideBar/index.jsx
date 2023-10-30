import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Nav from '../Nav';
import './sidebar.css';
import DropdownAdmin from '../../../components/DropdownHeaderAdmin';

const SideBar = (props) => {
    return (
        <>
            <header className='sticky-top'>
                <Nav />
                <nav
                    id='main-navbar'
                    className='navbar navbar-expand-lg navbar-light bg-white'>
                    <div className='container-fluid'>
                        <Link
                            className='navbar-brand'
                            to={ '/admin/product' }>
                            <img
                                src='https://image.hsv-tech.io/300x0/bbx/common/50a26167-9341-4be8-8aba-9682d3b4a916.webp'
                                height='50'
                                alt=''
                                loading='lazy'
                            />
                        </Link>
                        <ul className='navbar-nav ms-auto d-flex flex-row'>
                            <DropdownAdmin />
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default SideBar;
