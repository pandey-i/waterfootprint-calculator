import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <i className="fas fa-tint"></i>
          <span>Water Footprint</span>
        </Link>

        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
            <i className="fas fa-home"></i>
            <span>Home</span>
          </Link>
          <Link to="/form" className="nav-link" onClick={() => setIsOpen(false)}>
            <i className="fas fa-calculator"></i>
            <span>Calculator</span>
          </Link>
          <Link to="/water-saving-tips" className="nav-link" onClick={() => setIsOpen(false)}>
            <i className="fas fa-lightbulb"></i>
            <span>Tips</span>
          </Link>
          <Link to="/news" className="nav-link" onClick={() => setIsOpen(false)}>
            <i className="fas fa-newspaper"></i>
            <span>News</span>
          </Link>
          <Link to="/about" className="nav-link" onClick={() => setIsOpen(false)}>
            <i className="fas fa-info-circle"></i>
            <span>About</span>
          </Link>
          <Link to="/contact" className="nav-link contact-link" onClick={() => setIsOpen(false)}>
            <i className="fas fa-envelope"></i>
            <span>Contact</span>
          </Link>
          <Link to="/donate" className="nav-link donate-link" onClick={() => setIsOpen(false)}>
            <i className="fas fa-heart"></i>
            <span>Donate</span>
          </Link>
        </div>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;