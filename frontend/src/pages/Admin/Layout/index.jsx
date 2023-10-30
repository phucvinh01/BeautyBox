import React, { useEffect } from 'react'
import SideBar from '../SideBar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/api'
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

    return (
        <>
            <SideBar />
            <Outlet />
        </>

    )
}

export default LayoutAdmin