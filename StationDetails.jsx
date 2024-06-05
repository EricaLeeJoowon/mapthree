// src/components/StationDetails.jsx
import React from 'react';
import './StationDetails.css';

const StationDetails = ({ station }) => {
  return (
    <div className="station-details-container">
      <div className="station-details">
        <h2>{station.STATION_NM}</h2>
        <p><strong>설치위치:</strong> {station.LOCATION}</p>
        <p><strong>운행구간:</strong> {station.STUP_LCTN}</p>
        <p><strong>운행상태:</strong> {station.USE_YN}</p>
        <p><strong>역코드:</strong> {station.STATION_ID}</p>
        <p><strong>승강기 구분:</strong> {station.GUBUN}</p>
        <p><strong>승강기명:</strong> {station.FACI_NM}</p>
      </div>
    </div>
  );
};

export default StationDetails;
