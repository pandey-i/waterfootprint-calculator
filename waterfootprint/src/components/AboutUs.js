import React from 'react';
import './AboutUs.css';
import image from './6g0x_n5a2_221222.jpg';
import image1 from './i1.png';
import image2 from './i2.png';
import image3 from './i3.png';

const AboutUs = () => {
  return (
    <div className="about-us">
      <h1>About Us</h1>
      <img src={image} alt="Water Conservation" />
      <p>Welcome to the Water Footprint website! We are dedicated to raising awareness about water conservation and sustainability.</p>
      <p>Our mission is to educate individuals and communities about their water usage and promote practices that reduce water waste.</p>
      <p>We believe that every drop counts, and together we can make a significant impact.</p>
      <p>Join us in making a difference! Learn more about how you can help.</p>
      
      <div className="additional-section">
        <h2>Our Vision</h2>
        <p>We envision a world where water is used wisely and sustainably, ensuring availability for future generations.</p>
      </div>

      {/* New Image Section */}
      <div className="image-gallery">
        <img src={image1} alt="Description 1" className="circle-image" />
        <img src={image2} alt="Description 2" className="circle-image" />
        <img src={image3} alt="Description 3" className="circle-image" />
      </div>
    </div>
  );
};


export default AboutUs;
