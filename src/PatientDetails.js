import React from "react";
import { Alert } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";

const PatientDetails = ({ patient, referenceData, handleReferenceClick }) => (
  <>
    <Alert variant="info">
      <strong>Patient:</strong> {patient.name} ({patient.age} years old) - {patient.diagnosis}
      <FaInfoCircle onClick={() => handleReferenceClick(referenceData.diagnosis)} style={{ cursor: "pointer", marginLeft: "10px" }} title="See reference" />
    </Alert>
  </>
);

export default PatientDetails;
