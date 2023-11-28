import React, { useEffect, useState } from 'react';
import { Link, NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import LoginPopup from '../LoginPopup';
import { useDispatch, useSelector } from 'react-redux';
import { Popover, Badge, Button, Dropdown } from 'antd';
import './header.scss';
import { logout } from '../../redux/api';
import SearchBox from '../Searchbox';
import { getCategory } from '../../axios/CategoryRequest';
import DrawerCart from '../DrawerCart';
import NavbarMobie from '../NavbarMobie';
import { FileSearchOutlined, IdcardOutlined, SmileOutlined } from '@ant-design/icons';
const Header = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const cate = useSelector((state) => state.category.category.data);
    const cart = useSelector((state) => state.cart.cart.data);
    const [users, setUsers] = useState('');
    const [hideCart, setHideCart] = useState(false);
    const [categories, setCategories] = useState([])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const accessToken = user?.accessToken;
    const id = user?._id;

    // useEffect(() => {
    //     let path = location.pathname;
    //     if (path.includes('/checkout')) {
    //         setHideCart(true)
    //     }
    // }, [location]);

    useEffect(() => {
        setUsers(user);
        if (cate && cate.length > 0) {
            setCategories(cate?.slice(0, 4))
        }
    }, [users, cate]);

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };


    const handleLogOut = () => {
        logout(dispatch, id, navigate, accessToken);
    };

    const items = [
        {
            key: '1',
            label: (
                <div style={ { borderBottom: "1px solid #333" } }>
                    <strong>
                        Hello { user?.lastName } !
                    </strong>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <Link to={ '/profile' }>
                    <p className='m-0'>Thông tin tài khoản</p>
                </Link>
            ),
            icon: <IdcardOutlined className='fs-3' />,
        },
        {
            key: '3',
            label: (
                <Link to={ '/order' }>
                    <p className='m-0'>Lịch sử đặt hàng</p>
                </Link>
            ),
            icon: <FileSearchOutlined className='fs-3' />
        },
        {
            key: '4',
            label: (
                <p onClick={ handleLogOut } className='m-0' style={ { borderTop: "1px solid #333", fontSize: 18 } }>Đăng xuất</p>
            ),

        },
    ];
    return (
        <>
            <header className='sticky-top header bg-white mt-3'>
                <div className='container-fluid'>
                    <div className='row pt-1'>
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className=' col-lg-2 col-md-5 col-sm-5'>
                                <img
                                    className='w-100'
                                    src='https://image.hsv-tech.io/300x0/bbx/common/50a26167-9341-4be8-8aba-9682d3b4a916.webp'></img>
                            </div>
                            <div className='col-lg-6 search'>
                                <SearchBox />
                            </div>
                            <div className='col-lg-2 '>
                                <div className='d-flex gap-0 justify-content-end gap-1' style={ { cursor: "pointer" } }>
                                    { user ? (
                                        <div >
                                            <Dropdown
                                                placement="bottom"
                                                trigger={ ['click'] }
                                                menu={ {
                                                    items,
                                                } }>
                                                <div className='d-flex gap-2 align-items-center'>
                                                    <i className='fa-solid fa-circle-user'></i>
                                                    <span className='mx-1 '>{ user.lastName }</span>
                                                </div>
                                            </Dropdown>
                                        </div>
                                    ) : (
                                        <div className='login'>
                                            <LoginPopup />
                                        </div>
                                    ) }
                                    <div hidden={ hideCart ? true : false } className='cart'>
                                        <Badge count={ cart?.items?.length } size='small'>
                                            <button
                                                className='btn'
                                                type='link'
                                                title='cart'
                                                to={ '/cart' }
                                                onClick={ showDrawer }>
                                                <span>
                                                    <i className='fa-solid fa-bag-shopping text-dark fs-5'></i>
                                                </span>
                                            </button>
                                        </Badge>
                                    </div>
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
                                    <li className='nav-item px-3' key={ 1 }>
                                        <NavLink
                                            className='btn border px-4 btn-category'
                                            to={ '/product' }>
                                            Tất cả sản phấm
                                        </NavLink>
                                    </li>
                                    <li className='nav-item px-3' key={ 2 }>
                                        <NavLink
                                            key={ "brand" }
                                            className='btn border px-4 btn-category'
                                            to={ '/brand' }>
                                            Brand
                                        </NavLink>
                                    </li>
                                    { categories &&
                                        categories.length > 0 &&
                                        categories.map((item, index) => {
                                            return (
                                                <>
                                                    <li
                                                        className='nav-item px-3'
                                                        key={ index }>
                                                        <NavLink
                                                            key={ index }
                                                            className='btn border px-4 btn-category'
                                                            to={ '/category/' + item.path }>
                                                            { item.name }
                                                        </NavLink>
                                                    </li>
                                                </>
                                            );
                                        }) }
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>

            <DrawerCart
                showDrawer={ showDrawer }
                onClose={ onClose }
                open={ open }
            />

        </>
    );
};

export default Header;
