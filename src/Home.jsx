import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>교통 정보 조회</h1>
        <div className="selection-buttons">
          <div>
            <Link to="/map">
            <button className="mapButton">지도</button>
            </Link>
          </div>
          <div>
            <Link to="/subway">
              <button className="subButton">지하철</button>
            </Link>
          </div> 
          <div>
            <Link to="/bus">
              <button className="busButton">버스</button>
            </Link>
          </div> 
          <div>
            <Link to="/chatbot">
              <button className="chatButton">챗봇</button>
            </Link>
          </div>
          <div>
            <Link to="/classify">
              <button className="classifyButton">실시간 이미지 분류기</button>
            </Link>
          </div>
          <div>
            <Link to="/sentiment">
              <button className="sentimentButton">만족도 조사</button>
            </Link>
          </div>   
        </div>
    </div>
  );
};

export default Home;
