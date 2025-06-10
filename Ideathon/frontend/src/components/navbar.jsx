import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/component.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/assets/logo.png" alt="SecuScan Logo" />
      </div>
      <ul className="navbar-links">
        <li><Link to="/" className="nav-button">Home</Link></li>
        <li><Link to="/about" className="nav-button">About</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
