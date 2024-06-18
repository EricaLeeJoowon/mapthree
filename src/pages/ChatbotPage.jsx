import React, { useState } from 'react';
import axios from 'axios';
import './ChatbotPage.css';

const ChatbotPage = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatbotMessage, setChatbotMessage] = useState('');

  const handleSendMessage = async () => {
    if (userMessage.trim() === '') return;

    try {
      const response = await axios.post('http://localhost:5000/openai/chatbot', { message: userMessage });
      setChatbotMessage(response.data.reply);
      setUserMessage('');
    } catch (error) {
      console.error('Error fetching chatbot response', error);
      if (error.response) {
        console.error('Server responded with:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    }
  };

  return (
    <div className="chatbot-container">
      <h1>챗봇</h1>
      <div className="input-container">
        <input 
          type="text" 
          id="userMessage" 
          name="userMessage"
          placeholder="질문을 입력하세요" 
          value={userMessage} 
          onChange={(e) => setUserMessage(e.target.value)} 
        />
        <button onClick={handleSendMessage}>전송</button>
      </div>
      {chatbotMessage && <div className="response-container"><p>챗봇: {chatbotMessage}</p></div>}
    </div>
  );
};

export default ChatbotPage;
