import React from "react";
import { Button } from "react-bootstrap";
import { FaBars } from "react-icons/fa";

const Sidebar = ({ expanded, setExpanded, setShowRuleModal, setShowContextModal, setShowDurationModal }) => (
  <div className={`col-md-${expanded ? 3 : 1} sidebar`} style={{ transition: "all 0.3s ease" }}>
    <div className="sidebar-content" style={{ padding: "10px" }}>
      <Button variant="light" onClick={() => setExpanded(!expanded)} className="mb-3">
        <FaBars />
      </Button>
      {expanded && (
        <ul className="list-group">
          <li className="list-group-item" onClick={() => setShowRuleModal(true)} style={{ cursor: "pointer" }}>
            Rule JSON Payload
          </li>
          <li className="list-group-item" onClick={() => setShowContextModal(true)} style={{ cursor: "pointer" }}>
            Patient Context
          </li>
                    <li className="list-group-item" onClick={() => setShowDurationModal(true)} style={{ cursor: "pointer" }}>
            Data Duration Settings
          </li>
        </ul>
      )}
    </div>
  </div>
);

export default Sidebar;
