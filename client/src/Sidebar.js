import React from "react";
import { FaBars, FaFileCode, FaUser, FaClock, FaCog } from "react-icons/fa";
import './Sidebar.css'; 

const Sidebar = ({
  expanded,
  setExpanded,
  setShowRuleModal,
  setShowContextModal,
  setShowDurationModal,
  setShowSettingsModal
}) => {

  // Detect if screen size is mobile using a React hook
  const isMobile = window.innerWidth <= 767;

  return (
    <div className={`sidebar ${expanded ? "expanded" : ""}`}>
      {/* Show header only on larger screens */}
      {!isMobile && (
        <div
          className="sidebar-header"
          onClick={() => setExpanded(!expanded)}
          style={{ cursor: "pointer" }}
        >
          <FaBars size={24} />
        </div>
      )}

      <div className="sidebar-content">
        <ul className="list-group">
          <li className="list-group-item" onClick={() => setShowRuleModal(true)}>
            <FaFileCode size={24} />
            {expanded && !isMobile && <span>Rule JSON Payload</span>}
          </li>
          <li className="list-group-item" onClick={() => setShowContextModal(true)}>
            <FaUser size={24} />
            {expanded && !isMobile && <span>Patient Context</span>}
          </li>
          <li className="list-group-item" onClick={() => setShowDurationModal(true)}>
            <FaClock size={24} />
            {expanded && !isMobile && <span>Data Duration Settings</span>}
          </li>
          <li className="list-group-item" onClick={() => setShowSettingsModal(true)}>
            <FaCog size={24} />
            {expanded && !isMobile && <span>Settings</span>}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
