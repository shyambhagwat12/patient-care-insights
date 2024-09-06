import React, { useState } from "react";
import { Tabs, Tab, Card, Table, Alert, Button, Form, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBars, FaCog, FaMicrophone, FaTimes } from "react-icons/fa"; // Icons for microphone and close button

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
  const [rulePayload, setRulePayload] = useState("{}");
  const [patientContext, setPatientContext] = useState("General Context");
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null); // To track active menu option
  const [showDictation, setShowDictation] = useState(false); // To toggle dictation chat window
  const [dictationText, setDictationText] = useState(""); // Captured dictation text

  // Modal states for OpenAI settings, Rule JSON, and Context
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [showContextModal, setShowContextModal] = useState(false);
  const [openAiKey, setOpenAiKey] = useState("");
  const [openAiModel, setOpenAiModel] = useState("");

  const handlePatientChange = (patient) => {
    setSelectedPatient(patient);
  };

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleMenuClick = (menu) => {
    if (menu === "rulePayload") {
      setShowRuleModal(true);
    } else if (menu === "context") {
      setShowContextModal(true);
    }
    setActiveMenu(menu);
  };

  const toggleDictation = () => {
    setShowDictation(!showDictation);
  };

  const openSettingsModal = () => {
    setShowSettingsModal(true);
  };

  const closeSettingsModal = () => {
    setShowSettingsModal(false);
  };

  const closeRuleModal = () => {
    setShowRuleModal(false);
  };

  const closeContextModal = () => {
    setShowContextModal(false);
  };

  // Web Speech API for Voice Dictation
  const startDictation = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");

        setDictationText(transcript);
      };

      recognition.onerror = (event) => {
        console.error("Error in dictation:", event.error);
      };

      recognition.start();
    } else {
      alert("Speech Recognition API is not supported in this browser.");
    }
  };

  const patient = patients[selectedPatient];
  const insights = clinicalInsights[selectedPatient];

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Collapsible Sidebar */}
        <div className={`col-md-${sidebarExpanded ? 3 : 1} sidebar`} style={{ transition: "all 0.3s ease" }}>
          <div className="sidebar-content" style={{ padding: "10px" }}>
            <Button variant="light" onClick={toggleSidebar} className="mb-3">
              <FaBars />
            </Button>
            {sidebarExpanded && (
              <div>
                {/* Menu Options */}
                <ul className="list-group">
                  <li
                    className={`list-group-item ${activeMenu === "rulePayload" ? "active" : ""}`}
                    onClick={() => handleMenuClick("rulePayload")}
                    style={{ cursor: "pointer" }}
                  >
                    Rule JSON Payload
                  </li>
                  <li
                    className={`list-group-item ${activeMenu === "context" ? "active" : ""}`}
                    onClick={() => handleMenuClick("context")}
                    style={{ cursor: "pointer" }}
                  >
                    Patient Context
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className={`col-md-${sidebarExpanded ? 9 : 11}`} style={{ transition: "all 0.3s ease" }}>
          {/* Settings Icon */}
          <div className="d-flex justify-content-end mb-3">
            <Button variant="light" onClick={openSettingsModal}>
              <FaCog /> {/* Settings Icon */}
            </Button>
          </div>

          <h1>Patient Care Insights</h1>
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
                        <td>{patient.riskFactors.hospitalAcquiredConditions.join(", ") || "None"}
                        </td>
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
      </div>

      {/* Real-time Dictation Chat Window */}
      {showDictation && (
        <div className="dictation-window bg-light p-3" style={{ position: "fixed", bottom: 0, right: 0, width: "300px", border: "1px solid #ccc", borderRadius: "10px" }}>
          <div className="d-flex justify-content-between">
            <h6>Real-time Dictation</h6>
            <FaTimes onClick={toggleDictation} style={{ cursor: "pointer" }} />
          </div>
          <div className="mt-3" style={{ minHeight: "100px", maxHeight: "200px", overflowY: "auto" }}>
            {dictationText || "Start speaking to dictate..."}
          </div>
          <Button variant="primary" className="mt-2" onClick={startDictation}>
            Start Dictation
          </Button>
        </div>
      )}

      {/* Dictation Icon at Bottom Right */}
      <Button
        variant="light"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
        }}
        onClick={toggleDictation}
      >
        <FaMicrophone size={30} />
      </Button>

      {/* Settings Modal */}
      <Modal show={showSettingsModal} onHide={closeSettingsModal}>
        <Modal.Header closeButton>
          <Modal.Title>OpenAI Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="openAiKey">
              <Form.Label>OpenAI API Key</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your OpenAI API Key"
                value={openAiKey}
                onChange={(e) => setOpenAiKey(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="openAiModel" className="mt-3">
              <Form.Label>OpenAI Model</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the OpenAI Model (e.g., GPT-4)"
                value={openAiModel}
                onChange={(e) => setOpenAiModel(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeSettingsModal}>
            Close
          </Button>
          <Button variant="primary">
            Save Settings
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Rule JSON Payload Modal */}
      <Modal show={showRuleModal} onHide={closeRuleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Rule JSON Payload</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="rulePayload">
              <Form.Label>Rule JSON Payload</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={rulePayload}
                onChange={(e) => setRulePayload(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeRuleModal}>
            Close
          </Button>
          <Button variant="primary">
            Save Payload
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Context Modal */}
      <Modal show={showContextModal} onHide={closeContextModal}>
        <Modal.Header closeButton>
          <Modal.Title>Patient Context</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="patientContext">
              <Form.Label>Patient Context</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={patientContext}
                onChange={(e) => setPatientContext(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeContextModal}>
            Close
          </Button>
          <Button variant="primary">
            Save Context
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
