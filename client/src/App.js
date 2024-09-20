import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaComments } from "react-icons/fa"; 
import Sidebar from "./Sidebar";
import PatientDetails from "./PatientDetails";
import PatientTabs from "./PatientTabs";
import ReferenceModal from "./modals/ReferenceModal";
import SettingsModal from "./modals/SettingsModal";
import RuleModal from "./modals/RuleModal";
import ContextModal from "./modals/ContextModal";
import DurationModal from "./modals/DurationModal";
import Dictation from "./Dictation";
import BrandLabel from "./BrandLabel";  
import { Button } from "react-bootstrap";
import axios from "axios";
import HeaderBar from "./HeaderBar";
import ChatPanel from "./ChatPanel"; 
import "./App.css";

import { ReactComponent as ChatIcon } from "./icon-copilot.svg"; 

function App() {
  const [selectedPatient, setSelectedPatient] = useState("arthritis"); 
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showReferenceModal, setShowReferenceModal] = useState(false);
  const [referenceContent, setReferenceContent] = useState("");
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [showContextModal, setShowContextModal] = useState(false);
  const [showDurationModal, setShowDurationModal] = useState(false);
  const [timeFrame, setTimeFrame] = useState("All");
  const [showChatPanel, setShowChatPanel] = useState(false); 
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

    const patientNameMap = {
    arthritis: "John Doe",
    asthma: "Jane Smith"
  };

    useEffect(() => {
    const fetchPatientData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`/api/patient/${patientNameMap[selectedPatient]}`);
        setPatientData(response.data);
      } catch (err) {
        setError("Error fetching patient data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [selectedPatient]);

  const handleReferenceClick = (content) => {
    setReferenceContent(content);
    setShowReferenceModal(true);
  };

  const handleDurationSubmit = (selectedTimeFrame) => {
    setTimeFrame(selectedTimeFrame);
    setShowDurationModal(false);
  };

  const handleChatOpen = () => setShowChatPanel(true); 
  const handleChatClose = () => setShowChatPanel(false); 

  if (loading) {
    return <div>Loading patient data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!patientData) {
    return <div>No patient data available.</div>;
  }

  return (
    <div className="app-container">
      
      <HeaderBar timeFrame={timeFrame} />

      <div className="main-section">
        <Sidebar
          expanded={sidebarExpanded} 
          setExpanded={setSidebarExpanded}
          setShowRuleModal={setShowRuleModal}
          setShowContextModal={setShowContextModal}
          setShowDurationModal={setShowDurationModal}
          setShowSettingsModal={setShowSettingsModal}
        />

        <div className={`main-content ${sidebarExpanded ? "expanded" : ""}`}>
          <PatientDetails
            patient={patientData}             referenceData={patientData.referenceData || {}}             handleReferenceClick={handleReferenceClick}
          />
          <PatientTabs
            patient={patientData}             insights={patientData.clinicalInsights || {}}             handleReferenceClick={handleReferenceClick}
            referenceData={patientData.referenceData || {}}             timeFrame={timeFrame}
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

      <Button
        variant="light"
        style={{ position: "fixed", bottom: "20px", right: "20px", borderRadius: "50%", width: "60px", height: "60px" }}
        onClick={handleChatOpen}
      >
        <ChatIcon width={30} height={30} /> 
      </Button>

      <ChatPanel show={showChatPanel} handleClose={handleChatClose} patient={patientData} />

      <ReferenceModal show={showReferenceModal} onHide={() => setShowReferenceModal(false)} content={referenceContent} />
      <SettingsModal show={showSettingsModal} onHide={() => setShowSettingsModal(false)} />
      <RuleModal show={showRuleModal} onHide={() => setShowRuleModal(false)} />
      <ContextModal show={showContextModal} onHide={() => setShowContextModal(false)} />
      <DurationModal
        show={showDurationModal}
        onHide={() => setShowDurationModal(false)}
        onSubmit={handleDurationSubmit}
      />
    </div>
  );
}

export default App;
