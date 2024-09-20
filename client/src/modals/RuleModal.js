import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const RuleModal = ({ show, onHide }) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Rule JSON Payload</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="rulePayload">
          <Form.Label>Rule JSON Payload</Form.Label>
          <Form.Control as="textarea" rows={5} />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>Close</Button>
      <Button variant="primary">Save Payload</Button>
    </Modal.Footer>
  </Modal>
);

export default RuleModal;
