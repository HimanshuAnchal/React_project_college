import React, { useEffect, useState } from "react";
import "../layout/navbar.scss";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Listen to login/logout changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("Logged out successfully 🚪");
            navigate("/login");
            closeMenu(); // close menu after logout
        } catch (err) {
            console.error("Logout failed:", err.message);
        }
    };

    const getNavLinkClass = ({ isActive }) => (isActive ? "active-link" : "");

    return (
        <div>
            <nav className="navbar">
                <div className="logo">
                    <img src="logo.png" alt="Website Logo" />
                </div>

                <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
                    {!user && (
                        <NavLink to={"/"} onClick={closeMenu} className={getNavLinkClass}>
                            Home
                        </NavLink>
                    )}
                    <NavLink to={"/about"} onClick={closeMenu} className={getNavLinkClass}>
                        About
                    </NavLink>
                    <NavLink to={"/contact"} onClick={closeMenu} className={getNavLinkClass}>
                        Contact
                    </NavLink>
                    {user && (
                        <NavLink to={"/student"} onClick={closeMenu} className={getNavLinkClass}>
                            Records
                        </NavLink>
                    )}
                </div>

                <div className={`auth-buttons ${isMenuOpen ? "active" : ""}`}>
                    {user ? (
                        <>
                            <div className="user-info">
                                {user.photoURL && (
                                    <img
                                        src={user.photoURL}
                                        alt="Profile"
                                        className="profile-pic"
                                    />
                                )}
                                <span className="welcome-text">
                                    Hi, {user.displayName ? user.displayName : "User"}
                                </span>
                            </div>
                            <button onClick={handleLogout} className="btn login">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to={"/login"} onClick={closeMenu} className="btn login">
                                Login
                            </NavLink>
                            <NavLink to={"/signup"} onClick={closeMenu} className="btn signup">
                                Sign Up
                            </NavLink>
                        </>
                    )}
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
