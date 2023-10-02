import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import SideBar from './SideBar'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/api';
import LayoutAdmin from './Layout';
const Admin = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    /////////////////////////////////////////



    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user])

    const accessToken = user?.accessToken;
    const id = user?._id;

    const handleLogOut = () => {
        logout(dispatch, id, navigate, accessToken)
    }
    return (
        <>
            <SideBar handleLogOut={ handleLogOut }
                user={ user }
            />
            <Outlet />
        </>

    )
}

export default Admin