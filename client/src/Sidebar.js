import React from "react";
import { FaBars, FaFileCode, FaUser, FaClock, FaCog } from "react-icons/fa";
import './Sidebar.css'; 

const Sidebar = ({ expanded, setExpanded, setShowRuleModal, setShowContextModal, setShowDurationModal, setShowSettingsModal }) => {
  return (
    <div className={`sidebar ${expanded ? "expanded" : ""}`}>
      
      <div className="sidebar-header" onClick={() => setExpanded(!expanded)} style={{ cursor: "pointer", padding: "15px 10px" }}>
        <FaBars size={24} />
      </div>

      <div className="sidebar-content">
        <ul className="list-group">
          <li className="list-group-item" onClick={() => setShowRuleModal(true)}>
            <FaFileCode size={24} />
            {expanded && <span>Rule JSON Payload</span>}
          </li>
          <li className="list-group-item" onClick={() => setShowContextModal(true)}>
            <FaUser size={24} />
            {expanded && <span>Patient Context</span>}
          </li>
          <li className="list-group-item" onClick={() => setShowDurationModal(true)}>
            <FaClock size={24} />
            {expanded && <span>Data Duration Settings</span>}
          </li>
        </ul>
      </div>

      
      <div className="sidebar-footer" onClick={() => setShowSettingsModal(true)}>
        <FaCog size={24} />
        {expanded && <span>Settings</span>}
      </div>
    </div>
  );
};

export default Sidebar;
