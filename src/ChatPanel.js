import React, { useState } from 'react';
import { Offcanvas, Button, FormControl } from 'react-bootstrap';
import { FaMicrophone, FaPaperPlane } from 'react-icons/fa';

const ChatPanel = ({ show, handleClose }) => {
  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Copilot</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="chat-messages">
          
          <p>No new messages</p>
        </div>
        <div className="chat-input mt-3">
          <FormControl placeholder="Type your message..." />
          <div className="chat-input-icons mt-2 d-flex justify-content-between">
            <Button variant="primary" className="mr-2">
              <FaMicrophone />
            </Button>
            <Button variant="success">
              <FaPaperPlane /> Send
            </Button>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ChatPanel;
