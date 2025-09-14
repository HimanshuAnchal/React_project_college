import React from "react";
import "../layout/navbar.scss";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <nav className="navbar">
                <div className="logo">
                    <img src="logo.png" alt="Website Logo" />
                </div>
                <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <NavLink to={"/"}>Home</NavLink>
                    <NavLink to={"/"}>About</NavLink>
                    <NavLink to={"/"}>Contact</NavLink>
                </div>
                <div className={`auth-buttons ${isMenuOpen ? 'active' : ''}`}>
                    <NavLink to={"/login"} className="btn login">Login</NavLink>
                    <NavLink to={"/signup"} className="btn signup">Sign Up</NavLink>
                </div>
                <div className="hamburger" onClick={toggleMenu}>
                    ☰
                </div>
            </nav>
            <Outlet />
        </div>

    );

};



export default Navbar;
