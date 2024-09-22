import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaCalendarAlt, FaSearch } from 'react-icons/fa'; 
import './HeaderBar.css';
import logo from './plogo.png'; // Import your logo

const HeaderBar = ({ timeFrame }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size change to switch between mobile and desktop views
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener('resize', handleResize);

    // Call the function initially to set the right state
    handleResize();

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="header-bar">
      <div className="header-left">
        <div className="header-title">
          {/* Add the logo before the title */}
          {!isMobile && <img src={logo} alt="Logo" className="logo" />}
          {!isMobile && <h1>Patient Insights</h1>}
        </div>

        <div className="header-search">
          {/* Show input field in desktop view, FaSearch icon in mobile view */}
          {isMobile ? (
            <FaSearch size={20} />
          ) : (
            <input type="text" placeholder="Search..." />
          )}
        </div>
      </div>

      {!isMobile && (
        <div className="header-right">
          <div className="time-frame-section">
            <FaCalendarAlt size={20} style={{ marginRight: '8px' }} />
            <span className="time-frame-label">Date Range</span>
            <span className="time-frame-value">{timeFrame}</span>
          </div>

          <div className="header-profile">
            <FaUserCircle size={40} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderBar;
