import React, { useState } from 'react';
import { Offcanvas, Button, FormControl, Spinner, Card } from 'react-bootstrap';
import { FaMicrophone, FaPaperPlane, FaPaperclip, FaRobot } from 'react-icons/fa'; 
import axios from 'axios'; import { ReactComponent as ChatIcon } from "./icon-copilot.svg"; 

const ChatPanel = ({ show, handleClose, patient }) => {
  const [fileName, setFileName] = useState(null);   const [fileContent, setFileContent] = useState(null);   const [loading, setLoading] = useState(false);   const [message, setMessage] = useState(''); 
    const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);       setFileContent(file);     }
  };

    const handleSend = async () => {
    if (!fileContent) {
      alert('Please attach a file');
      return;
    }

    setLoading(true);     setMessage(''); 
    const formData = new FormData();
    formData.append('clinicalNote', fileContent);     formData.append('patientData', JSON.stringify(patient)); 
    try {
      const response = await axios.post('http://localhost:3001/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Saved the patient chart');       console.log('FHIR data uploaded successfully:', response.data);
    } catch (error) {
      setMessage('Error uploading FHIR data');       console.error('Error uploading FHIR data:', error);
    } finally {
      setLoading(false);     }
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      {/* Centered title with icon */}
      <Offcanvas.Header closeButton className="justify-content-center">
        <Offcanvas.Title className="d-flex align-items-center chat-title">
        <ChatIcon width={30} height={30} className="chat-icon" /> 
          Copilot
        </Offcanvas.Title>
      </Offcanvas.Header>

      {/* Main content inside a Card component */}
      <Offcanvas.Body className="d-flex flex-column justify-content-between">
        <Card className="p-3 border mb-3" style={{ minHeight: '250px', maxHeight: '350px', overflowY: 'auto' }}>
          {/* Show success or error message */}
          {message && <p>{message}</p>}

          {/* Show loading spinner while sending */}
          {loading && (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}

          {/* No messages or attached file */}
          {!loading && !message && <p>No new messages</p>}
          {fileName && <p>Attached file: {fileName}</p>} {/* Display attached file name */}
        </Card>

        {/* Chat input and buttons at the bottom */}
        <div className="chat-input mt-3">
          <FormControl placeholder="Type your message..." />
          <div className="chat-input-icons mt-2 d-flex justify-content-between">
            <div className="d-flex">
              {/* Microphone button */}
              <Button variant="primary" className="mr-2">
                <FaMicrophone />
              </Button>
              
              {/* File upload button with spacing */}
              <Button variant="secondary" className="chat-clip-button">
                <label htmlFor="file-upload" style={{ cursor: 'pointer', marginBottom: '0' }}>
                  <FaPaperclip />
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept=".txt"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </Button>
            </div>

            {/* Send button */}
            <Button variant="success" onClick={handleSend} disabled={loading}>
              {loading ? 'Sending...' : <><FaPaperPlane /> Send</>}
            </Button>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ChatPanel;
