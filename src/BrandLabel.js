import React from 'react';

// Assuming patient_flow.png is in the same folder or can be imported
import patientFlowIcon from './patient_flow.png'; // Update the path to the actual location of your image

const BrandLabel = () => {
  return (
    <div className="d-flex align-items-center">
      {/* Icon */}
      <img src={patientFlowIcon} alt="Patient Flow Icon" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
      {/* Branded Text */}
      <h1 style={{ margin: 0 }}>Patient Flow</h1>
    </div>
  );
};

export default BrandLabel;
