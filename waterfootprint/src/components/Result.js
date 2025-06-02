import React from 'react';

const Result = ({ result, recommendations }) => {
  return (
    <div>
      <h2>Your Estimated Water Footprint</h2>
      <p>{result} liters/day</p>
      {recommendations && recommendations.length > 0 && (
        <div>
          <h3>Recommendations:</h3>
          <ul>
            {recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Result;
