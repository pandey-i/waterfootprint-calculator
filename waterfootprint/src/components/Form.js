import React, { useState } from 'react';
import axios from 'axios';
import './Form.css'; // Import the CSS file

const Form = ({ setResult }) => {
  const [formData, setFormData] = useState({
    faucetDuration: 0,
    faucetPressure: 'low',
    dishwasher: false,
    dishwasherTimes: 0,
    toiletFlushes: 0,
    toiletType: 'low flow',
    showerTimes: 0,
    showerDuration: 0,
    hasGarden: false,
    gardenType: 'none',
    gardenWaterTimes: 0,
    clothesWashTimes: 0,
    washingMachineType: 'none',
    moppingTimes: 0,
    moppingMethod: 'wet',
    vehicleType: 'car',
    vehicleWashTimes: 0,
    hasRO: false,
    roWaterUsage: 'none',
    houseSize: 0,
    householdMembers: 0,
  });

  const [totalWaterFootprint, setTotalWaterFootprint] = useState(undefined);
  const [recommendations, setLocalRecommendations] = useState([]); // Local state for recommendations

  // Add new state for tracking if form has been submitted
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const resetForm = () => {
    setFormData({
      faucetDuration: 0,
      faucetPressure: 'low',
      dishwasher: false,
      dishwasherTimes: 0,
      toiletFlushes: 0,
      toiletType: 'low flow',
      showerTimes: 0,
      showerDuration: 0,
      hasGarden: false,
      gardenType: 'none',
      gardenWaterTimes: 0,
      clothesWashTimes: 0,
      washingMachineType: 'none',
      moppingTimes: 0,
      moppingMethod: 'wet',
      vehicleType: 'car',
      vehicleWashTimes: 0,
      hasRO: false,
      roWaterUsage: 'none',
      houseSize: 0,
      householdMembers: 0,
    });
    setTotalWaterFootprint(undefined);
    setLocalRecommendations([]);
    setHasSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set hasSubmitted to true immediately when form is submitted
    setHasSubmitted(true);

    // Convert selected frequencies to daily usage and round to integers
    const dailyShowerUsage = Math.round(formData.showerTimes === '1' ? 1 : formData.showerTimes === '0.14' ? 1 / 7 : 0.5);
    const dailyMoppingUsage = Math.round(formData.moppingTimes === '1' ? 1 : formData.moppingTimes === '0.14' ? 1 / 7 : 0.5);

    // Update formData with daily usage
    formData.showerTimes = dailyShowerUsage;
    formData.moppingTimes = dailyMoppingUsage;

    console.log("Form Data Before Submission:", formData);

    try {
      const response = await axios.post('http://localhost:8000/predict', formData);
      
      const baseWaterFootprint = response.data.water_footprint;
      const recommendations = response.data.recommendations;

      const householdMembers = formData.householdMembers;

      let totalWaterFootprint;
      if (householdMembers === 1) {
          totalWaterFootprint = baseWaterFootprint;
      } else {
          const additionalUsage = (
              (formData.dishwasherTimes || 0) * 6 +
              (formData.gardenWaterTimes || 0) * 6 +
              (formData.clothesWashTimes || 0) * 6 +
              (formData.vehicleWashTimes || 0) * 6 +
              (formData.moppingTimes || 0) * 5
          ) * (householdMembers - 1);

          totalWaterFootprint = (baseWaterFootprint * householdMembers) - additionalUsage;
      }
      setTotalWaterFootprint(totalWaterFootprint);

      if (totalWaterFootprint > 183) {
          setLocalRecommendations(recommendations);
      } else {
          setLocalRecommendations([]);
      }
      
    } catch (error) {
      // If there's an error, set hasSubmitted back to false
      setHasSubmitted(false);
      console.error("Error submitting form:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request:", error.request);
      } else {
        console.error("Error:", error.message);
      }
      console.error("Config:", error.config);
    }
  };

  return (
    <form className="water-form" onSubmit={handleSubmit}>
      <h1>Calculate Your Water Footprint</h1>
      <div className="form-group">
        <label>
          Average faucet durations (minutes):
          <input type="number" name="faucetDuration" value={formData.faucetDuration} onChange={handleChange} />
        </label>
      </div>
      <div className="form-group">
        <label>
          Do you use faucet in low or high pressure?
          <select name="faucetPressure" value={formData.faucetPressure} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="high">High</option>
          </select>
        </label>
      </div>
      <div className="form-group">
        <label>
          Do you use dishwasher?
          <input type="checkbox" name="dishwasher" checked={formData.dishwasher} onChange={handleChange} />
        </label>
      </div>
      <div className="form-group">
        <label>
          How many times do you wash dishes daily?
          <input type="number" name="dishwasherTimes" value={formData.dishwasherTimes} onChange={handleChange} />
        </label>
      </div>
      <div className="form-group">
        <label>
          How many times do you flush the toilet daily?
          <input type="number" name="toiletFlushes" value={formData.toiletFlushes} onChange={handleChange} />
        </label>
      </div>
      <div className="form-group">
        <label>
          Do you use low flow or dual flush toilets?
          <select name="toiletType" value={formData.toiletType} onChange={handleChange}>
            <option value="low flow">Low Flow</option>
            <option value="dual flush">Dual Flush</option>
          </select>
        </label>
      </div>
      <div className="form-group">
        <label>
          How often do you shower?
          <select name="showerTimes" value={formData.showerTimes} onChange={handleChange}>
            <option value="1">Daily</option>
            <option value="0.14">Weekly</option>
            <option value="0.5">Alternatively</option>
          </select>

        </label>
      </div>
      <div className="form-group">
        <label>
          Average shower duration (minutes):
          <input type="number" name="showerDuration" value={formData.showerDuration} onChange={handleChange} />
        </label>
      </div>
      <div className="form-group">
        <label>
          Do you have a garden?
          <input type="checkbox" name="hasGarden" checked={formData.hasGarden} onChange={handleChange} />
        </label>
      </div>
      <div className="form-group">
        <label>
          What types of garden do you have?
          <select name="gardenType" value={formData.gardenType} onChange={handleChange}>
            <option value="none">None</option>
            <option value="flower">Flower</option>
            <option value="vegetable">Vegetable</option>
          </select>
        </label>
      </div>
      <div className="form-group">
        <label>
          How often do you water your garden (times per week)?
          <input type="number" name="gardenWaterTimes" value={formData.gardenWaterTimes} onChange={handleChange} />
        </label>
      </div>
      <div className="form-group">
        <label>
          How often do you wash clothes (times per week)?
          <input type="number" name="clothesWashTimes" value={formData.clothesWashTimes} onChange={handleChange} />
        </label>
      </div>
      <div className="form-group">
        <label>
          What type of washing machine do you use?
          <select name="washingMachineType" value={formData.washingMachineType} onChange={handleChange}>
            <option value="None">None</option>
            <option value="top load">Top Load</option>
            <option value="front load">Front Load</option>
          </select>
        </label>
      </div>
      <div className="form-group">
        <label>
          How often do you mop?
          <select name="moppingTimes" value={formData.moppingTimes} onChange={handleChange}>
          <option value="1">Daily</option>
          <option value="0.14">Weekly</option>
            <option value="0.5">Alternatively</option>
          </select>
        </label>
      </div>
      <div className="form-group">
        <label>
          What method do you use for mopping?
          <select name="moppingMethod" value={formData.moppingMethod} onChange={handleChange}>
            <option value="wet">Wet</option>
            <option value="dry">Dry</option>
          </select>
        </label>
      </div>
      <div className="form-group">
        <label>
          What type of vehicle do you own?
          <select name="vehicleType" value={formData.vehicleType} onChange={handleChange}>
            <option value="car">Car</option>
            <option value="bike">Bike</option>
          </select>
        </label>
      </div>
      <div className="form-group">
        <label>
          How often do you wash it (times per week)?
          <input type="number" name="vehicleWashTimes" value={formData.vehicleWashTimes} onChange={handleChange} />
        </label>
      </div>
      <div className="form-group">
        <label>
          Do you have an RO?
          <input type="checkbox" name="hasRO" checked={formData.hasRO} onChange={handleChange} />
        </label>
      </div>
      <div className="form-group">
        <label>
          Where do you use the wasted water?
          <select name="roWaterUsage" value={formData.roWaterUsage} onChange={handleChange}>
            <option value="None">None</option>
            <option value="cleaning">Cleaning</option>
            <option value="plants">Plants</option>
          </select>
        </label>
      </div>
      <div className="form-group">
        <label>
          House size (square feet):
          <select name="houseSize" value={formData.houseSize} onChange={handleChange}>
              <option value="1220">1 BHK</option>
              <option value="2220">2 BHK</option>
              <option value="3320">3 BHK</option>
          </select>
        </label>
      </div>
      <div className="form-group">
          <label>
            Number of household members:
            <input type="number" name="householdMembers" value={formData.householdMembers} onChange={handleChange} />
          </label>

      </div>

      {/* Display total water footprint with color indication */}
      {totalWaterFootprint !== undefined && (
        <div className="water-footprint" style={{ color: totalWaterFootprint > 183 ? 'red' : 'green' }}>
          <h2>Total Water Footprint: {totalWaterFootprint.toFixed(2)} L/day</h2>
        </div>
      )}

      {/* Display Recommendations */}
      {Object.entries(recommendations).map(([category, recs], index) => (
        recs.length > 0 && (
          <div key={index} className="recommendation-box">
            <h3>{category.charAt(0).toUpperCase() + category.slice(1)} Recommendations:</h3>
            <ul>
              {recs.map((rec, recIndex) => (
                <li key={recIndex}>{rec}</li>
              ))}
            </ul>
          </div>
        )
      ))}

      {/* Show Calculate button if form hasn't been submitted */}
      {!hasSubmitted && (
        <button 
          type="submit" 
          className="submit-button"
          style={{ backgroundColor: '#4CAF50' }}
        >
          Calculate
        </button>
      )}

      {/* Show Recalculate button if form has been submitted */}
      {hasSubmitted && (
        <div className="button-container">
          <button 
            type="button" 
            className="submit-button recalculate-button" 
            onClick={resetForm}
            style={{ backgroundColor: '#2196F3' }}
          >
            Recalculate
          </button>
        </div>
      )}
    </form>
  );
};

export default Form;
