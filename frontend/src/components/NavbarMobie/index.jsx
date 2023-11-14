import React, { useState } from 'react';
import { Button, Drawer, Dropdown, Space } from 'antd';
import { FileSearchOutlined, IdcardOutlined, MenuOutlined } from '@ant-design/icons';
import SearchBox from '../Searchbox';
import LoginPopup from '../LoginPopup';
import DrawerCart from '../DrawerCart';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/api';
import { useNavigate, Link } from 'react-router-dom';
const NavbarMobie = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login.currentUser);

    const accessToken = user?.accessToken;
    const id = user?._id;
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
                    <small className='text-muted'>Tài khoản, đơn hàng, địa chỉ giao nhận, mật khẩu</small>
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
            <Button style={ {
                backgroundColor: "transparent", color: "black"
            } } onClick={ showDrawer }>
                <MenuOutlined />
            </Button>
            <Drawer title="Menu" placement="right" onClose={ onClose } open={ open } className='drawer-narbar-mobie'>
                <SearchBox />
                { user ? (
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
                ) : (
                    <LoginPopup />
                ) }

            </Drawer>
        </>
    );
};
export default NavbarMobie;