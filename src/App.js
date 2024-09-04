import React, { useState } from "react";
import { Tabs, Tab, Card, Table, Alert, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Mock patient data
const patients = {
  arthritis: {
    name: "John Doe",
    age: 58,
    diagnosis: "Osteoarthritis",
    socialDeterminants: {
      housing: "Stable",
      transportation: "Has own vehicle",
      income: "Middle income",
      education: "High school",
    },
    priorConsultations: ["Joint Pain, Feb 2023", "Knee Swelling, March 2023"],
    radiology: {
      summary: "Moderate degeneration of the knee joint.",
      findings: "Osteophyte formation, joint space narrowing.",
      recommendations: "Continue with physiotherapy, consider surgical consultation if symptoms persist.",
    },
    allergies: ["None"],
    conditions: ["Hypertension", "Obesity"],
    medications: ["Losartan", "Ibuprofen"],
    riskFactors: {
      lengthOfStay: "3 days",
      drg: "470 - Major Joint Replacement",
      ccMcc: "CC: Hypertension",
      hospitalAcquiredConditions: [],
    },
  },
  asthma: {
    name: "Jane Smith",
    age: 32,
    diagnosis: "Chronic Asthma",
    socialDeterminants: {
      housing: "Living in a high-pollution area",
      transportation: "Public transport",
      income: "Low income",
      education: "College graduate",
    },
    priorConsultations: ["Asthma attack, March 2023", "Breathing difficulties, May 2023"],
    radiology: {
      summary: "Normal chest X-ray.",
      findings: "No acute infection. Mild bronchial thickening.",
      recommendations: "Continue inhaler use, consider pulmonary function test for long-term management.",
    },
    allergies: ["Pollen"],
    conditions: ["Allergic Rhinitis"],
    medications: ["Inhaler", "Antihistamines"],
    riskFactors: {
      lengthOfStay: "2 days",
      drg: "203 - Bronchitis & Asthma",
      ccMcc: "MCC: Asthma with Exacerbation",
      hospitalAcquiredConditions: ["At risk for Pneumonia"],
    },
  },
};

// Real-time clinical insights and CDI suggestions
const clinicalInsights = {
  arthritis: {
    missedDiagnoses: ["Potential Diabetes"],
    clinicalValidationFlags: ["Possible malnutrition due to weight loss"],
    cdiOpportunities: [
      {
        issue: "Hypertension not captured accurately in the documentation.",
        suggestion: "Consider adding more detail about the patient's current hypertensive condition for better specificity.",
      },
      {
        issue: "Osteoarthritis progression not tracked well.",
        suggestion: "Include further details on the progression of the condition based on radiology findings for a better DRG score.",
      },
    ],
  },
  asthma: {
    missedDiagnoses: ["Undiagnosed COPD"],
    clinicalValidationFlags: ["High risk of pneumonia due to prolonged asthma medication use"],
    cdiOpportunities: [
      {
        issue: "Asthma exacerbation severity is not clear.",
        suggestion: "Document the severity of asthma exacerbations more accurately for proper reimbursement and coding.",
      },
      {
        issue: "Potential risk of pneumonia unaddressed.",
        suggestion: "Given the high risk of pneumonia, add more documentation to validate preventive measures or treatments considered.",
      },
    ],
  },
};

function App() {
  const [selectedPatient, setSelectedPatient] = useState("arthritis");

  const handlePatientChange = (patient) => {
    setSelectedPatient(patient);
  };

  const patient = patients[selectedPatient];
  const insights = clinicalInsights[selectedPatient];

  return (
    <div className="container mt-4">
      <h1>CDI-Enhanced Patient Dashboard</h1>
      <Alert variant="info">
        <strong>Patient:</strong> {patient.name} ({patient.age} years old) - {patient.diagnosis}
      </Alert>

      <Tabs defaultActiveKey="preVisit" id="visit-tabs">
        {/* Pre-Visit */}
        <Tab eventKey="preVisit" title="Pre-Visit Review">
          <Card className="mt-3">
            <Card.Header>Pre-Visit Overview</Card.Header>
            <Card.Body>
              <h5>Reason for Visit</h5>
              <p>{patient.diagnosis}</p>

              <h5>Prior Consultations</h5>
              <ul>
                {patient.priorConsultations.map((consult, index) => (
                  <li key={index}>{consult}</li>
                ))}
              </ul>

              <h5>Radiology Results</h5>
              <p><strong>Summary:</strong> {patient.radiology.summary}</p>
              <p><strong>Findings:</strong> {patient.radiology.findings}</p>
              <p><strong>Recommendations:</strong> {patient.radiology.recommendations}</p>

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

              <h5>Allergies</h5>
              <ul>
                {patient.allergies.map((allergy, index) => (
                  <li key={index}>{allergy}</li>
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
                    <td>Hospital Acquired Conditions (HAC)</td>
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

              <Button variant="primary" onClick={() => alert("CDI Query Created")}>
                Create CDI Query
              </Button>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>

      {/* Switch Patient Button */}
      <div className="mt-4">
        <Button variant="success" onClick={() => handlePatientChange("arthritis")}>
          Switch to Arthritis Patient
        </Button>
        <Button variant="success" className="ml-2" onClick={() => handlePatientChange("asthma")}>
          Switch to Asthma Patient
        </Button>
      </div>
    </div>
  );
}

export default App;
