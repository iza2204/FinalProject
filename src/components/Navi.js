import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './navi.scss'

const NavigationBar = () => {
    return (
        <nav className="navigation-bar">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <ul className="navigation-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/services">Calendar</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavigationBar;