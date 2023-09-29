import React, { useEffect, useState } from 'react';
import { Link, NavLink, Navigate, useNavigate } from 'react-router-dom';
import LoginPopup from '../LoginPopup';
import { useDispatch, useSelector } from 'react-redux';
import { Popover, Badge, Button } from 'antd';
import './header.scss';
import { logout } from '../../redux/api';
import SearchBox from '../Searchbox';
import { getCategory } from '../../axios/CategoryRequest';
import DrawerCart from '../DrawerCart';
import NavbarMobie from '../NavbarMobie';
const Header = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const cate = useSelector((state) => state.category.category.data);
    const cart = useSelector((state) => state.cart.cart.data);
    const [users, setUsers] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = user?.accessToken;
    const id = user?._id;


    useEffect(() => {
        setUsers(user);
    }, [users]);

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const categories = cate?.slice(0, 4);

    const handleLogOut = () => {
        logout(dispatch, id, navigate, accessToken);
    };

    const content = (
        <div>
            <button
                className='btn btn-dark'
                onClick={handleLogOut}>
                Log out
            </button>
        </div>
    );
    return (
        <>
            <div className='header-menu bg-gradientt'>
                <div className='menu-content'>
                    <div className='menu-item'><small>100% Chính hãng</small></div>
                    <div className='separator'></div>
                    <div className='menu-item'><small>Giảm 120k cho đơn thành hàng từ 999k</small></div>
                    <div className='separator'></div>
                    <div className='menu-item'><small>Giá tốt nhất</small></div>
                    <div className='separator'></div>
                    <div className='menu-item'><small>Mua và nhận tại cửa hàng</small> </div>
                </div>
            </div>
            <header className='sticky-sm-top sticky-top header bg-white mt-3'>
                <div className='container-fluid'>
                    <div className='row pt-1'>
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className=' col-lg-2 col-md-5 col-sm-5'>
                                <img
                                    className='w-100'
                                    src='https://image.hsv-tech.io/300x0/bbx/common/50a26167-9341-4be8-8aba-9682d3b4a916.webp'></img>
                            </div>
                            <div className='col-lg-6 hidden-sm'>
                                <SearchBox />
                            </div>
                            <div className='col-lg-2 hidden-sm'>
                                <div className='d-flex gap-0 justify-content-end gap-1'>
                                    {user ? (
                                        <Popover
                                            content={content}
                                            placement='bottom'
                                            trigger='hover'>
                                            <button className='btn btn-light' type='text'>{user.username}</button>
                                        </Popover>
                                    ) : (
                                        <LoginPopup />
                                    )}
                                    <Badge count={cart?.items?.length} size='small'>
                                        <button
                                            className='btn'
                                            type='link'
                                            title='cart'
                                            to={'/cart'}
                                            onClick={showDrawer}>
                                            <span>
                                                <i className='fa-solid fa-bag-shopping text-dark fs-5'></i>
                                            </span>
                                        </button>
                                    </Badge>

                                </div>
                            </div>
                            <div className='col-2 d-lg-none block-sm'>
                                <NavbarMobie />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-lg-12  navbar-reponsive mt-3'>
                    <nav className='navbar navbar-expand-lg'>
                        <div className='container-fluid'>
                            <div
                                className='collapse navbar-collapse'
                                id='navbarSupportedContent'>
                                <ul className='navbar-nav me-auto mb-2 mb-lg-0 mx-3'>
                                    <li className='nav-item px-3' key={"product"}>
                                        <NavLink
                                            key={"product"}
                                            className='btn border px-4 btn-category'
                                            to={'/product'}>
                                            Tất cả sản phấm
                                        </NavLink>
                                    </li>
                                    <li className='nav-item px-3' key={"brand"}>
                                        <NavLink
                                            key={"brand"}
                                            className='btn border px-4 btn-category'
                                            to={'/brand'}>
                                            Brand
                                        </NavLink>
                                    </li>
                                    {categories &&
                                        categories.length > 0 &&
                                        categories.map((item, index) => {
                                            return (
                                                <>
                                                    <li
                                                        className='nav-item px-3'
                                                        key={index}>
                                                        <NavLink
                                                            key={index}
                                                            className='btn border px-4 btn-category'
                                                            to={'/category/' + item.path}>
                                                            {item.name}
                                                        </NavLink>
                                                    </li>
                                                </>
                                            );
                                        })}
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>

            <DrawerCart
                showDrawer={showDrawer}
                onClose={onClose}
                open={open}
            />

        </>
    );
};

export default Header;
