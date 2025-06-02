import React, { useState } from 'react';
import './WaterSavingTips.css';

const WaterSavingTips = () => {
  const [activeCategory, setActiveCategory] = useState('bathroom');

  const categories = {
    bathroom: {
      title: 'Bathroom',
      icon: 'fa-bath',
      tips: [
        {
          title: 'Shower',
          impact: 'Save up to 75 liters per shower',
          suggestions: [
            'Take shorter showers (aim for 5 minutes)',
            'Install a low-flow showerhead',
            'Turn off water while lathering',
            'Use a shower timer to track time'
          ]
        },
        {
          title: 'Toilet',
          impact: 'Save up to 19 liters per flush',
          suggestions: [
            'Install a dual-flush toilet',
            'Place a water displacement device in the tank',
            'Fix leaky toilets immediately',
            'Don\'t use toilet as a wastebasket'
          ]
        },
        {
          title: 'Faucet',
          impact: 'Save up to 8 liters per minute',
          suggestions: [
            'Install aerators on faucets',
            'Turn off water while brushing teeth',
            'Fix dripping faucets',
            'Use cold water when possible'
          ]
        }
      ]
    },
    kitchen: {
      title: 'Kitchen',
      icon: 'fa-kitchen-set',
      tips: [
        {
          title: 'Dishwashing',
          impact: 'Save up to 38 liters per load',
          suggestions: [
            'Run dishwasher only when full',
            'Scrape dishes instead of rinsing',
            'Use eco-friendly dishwasher settings',
            'Hand wash in a basin instead of running water'
          ]
        },
        {
          title: 'Cooking',
          impact: 'Save up to 11 liters per day',
          suggestions: [
            'Steam vegetables instead of boiling',
            'Reuse cooking water for plants',
            'Use a pan of water to wash produce',
            'Thaw food in refrigerator instead of running water'
          ]
        },
        {
          title: 'Drinking Water',
          impact: 'Save up to 4 liters per day',
          suggestions: [
            'Keep a pitcher of water in fridge',
            'Use a water filter instead of bottled water',
            'Collect water while waiting for hot water',
            'Use reusable water bottles'
          ]
        }
      ]
    },
    laundry: {
      title: 'Laundry',
      icon: 'fa-shirt',
      tips: [
        {
          title: 'Washing Machine',
          impact: 'Save up to 57 liters per load',
          suggestions: [
            'Run full loads only',
            'Use cold water when possible',
            'Choose shorter wash cycles',
            'Maintain washing machine regularly'
          ]
        },
        {
          title: 'Clothing Care',
          impact: 'Save up to 19 liters per week',
          suggestions: [
            'Wear clothes multiple times before washing',
            'Spot clean when possible',
            'Use eco-friendly detergents',
            'Air dry clothes when possible'
          ]
        }
      ]
    },
    outdoor: {
      title: 'Outdoor',
      icon: 'fa-tree',
      tips: [
        {
          title: 'Gardening',
          impact: 'Save up to 114 liters per week',
          suggestions: [
            'Water plants early morning or evening',
            'Use mulch to retain moisture',
            'Choose drought-resistant plants',
            'Install drip irrigation'
          ]
        },
        {
          title: 'Car Washing',
          impact: 'Save up to 151 liters per wash',
          suggestions: [
            'Use a bucket instead of hose',
            'Wash car on lawn to water grass',
            'Use waterless car wash products',
            'Visit commercial car washes that recycle water'
          ]
        },
        {
          title: 'Cleaning',
          impact: 'Save up to 38 liters per cleaning',
          suggestions: [
            'Use a broom instead of hose for patios',
            'Clean driveways with a brush',
            'Use a bucket for window washing',
            'Sweep debris instead of hosing'
          ]
        }
      ]
    }
  };

  return (
    <div className="water-saving-tips">
      <div className="tips-header">
        <h1>How to Save Water</h1>
        <p>Learn practical tips to reduce your water footprint and make a positive impact on our environment.</p>
      </div>

      <div className="tips-content">
        <div className="category-nav">
          {Object.entries(categories).map(([key, category]) => (
            <button
              key={key}
              className={`category-button ${activeCategory === key ? 'active' : ''}`}
              onClick={() => setActiveCategory(key)}
            >
              <i className={`fas ${category.icon}`}></i>
              <span>{category.title}</span>
            </button>
          ))}
        </div>

        <div className="tips-grid">
          {categories[activeCategory].tips.map((tip, index) => (
            <div key={index} className="tip-card">
              <div className="tip-header">
                <h3>{tip.title}</h3>
                <div className="impact-badge">
                  <i className="fas fa-leaf"></i>
                  <span>{tip.impact}</span>
                </div>
              </div>
              <ul className="suggestions-list">
                {tip.suggestions.map((suggestion, idx) => (
                  <li key={idx}>
                    <i className="fas fa-check-circle"></i>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="tips-footer">
        <div className="impact-summary">
          <h2>Your Impact</h2>
          <p>By implementing these water-saving tips, you can save hundreds of liters of water each month!</p>
          <div className="impact-stats">
            <div className="stat-item">
              <i className="fas fa-tint"></i>
              <span>Save up to 50% water</span>
            </div>
            <div className="stat-item">
              <i className="fas fa-globe"></i>
              <span>Reduce carbon footprint</span>
            </div>
            <div className="stat-item">
              <i className="fas fa-wallet"></i>
              <span>Lower utility bills</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterSavingTips; 