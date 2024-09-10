import React from 'react';


import patientFlowIcon from './patient_flow.png'; 

const BrandLabel = () => {
  return (
    <div className="d-flex align-items-center">
            <img src={patientFlowIcon} alt="Patient Flow Icon" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
            <h1 style={{ margin: 0 }}>Patient Flow</h1>
    </div>
  );
};

export default BrandLabel;
