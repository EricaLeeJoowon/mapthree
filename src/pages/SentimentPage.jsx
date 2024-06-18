import React, { useState } from 'react';
import axios from 'axios';
import './SentimentPage.css';

const API_URL = "https://api-inference.huggingface.co/models/distilbert/distilbert-base-uncased-finetuned-sst-2-english";
const API_TOKEN = "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";  // 여기에 실제 토큰을 입력하세요.

const SentimentPage = () => {
  const [inputText, setInputText] = useState('');
  const [positiveScore, setPositiveScore] = useState(null);
  const [negativeScore, setNegativeScore] = useState(null);

  const query = async (payload) => {
    const headers = { Authorization: `Bearer ${API_TOKEN}` };
    const response = await axios.post(API_URL, payload, { headers });
    return response.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await query({ inputs: inputText });
      const scores = result[0];
      const positive = scores.find(score => score.label === "POSITIVE")?.score;
      const negative = scores.find(score => score.label === "NEGATIVE")?.score;
      setPositiveScore((positive * 100).toFixed(2));
      setNegativeScore((negative * 100).toFixed(2));
    } catch (error) {
      console.error('Error making prediction:', error);
    }
  };

  return (
    <div className="sentiment-analysis-container">
      <h1>Text Sentiment Analysis</h1>
      <form onSubmit={handleSubmit} className="input-container">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text"
        />
        <button type="submit">Analyze</button>
      </form>
      {positiveScore !== null && negativeScore !== null && (
        <div className="response-container">
          <h2>Prediction:</h2>
          <p>Positive score: {positiveScore}%</p>
          <p>Negative score: {negativeScore}%</p>
        </div>
      )}
    </div>
  );
};

export default SentimentPage;
