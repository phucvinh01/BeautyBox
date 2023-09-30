import React from 'react'
import { NavLink } from 'react-router-dom'
import './navitem.css'
const NavItem = ({ icon, title, href }) => {
    return (
        <>
            <NavLink
                to={ href }
                className='list-group-item list-group-item-action py-2 ripple'
                aria-current='true'>
                <i className={ icon }></i>
                <span>{ title }</span>
            </NavLink>
        </>
    )
}

export default NavItem