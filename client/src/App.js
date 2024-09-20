import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { Routes, Route, useNavigate } from "react-router-dom"; // Import routing components
import Sidebar from "./Sidebar";
import PatientDetails from "./PatientDetails";
import PatientTabs from "./PatientTabs";
import ReferenceModal from "./modals/ReferenceModal";
import SettingsModal from "./modals/SettingsModal";
import RuleModal from "./modals/RuleModal";
import ContextModal from "./modals/ContextModal";
import DurationModal from "./modals/DurationModal";
import HeaderBar from "./HeaderBar";
import ChatPanel from "./ChatPanel";
import PatientSelection from "./PatientSelection";
import "./App.css";
import { ReactComponent as ChatIcon } from "./icon-copilot.svg";

function App() {
  const [selectedPatient, setSelectedPatient] = useState(null); // Start with no patient selected
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

  const ws = useRef(null);
  const [wsReady, setWsReady] = useState(false);

  const patients = [
    { id: "arthritis", name: "John Doe", appointmentDate: "2024-09-20" },
    { id: "asthma", name: "Jane Smith", appointmentDate: "2024-09-21" },
  ];

  useEffect(() => {
    // Create WebSocket connection.
    ws.current = new WebSocket("ws://localhost:3001");

    ws.current.onopen = () => {
      console.log("WebSocket connection established");
      setWsReady(true);
    };

    ws.current.onmessage = (e) => {
      console.log("Message from server:", e.data);
      try {
        const message = JSON.parse(e.data);
        if (message.error) {
          setError(message.error);
        } else if (message.action === "patientData") {
          setPatientData(message.data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error parsing message from server:", err);
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (wsReady && selectedPatient) {
      setLoading(true);
      setError(null);
      const selectedPatientData = patients.find((p) => p.id === selectedPatient);
      if (selectedPatientData) {
        ws.current.send(
          JSON.stringify({
            action: "getPatientData",
            data: { name: selectedPatientData.name },
          })
        );
      }
    }
  }, [selectedPatient, wsReady]);

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

  const PatientDashboard = () => {
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
      <div className="main-content">
        <PatientDetails
          patient={patientData}
          referenceData={patientData?.referenceData || {}}
          handleReferenceClick={handleReferenceClick}
        />
        <PatientTabs
          patient={patientData}
          insights={patientData?.clinicalInsights || {}}
          handleReferenceClick={handleReferenceClick}
          referenceData={patientData?.referenceData || {}}
          timeFrame={timeFrame}
        />
      </div>
    );
  };

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

        <Routes>
          {/* Define the route for patient selection */}
          <Route
            path="/"
            element={
              <PatientSelection
                patients={patients}
                setSelectedPatient={setSelectedPatient}
              />
            }
          />
          {/* Define the route for the dashboard */}
          <Route path="/dashboard" element={<PatientDashboard />} />
        </Routes>
      </div>

      <Button
        variant="light"
        style={{
          position: "fixed",
          bottom: "70px",
          right: "20px",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
        }}
        onClick={handleChatOpen}
      >
        <ChatIcon width={30} height={30} />
      </Button>

      <ChatPanel
        show={showChatPanel}
        handleClose={handleChatClose}
        patient={patientData}
      />

      <ReferenceModal
        show={showReferenceModal}
        onHide={() => setShowReferenceModal(false)}
        content={referenceContent}
      />
      <SettingsModal
        show={showSettingsModal}
        onHide={() => setShowSettingsModal(false)}
      />
      <RuleModal show={showRuleModal} onHide={() => setShowRuleModal(false)} />
      <ContextModal
        show={showContextModal}
        onHide={() => setShowContextModal(false)}
      />
      <DurationModal
        show={showDurationModal}
        onHide={() => setShowDurationModal(false)}
        onSubmit={handleDurationSubmit}
      />
    </div>
  );
}

export default App;
