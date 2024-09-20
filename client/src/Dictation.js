import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";

const Dictation = ({ show, onHide }) => {
  const [dictationText, setDictationText] = useState("");

  const startDictation = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        setDictationText(transcript);
      };

      recognition.onerror = (event) => {
        console.error("Error in dictation:", event.error);
      };

      recognition.start();
    } else {
      alert("Speech Recognition API is not supported in this browser.");
    }
  };

  return show ? (
    <div className="dictation-window bg-light p-3" style={{ position: "fixed", bottom: 0, right: 0, width: "300px", border: "1px solid #ccc", borderRadius: "10px" }}>
      <div className="d-flex justify-content-between">
        <h6>Real-time Dictation</h6>
        <FaTimes onClick={onHide} style={{ cursor: "pointer" }} />
      </div>
      <div className="mt-3" style={{ minHeight: "100px", maxHeight: "200px", overflowY: "auto" }}>
        {dictationText || "Start speaking to dictate..."}
      </div>
      <Button variant="primary" className="mt-2" onClick={startDictation}>
        Start Dictation
      </Button>
    </div>
  ) : null;
};

export default Dictation;
