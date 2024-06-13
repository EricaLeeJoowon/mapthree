// src/components/WheelchairLiftInfo.jsx
import React from 'react';
import './WheelchairLiftInfo.css';

const WheelchairLiftInfo = ({ liftInfo }) => {
  if (!liftInfo) return null;

  return (
    <div className="wheelchair-lift-info-container">
      <div className="wheelchair-lift-info">
        <h2>휠체어 리프트 정보</h2>
        <p><strong>라인:</strong> {liftInfo.line}</p>
        <p><strong>승강기 번호:</strong> {liftInfo['elevator number']}</p>
        <p><strong>설치위치:</strong> {liftInfo.location}</p>
        <p><strong>운행구간:</strong> {liftInfo['operating range']}</p>
      </div>
    </div>
  );
};

export default WheelchairLiftInfo;
