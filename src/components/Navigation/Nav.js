// import React from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { UserContext } from '../../context/UserContext';
import React, { useContext } from 'react';
import { useLocation } from "react-router-dom";
import './Nav.scss'


const Nav = (props) => {
    const { user } = useContext(UserContext);
    const location = useLocation();

    if (user && user.Authenticated === true || location.pathname === "/") {
        return (
            <div className="topnav">
                <NavLink className="" to="/" exact>Home</NavLink>
                <NavLink to="/users">Users</NavLink>
                <NavLink to="/contact">Contact</NavLink>
                <NavLink to="/about">About</NavLink>
            </div>
        );
    } else {
        return <></>
    }
}

export default Nav;