import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const SettingsModal = ({ show, onHide }) => {
  const [openAiKey, setOpenAiKey] = useState("");
  const [openAiModel, setOpenAiModel] = useState("");

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>OpenAI Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="openAiKey">
            <Form.Label>OpenAI API Key</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your OpenAI API Key"
              value={openAiKey}
              onChange={(e) => setOpenAiKey(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="openAiModel" className="mt-3">
            <Form.Label>OpenAI Model</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the OpenAI Model (e.g., GPT-4)"
              value={openAiModel}
              onChange={(e) => setOpenAiModel(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary">Save Settings</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SettingsModal;
