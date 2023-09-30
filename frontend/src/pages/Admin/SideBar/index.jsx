import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Nav from '../Nav';
import './sidebar.css';

const SideBar = (props) => {
    const { handleLogOut, user } = props;
    return (
        <>
            <header>
                <Nav />

                <nav
                    id='main-navbar'
                    className='navbar navbar-expand-lg navbar-light bg-white fixed-top'>
                    <div className='container-fluid'>
                        <button
                            className='navbar-toggler'
                            type='button'
                            data-bs-toggle='collapse'
                            data-bs-target='#sidebarMenu'
                            aria-controls='sidebarMenu'
                            aria-expanded='false'
                            aria-label='Toggle navigation'>
                            <i className='fas fa-bars'></i>
                        </button>
                        <Link
                            className='navbar-brand'
                            to={'/admin'}>
                            <img
                                src='https://image.hsv-tech.io/300x0/bbx/common/50a26167-9341-4be8-8aba-9682d3b4a916.webp'
                                height='40'
                                alt=''
                                loading='lazy'
                            />
                        </Link>

                        <ul className='navbar-nav ms-auto d-flex flex-row'>
                            <li className='nav-item dropdown'>
                                <a
                                    className='nav-link me-3 me-lg-0 dropdown-toggle hidden-arrow'
                                    href='#'
                                    id='navbarDropdownMenuLink'
                                    role='button'
                                    data-bs-toggle='dropdown'
                                    aria-expanded='false'>
                                    <i className='fas fa-bell'></i>
                                    <span className='badge rounded-pill badge-notification bg-danger'>
                                        1
                                    </span>
                                </a>
                                <ul
                                    className='dropdown-menu dropdown-menu-end'
                                    aria-labelledby='navbarDropdownMenuLink'>
                                    <li>
                                        <a
                                            className='dropdown-item'
                                            href='#'>
                                            Some news
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className='dropdown-item'
                                            href='#'>
                                            Another news
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className='dropdown-item'
                                            href='#'>
                                            Something else here
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className='nav-item dropdown'>
                                <a
                                    className='nav-link hidden-arrow d-flex align-items-center'
                                    href='#'
                                    id='navbarDropdownMenuLink'
                                    role='button'
                                    data-bs-toggle='dropdown'
                                    aria-expanded='false'>
                                    <img
                                        src='https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg'
                                        className='rounded-circle'
                                        height='22'
                                        alt=''
                                        loading='lazy'
                                    />
                                </a>
                                <ul
                                    className='dropdown-menu dropdown-menu-end'
                                    aria-labelledby='navbarDropdownMenuLink'>
                                    <li>
                                        <a
                                            className='dropdown-item'
                                            href='#'>
                                            My profile
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className='dropdown-item'
                                            href='#'>
                                            Settings
                                        </a>
                                    </li>
                                    <li>
                                        <button
                                            className='btn'
                                            onClick={handleLogOut}>
                                            Log out
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default SideBar;
