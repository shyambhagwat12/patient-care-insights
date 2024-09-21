import React, { useState, useEffect, useRef } from 'react';
import { Offcanvas, Button, FormControl, Spinner, Card } from 'react-bootstrap';
import { FaMicrophone, FaPaperPlane, FaPaperclip, FaRobot } from 'react-icons/fa'; 
import axios from 'axios'; import { ReactComponent as ChatIcon } from "./icon-copilot.svg"; 
import './ChatPanel.css';
import ReactMarkdown from 'react-markdown';

const ChatPanel = ({ show, handleClose, patient }) => {
  const [fileName, setFileName] = useState(null);   
  const [fileContent, setFileContent] = useState(null);   
  const [loading, setLoading] = useState(false);   
  const [message, setMessage] = useState(''); 
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

    const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);       
      setFileContent(file);     
    }
  };

  const handleInputChange = (e) => { 
    setInputText(e.target.value);
  }

    const handleSend = async () => {
    // if (!fileContent) {
    //   alert('Please attach a file');
    //   return;
    // }

    setLoading(true);     
    const newMessage = { sender: 'user', text: inputText };
    setMessages([...messages, newMessage]);

    console.log('PATIENT INDO', patient);
    try { 
      // const response = await axios.get('http://localhost:5001/chatresponse', { 
      //   patientInfo: "o Patient_10000032", //patient.data, 
      //   query: inputText
      // }); 

      const response = {
        data: "For patient 0 (Patient_10038933), the relevant details are as follows:\n\n- **Name**: Patient_10038933\n- **Gender**: Male\n- **Birth Date**: September 10, 2114\n- **Marital Status**: Single (S)\n- **Communication Language**: English (en)\n\nIf you need more specific information or insights, please clarify your request!"
      };

      const botMessage = { sender: 'bot', text: response.data };
      setMessages([...messages, newMessage, botMessage]);
    }
    catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
      setInputText('');
    }
    // setMessage(''); 
    const formData = new FormData();
    formData.append('clinicalNote', fileContent);     
    formData.append('patientData', JSON.stringify(patient)); 
    // try {
    //   const response = await axios.post('http://localhost:3001/upload', formData, {
    //     headers: { 'Content-Type': 'multipart/form-data' },
    //   });
    //   setMessage('Saved the patient chart');       console.log('FHIR data uploaded successfully:', response.data);
    // } catch (error) {
    //   setMessage('Error uploading FHIR data');       console.error('Error uploading FHIR data:', error);
    // } finally {
    //   setLoading(false);     }
  };

  // return (
  //   <Offcanvas show={show} onHide={handleClose} placement="end">
  //     {/* Centered title with icon */}
  //     <Offcanvas.Header closeButton className="justify-content-center">
  //       <Offcanvas.Title className="d-flex align-items-center chat-title">
  //       <ChatIcon width={30} height={30} className="chat-icon" /> 
  //         Copilot
  //       </Offcanvas.Title>
  //     </Offcanvas.Header>

  //     {/* Main content inside a Card component */}
  //     <Offcanvas.Body className="d-flex flex-column justify-content-between">
  //       <Card className="p-3 border mb-3" style={{ minHeight: '250px', maxHeight: '350px', overflowY: 'auto' }}>
  //         {/* Show success or error message */}
  //         {message && <p>{message}</p>}

  //         {/* Show loading spinner while sending */}
  //         {loading && (
  //           <div className="text-center">
  //             <Spinner animation="border" role="status">
  //               <span className="visually-hidden">Loading...</span>
  //             </Spinner>
  //           </div>
  //         )}
  //         {/* Display chat messages  */}
  //         {messages.map((msg, index) => (
  //           <div key={index} className={`message ${msg.sender}`}>
  //             {msg.text}
  //             </div>
  //         ))}
  //         {/* No messages or attached file */}
  //         {!loading && !message && <p>No new messages</p>}
  //         {fileName && <p>Attached file: {fileName}</p>} {/* Display attached file name */}
  //       </Card>

  //       {/* Chat input and buttons at the bottom */}
  //       <div className="chat-input mt-3">
  //         <FormControl placeholder="Type your message..." 
  //         value={inputText}
  //         onChange={handleInputChange}/>
  //         <div className="chat-input-icons mt-2 d-flex justify-content-between">
  //           <div className="d-flex">
  //             {/* Microphone button */}
  //             <Button variant="primary" className="mr-2">
  //               <FaMicrophone />
  //             </Button>
              
  //             {/* File upload button with spacing */}
  //             <Button variant="secondary" className="chat-clip-button">
  //               <label htmlFor="file-upload" style={{ cursor: 'pointer', marginBottom: '0' }}>
  //                 <FaPaperclip />
  //               </label>
  //               <input
  //                 id="file-upload"
  //                 type="file"
  //                 accept=".txt"
  //                 style={{ display: 'none' }}
  //                 onChange={handleFileChange}
  //               />
  //             </Button>
  //           </div>

  //           {/* Send button */}
  //           <Button variant="success" onClick={handleSend} disabled={loading}>
  //             {loading ? 'Sending...' : <><FaPaperPlane /> Send</>}
  //           </Button>
  //         </div>
  //       </div>
  //     </Offcanvas.Body>
  //   </Offcanvas>

  // VARIATION 2 
 
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
      <Offcanvas.Body className="offcanvas-body">
      <div className="chat-messages" ref={chatContainerRef}>
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

          {/* Display chat messages */}
          {messages.map((msg, index) => (
            <div key={index} className={`message-bubble ${msg.sender}`}>
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          ))}

          {/* No messages or attached file */}
          {!loading && messages.length === 0 && <p>No new messages</p>}
          {fileName && <p>Attached file: {fileName}</p>} {/* Display attached file name */}
        </div>

        {/* Chat input and buttons at the bottom */}
        <div className="chat-input">
          <FormControl
            placeholder="Type your message..."
            value={inputText}
            onChange={handleInputChange}
          />
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

