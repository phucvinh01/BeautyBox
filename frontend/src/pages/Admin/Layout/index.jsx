import React from 'react'
import SideBar from '../SideBar'
import { Outlet } from 'react-router-dom'

const LayoutAdmin = () => {
    return (
        <>
            <SideBar />
            <Outlet />
        </>

    )
}

export default LayoutAdmin