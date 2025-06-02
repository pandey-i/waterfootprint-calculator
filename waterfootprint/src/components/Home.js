import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import image1 from './save.png';  // Import your images
import image2 from './water.png';
import image3 from './i3.png';

const Home = () => {
  return (
    <div className="home">
      <h1>WHAT'S YOUR WATER FOOTPRINT?</h1>
      <p>It includes your household water use like: <br></br>Flush, Faucet, Car Wash, Gardening and many more.</p>
      
      <Link to="/form">
        <button className="footprint-button">Find your Footprint</button>
      </Link>

      {/* New Know More Section */}
      <div className="know-more-section">
        <h2>Know More</h2>
        <div className="image-gallery">
          <Link to="/water-saving-tips" className="image-item">
            <img src={image1} alt="Water Saving Tips" className="circle-image" />
            <p>How to save water</p>
          </Link>
          <Link to="/waterfootprint" className="image-item">
            <img src={image2} alt="Calculator" className="circle-image" />
            <p>Waterfootprint</p>
          </Link>
          <Link to="/news" className="image-item">
            <img src={image3} alt="News" className="circle-image" />
            <p>News and Articles</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
