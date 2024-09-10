import React from "react";
import { Button } from "react-bootstrap";
import { FaBars } from "react-icons/fa";

const Sidebar = ({ expanded, setExpanded, setShowRuleModal, setShowContextModal }) => (
  <div className={`col-md-${expanded ? 3 : 1} sidebar`} style={{ transition: "all 0.3s ease" }}>
    <div className="sidebar-content" style={{ padding: "10px" }}>
      <Button variant="light" onClick={() => setExpanded(!expanded)} className="mb-3">
        <FaBars />
      </Button>
      {expanded && (
        <ul className="list-group">
          {/* Trigger the setShowRuleModal to open the Rule Modal */}
          <li className="list-group-item" onClick={() => setShowRuleModal(true)} style={{ cursor: "pointer" }}>
            Rule JSON Payload
          </li>
          {/* Trigger the setShowContextModal to open the Context Modal */}
          <li className="list-group-item" onClick={() => setShowContextModal(true)} style={{ cursor: "pointer" }}>
            Patient Context
          </li>
        </ul>
      )}
    </div>
  </div>
);

export default Sidebar;
