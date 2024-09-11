import React from 'react';
import { FaUserCircle, FaCalendarAlt } from 'react-icons/fa'; // Import calendar icon
import './HeaderBar.css';

const HeaderBar = ({ timeFrame }) => {
  return (
    <div className="header-bar">
      {/* Left: Title */}
      <div className="header-title">
        <h1>Patient Flow</h1>
      </div>

      {/* Center: Search bar */}
      <div className="header-search">
        <input type="text" placeholder="Search..." />
      </div>

      {/* Right: Time Frame and User Profile */}
      <div className="header-right">
        <div className="time-frame-section">
          {/* Icon followed by Date Range Label */}
          <FaCalendarAlt size={20} style={{ marginRight: "8px" }} />
          <span className="time-frame-label">Date Range</span>
          <span className="time-frame-value">{timeFrame}</span>
        </div>

        <div className="header-profile">
          <FaUserCircle size={40} />
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
