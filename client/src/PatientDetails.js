import React from "react";
import { Alert } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";

const getNumber = (value) => {
  if (typeof value === 'object' && value !== null && 'low' in value) {
    return value.low;    }
  return value;
};

const PatientDetails = ({ patient, referenceData, handleReferenceClick }) => {
  const age = getNumber(patient.age);  
  return (
    <>
      <Alert variant="info">
        <strong>Patient:</strong> {patient.name} ({age} years old) - {patient.diagnosis}
        <FaInfoCircle
          onClick={() => handleReferenceClick(referenceData.diagnosis)}
          style={{ cursor: "pointer", marginLeft: "10px" }}
          title="See reference"
        />
      </Alert>
    </>
  );
};

export default PatientDetails;
