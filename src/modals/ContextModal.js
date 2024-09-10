import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ContextModal = ({ show, onHide }) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Patient Context</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="patientContext">
          <Form.Label>Patient Context</Form.Label>
          <Form.Control as="textarea" rows={5} />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>Close</Button>
      <Button variant="primary">Save Context</Button>
    </Modal.Footer>
  </Modal>
);

export default ContextModal;
