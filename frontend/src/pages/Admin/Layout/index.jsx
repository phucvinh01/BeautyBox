import React, { useEffect } from 'react'
import SideBar from '../SideBar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/api';

const LayoutAdmin = () => {
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
            <SideBar handleLogOut={handleLogOut}
                user={user} />
            <Outlet />
        </>

    )
}

export default LayoutAdmin