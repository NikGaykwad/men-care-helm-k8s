import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import '../styles/components.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [user, setUser] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/');
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container nav-content">
                <Link to="/" className="logo">MEN'S GROOMING</Link>
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/shop">Shop</Link>
                    <Link to="/about">About Us</Link>
                </div>
                <div className="nav-actions">
                    <Link to="/cart" className="icon-link"><FaShoppingCart /></Link>
                    {user ? (
                        <>
                            <Link to="/profile" className="icon-link"><FaUser /></Link>
                            <button onClick={logout} className="btn-text">Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="btn btn-primary sm">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
