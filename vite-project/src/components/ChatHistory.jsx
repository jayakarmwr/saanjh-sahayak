// src/components/ChatHistory.jsx

import React from 'react';


const ChatHistory = ({ messages }) => {
  return (
    <div className="chat-history">
      {messages.map((message, index) => (
        <div key={index} className={message.isUser ? "user-message" : "bot-message"}>
          {message.text}
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;