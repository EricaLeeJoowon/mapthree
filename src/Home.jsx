//Home.jsx
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
            <Link to="/bus">
              <button className="busButton">버스</button>
            </Link>
          </div> 
          <div>
            <Link to="/subway">
              <button className="subButton">지하철</button>
            </Link>
          </div> 
        </div>
    </div>
  );
};

export default Home;
