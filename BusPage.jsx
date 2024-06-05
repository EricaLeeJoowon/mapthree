import React, { useState } from 'react';
import './BusPage.css';
import busStops from '../busStops.json'; // Import bus stops JSON file
import Modal from '../components/Modal'; // Import the Modal component
import MapComponent from '../components/MapComponent'; // Import the MapComponent

const BusPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStops, setFilteredStops] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [selectedStop, setSelectedStop] = useState(null);

  const handleSearch = () => {
    setIsSearched(true);
    if (searchTerm.trim() === '') {
      setFilteredStops([]);
    } else {
      const filtered = busStops.filter(stop =>
        stop.stop_nm && stop.stop_nm.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStops(filtered);
    }
  };

  const handleClick = (stop) => {
    setSelectedStop(stop);
  };

  const handleCloseModal = () => {
    setSelectedStop(null);
  };

  return (
    <div className="bus-page">
      <h1>버스 정류장 정보</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="정류소 이름 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">조회</button>
      </div>

      <div className="bus-container">
        {isSearched && (filteredStops.length === 0 ? (
          <div>No bus stops found</div>
        ) : (
          filteredStops.map(stop => (
            <div key={stop.node_id} className="bus-card" onClick={() => handleClick(stop)}>
              <h2>{stop.stop_nm}</h2>
              <p>정류소 번호: {stop.stop_no}</p>
              <p>정류소 유형: {stop.stop_type}</p>
            </div>
          ))
        ))}
      </div>

      <Modal isOpen={selectedStop !== null} onClose={handleCloseModal}>
        {selectedStop && (
          <MapComponent latitude={parseFloat(selectedStop.ycode)} longitude={parseFloat(selectedStop.xcode)} />
        )}
      </Modal>
    </div>
  );
};

export default BusPage;
