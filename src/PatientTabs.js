import React from "react";
import { Tabs, Tab, Card, Table, Alert } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";

const PatientTabs = ({ patient, insights, handleReferenceClick, referenceData }) => (
  <Tabs defaultActiveKey="preVisit" id="visit-tabs">
    {/* Pre-Visit */}
    <Tab eventKey="preVisit" title="Pre-Visit Review">
      <Card className="mt-3">
        <Card.Header>Pre-Visit Overview</Card.Header>
        <Card.Body>
          <h5>
            Reason for Visit
            <FaInfoCircle
              onClick={() => handleReferenceClick(referenceData.diagnosis)}
              style={{ cursor: "pointer", marginLeft: "10px" }}
              title="See reference"
            />
          </h5>
          <p>{patient.diagnosis}</p>

          <h5>
            Prior Consultations
            <FaInfoCircle
              onClick={() => handleReferenceClick(referenceData.consultations)}
              style={{ cursor: "pointer", marginLeft: "10px" }}
              title="See reference"
            />
          </h5>
          <ul>
            {patient.priorConsultations.map((consult, index) => (
              <li key={index}>{consult}</li>
            ))}
          </ul>

          <h5>
            Radiology Results
            <FaInfoCircle
              onClick={() => handleReferenceClick(referenceData.radiologySummary)}
              style={{ cursor: "pointer", marginLeft: "10px" }}
              title="See reference"
            />
          </h5>
          <p>
            <strong>Summary:</strong> {patient.radiology.summary}
          </p>
          <p>
            <strong>Findings:</strong> {patient.radiology.findings}
          </p>
          <p>
            <strong>Recommendations:</strong> {patient.radiology.recommendations}
          </p>

          <h5>Social Determinants of Health</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Factor</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(patient.socialDeterminants).map(([key, value], index) => (
                <tr key={index}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h5>
            Medications
            <FaInfoCircle
              onClick={() => handleReferenceClick(referenceData.medications)}
              style={{ cursor: "pointer", marginLeft: "10px" }}
              title="See reference"
            />
          </h5>
          <ul>
            {patient.medications.map((medication, index) => (
              <li key={index}>{medication}</li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </Tab>

    {/* During Visit */}
    <Tab eventKey="duringVisit" title="Clinical Risk Assessment">
      <Card className="mt-3">
        <Card.Header>During Visit: Clinical Risk Assessment</Card.Header>
        <Card.Body>
          <h5>Existing Conditions</h5>
          <ul>
            {patient.conditions.map((condition, index) => (
              <li key={index}>{condition}</li>
            ))}
          </ul>

          <h5>Medications</h5>
          <ul>
            {patient.medications.map((medication, index) => (
              <li key={index}>{medication}</li>
            ))}
          </ul>

          <h5>Risk Factors</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Factor</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Length of Stay</td>
                <td>{patient.riskFactors.lengthOfStay}</td>
              </tr>
              <tr>
                <td>DRG</td>
                <td>{patient.riskFactors.drg}</td>
              </tr>
              <tr>
                <td>CC/MCC</td>
                <td>{patient.riskFactors.ccMcc}</td>
              </tr>
              <tr>
                <td>Hospital Acquired Conditions</td>
                <td>{patient.riskFactors.hospitalAcquiredConditions.join(", ") || "None"}</td>
              </tr>
            </tbody>
          </Table>

          <h5>Real-Time Clinical Insights</h5>
          <Alert variant="warning">
            <strong>Missed Diagnoses:</strong> {insights.missedDiagnoses.join(", ")}
          </Alert>
          <Alert variant="danger">
            <strong>Clinical Validation Flags:</strong> {insights.clinicalValidationFlags.join(", ")}
          </Alert>
        </Card.Body>
      </Card>
    </Tab>

    {/* Post-Visit */}
    <Tab eventKey="postVisit" title="CDI & Documentation Review">
      <Card className="mt-3">
        <Card.Header>Post-Visit: CDI & Documentation Improvement</Card.Header>
        <Card.Body>
          <h5>CDI Insights</h5>
          <Alert variant="info">
            <strong>Missed Diagnoses:</strong> {insights.missedDiagnoses.join(", ")}
          </Alert>

          <h5>Documentation Opportunities</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Issue</th>
                <th>Suggestion</th>
              </tr>
            </thead>
            <tbody>
              {insights.cdiOpportunities.map((opportunity, index) => (
                <tr key={index}>
                  <td>{opportunity.issue}</td>
                  <td>{opportunity.suggestion}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Tab>
  </Tabs>
);

export default PatientTabs;
