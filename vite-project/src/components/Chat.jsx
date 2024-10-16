// src/components/Chatbot.jsx

import React, { useState } from 'react';
import axios from 'axios';
import ChatHistory from './ChatHistory';
import './chatbot.css';

const Chat= () => {
  const [files, setFiles] = useState([]);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event) => {
    setFiles(event.target.files);
  };

  const uploadFiles = async () => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      await axios.post('http://localhost:5000/upload', formData);
      alert("Files uploaded successfully!");
    } catch (error) {
      console.error("Error uploading files", error);
    }
  };

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setLoading(true);
    const newMessages = [...messages, { text: userInput, isUser: true }];
    setMessages(newMessages);

    try {
      const response = await axios.post('http://localhost:5000/chat', {
        userInput: userInput,
        history: messages.filter(msg => msg.isUser).map(msg => msg.text)
      });

      setMessages([...newMessages, { text: response.data.answer, isUser: false }]);
    } catch (error) {
      console.error("Error in chat", error);
    } finally {
      setUserInput("");
      setLoading(false);
    }
  };

  return (
    <div className="chatbot">
      <div className="upload-section">
        <input type="file" multiple onChange={handleFileUpload} />
        <button onClick={uploadFiles}>Upload Files</button>
      </div>

      <ChatHistory messages={messages} />

      <div className="input-section">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask about your PDF"
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;