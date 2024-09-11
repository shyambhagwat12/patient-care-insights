import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import './HeaderBar.css';

const HeaderBar = () => {
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

      {/* Right: User Profile Icon */}
      <div className="header-profile">
        <FaUserCircle size={40} />
      </div>
    </div>
  );
};

export default HeaderBar;
