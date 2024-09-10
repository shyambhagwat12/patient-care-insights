import React from "react";
import { Modal, Button } from "react-bootstrap";

const ReferenceModal = ({ show, onHide, content }) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Reference Information</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>{content}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
);

export default ReferenceModal;
