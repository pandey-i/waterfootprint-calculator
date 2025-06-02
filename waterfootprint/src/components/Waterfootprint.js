import React from 'react';
import { Link } from 'react-router-dom';
import './Waterfootprint.css';

const Waterfootprint = () => {
  return (
    <div className="waterfootprint-page">
      <div className="hero-section">
        <h1>Understanding Water Footprint</h1>
        <p>Discover how your daily activities impact water resources and learn ways to make a difference.</p>
      </div>

      <div className="content-section">
        <div className="info-card">
          <div className="card-icon">
            <i className="fas fa-tint"></i>
          </div>
          <h2>What is Water Footprint?</h2>
          <p>A water footprint measures the total volume of freshwater used to produce the goods and services consumed by an individual, community, or business. It includes both direct water use (like drinking, washing, and irrigation) and indirect water use (water used to produce food, energy, and other products).</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <i className="fas fa-calculator"></i>
            <h3>Calculate Your Impact</h3>
            <p>Use our interactive calculator to measure your personal water footprint based on your daily activities and consumption patterns.</p>
          </div>

          <div className="feature-card">
            <i className="fas fa-chart-line"></i>
            <h3>Track Progress</h3>
            <p>Monitor your water consumption over time and see how your conservation efforts make a difference.</p>
          </div>

          <div className="feature-card">
            <i className="fas fa-lightbulb"></i>
            <h3>Get Recommendations</h3>
            <p>Receive personalized tips and suggestions to reduce your water footprint based on your usage patterns.</p>
          </div>
        </div>

        <div className="impact-section">
          <h2>Why Water Footprint Matters</h2>
          <div className="impact-grid">
            <div className="impact-item">
              <div className="impact-number">70%</div>
              <p>of global water use is for agriculture</p>
            </div>
            <div className="impact-item">
              <div className="impact-number">20%</div>
              <p>of water is used by industry</p>
            </div>
            <div className="impact-item">
              <div className="impact-number">10%</div>
              <p>is used for domestic purposes</p>
            </div>
          </div>
        </div>

        <div className="how-it-works">
          <h2>How Our Calculator Works</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Input Your Data</h3>
              <p>Enter information about your daily water usage in various categories.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Analysis</h3>
              <p>Our system analyzes your data using advanced algorithms to calculate your water footprint.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Results</h3>
              <p>Get detailed insights into your water consumption and personalized recommendations.</p>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <h2>Ready to Calculate Your Water Footprint?</h2>
          <p>Take our comprehensive assessment to understand your water usage and get personalized recommendations.</p>
          <Link to="/form">
             <button className="cta-button">Start Calculation</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Waterfootprint; 