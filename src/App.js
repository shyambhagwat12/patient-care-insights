import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaMicrophone, FaCog } from "react-icons/fa";
import Sidebar from "./Sidebar";
import PatientDetails from "./PatientDetails";
import PatientTabs from "./PatientTabs";
import ReferenceModal from "./modals/ReferenceModal";
import SettingsModal from "./modals/SettingsModal";
import RuleModal from "./modals/RuleModal";
import ContextModal from "./modals/ContextModal";
import Dictation from "./Dictation";
import BrandLabel from "./BrandLabel";  // Import the new BrandLabel component
import { patients, clinicalInsights, referenceData } from "./data";

function App() {
  const [selectedPatient, setSelectedPatient] = useState("arthritis");
  const [showReferenceModal, setShowReferenceModal] = useState(false);
  const [referenceContent, setReferenceContent] = useState("");
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [showContextModal, setShowContextModal] = useState(false);
  const [showDictation, setShowDictation] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const patient = patients[selectedPatient];
  const insights = clinicalInsights[selectedPatient];

  const handleReferenceClick = (content) => {
    setReferenceContent(content);
    setShowReferenceModal(true);
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <Sidebar
          expanded={sidebarExpanded}
          setExpanded={setSidebarExpanded}
          setShowRuleModal={setShowRuleModal}
          setShowContextModal={setShowContextModal}
        />
        <div className={`col-md-${sidebarExpanded ? 9 : 11}`} style={{ transition: "all 0.3s ease" }}>
          <div className="d-flex justify-content-end mb-3">
            <Button variant="light" onClick={() => setShowSettingsModal(true)}>
              <FaCog />
            </Button>
          </div>

          {/* Replace the "Patient Care Insights" text with the new BrandLabel component */}
          <BrandLabel />

          <PatientDetails patient={patient} referenceData={referenceData} handleReferenceClick={handleReferenceClick} />
          <PatientTabs
            patient={patient}
            insights={insights}
            handleReferenceClick={handleReferenceClick}
            referenceData={referenceData}
          />

          <div className="mt-4">
            <Button variant="success" onClick={() => setSelectedPatient("arthritis")}>
              Switch to Arthritis Patient
            </Button>
            <Button variant="success" className="ml-2" onClick={() => setSelectedPatient("asthma")}>
              Switch to Asthma Patient
            </Button>
          </div>
        </div>
      </div>

      <ReferenceModal show={showReferenceModal} onHide={() => setShowReferenceModal(false)} content={referenceContent} />
      <SettingsModal show={showSettingsModal} onHide={() => setShowSettingsModal(false)} />
      <RuleModal show={showRuleModal} onHide={() => setShowRuleModal(false)} />
      <ContextModal show={showContextModal} onHide={() => setShowContextModal(false)} />
      <Dictation show={showDictation} onHide={() => setShowDictation(false)} />
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
        onClick={() => setShowDictation(!showDictation)}
      >
        <FaMicrophone size={30} />
      </Button>
    </div>
  );
}

export default App;
