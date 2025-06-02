import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <i className="fas fa-tint"></i>
            <span>Water Footprint</span>
          </div>
          <p className="footer-description">
            Empowering individuals and communities to understand and reduce their water footprint for a sustainable future.
          </p>
          <div className="social-links">
            <a href="https://www.facebook.com" className="social-link"><i className="fab fa-facebook"></i></a>

            <a href="https://www.twitter.com" className="social-link"><i className="fab fa-twitter"></i></a>

            <a href="https://www.instagram.com" className="social-link"><i className="fab fa-instagram"></i></a>

            <a href="https://www.linkedin.com" className="social-link"><i className="fab fa-linkedin"></i></a>

          </div>
        </div>

        {/* <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/waterfootprint">Calculator</Link></li>
            <li><Link to="/water-saving-tips">Tips</Link></li>
            <li><Link to="/news">News</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/donate">Donate</Link></li>
          </ul>
        </div> */}

        <div className="footer-section">
          <h3>Contact Info</h3>
          <ul className="contact-info">
            <li>
              <i className="fas fa-map-marker-alt"></i>
              <span>ABES Engineering College,Crossing Republik , Ghaziabad City</span>
            </li>
            <li>
              <i className="fas fa-phone"></i>
              <span>+(91) 9415840296 </span>
            </li>
            <li>
              <i className="fas fa-envelope"></i>
              <span>info@waterfootprint.com</span>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Newsletter</h3>
          <p>Subscribe to our newsletter for updates and water conservation tips.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Water Footprint. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="https://www.example.com/privacy">Privacy Policy</a>

          <a href="https://www.example.com/terms">Terms of Service</a>

          <a href="https://www.example.com/cookies">Cookie Policy</a>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
