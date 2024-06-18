import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home.jsx';
import MapPage from './pages/MapPage.jsx';
import BusPage from './pages/BusPage.jsx';
import SubwayPage from './pages/SubwayPage.jsx';
import ChatbotPage from './pages/ChatbotPage.jsx';
import SentimentPage from './pages/SentimentPage.jsx';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <nav className="nav-bar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/map">Map Page</Link>
            </li>
            <li>
              <Link to="/subway">Subway Page</Link>
            </li>
            <li>
              <Link to="/bus">Bus Page</Link>
            </li>
            <li>
              <Link to="/chatbot">Chatbot Page</Link>
            </li>
            <li>
              <Link to="/sentiment">Sentiment Analysis</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/subway" element={<SubwayPage />} />
          <Route path="/bus" element={<BusPage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/sentiment" element={<SentimentPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
