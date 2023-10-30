import React from 'react';
import { DownOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/api';
import { useNavigate } from 'react-router-dom';

const DropdownAdmin = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    console.log(user);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const id = user?._id;

    const handleLogOut = () => {
        logout(dispatch, id, navigate)
    }

    const items = [
        {
            label: <Button onClick={ handleLogOut } icon={ <LoginOutlined /> }>Đăng xuất</Button>,
            key: '3',
        },
    ];
    return (
        <Dropdown
            menu={ {
                items,
            } }
            trigger={ ['click'] }
        >
            <Button type='text' icon={ <UserOutlined /> }>
                <span>
                    Hello  <strong>{ user.name }</strong>
                </span>
            </Button>
        </Dropdown>
    )
};
export default DropdownAdmin;