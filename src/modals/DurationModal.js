import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const DurationModal = ({ show, onHide, onSubmit }) => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("All");

  const handleSubmit = () => {
    onSubmit(selectedTimeFrame); // Pass the selected time frame back to the App component
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Data Duration Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="timeFrame">
            <Form.Label>Select Time Frame</Form.Label>
            <Form.Control
              as="select"
              value={selectedTimeFrame}
              onChange={(e) => setSelectedTimeFrame(e.target.value)}
            >
              <option value="All">All Data</option>
              <option value="Last 6 Months">Last 6 Months</option>
              <option value="Last 1 Year">Last 1 Year</option>
              <option value="Custom">Custom Range (TBD)</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Apply Time Frame
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DurationModal;
