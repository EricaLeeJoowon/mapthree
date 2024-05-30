// src/Home.jsx
import React, { useState, useEffect } from 'react';
import { useFetchLocations } from './hooks/useFetchLocations';
import SearchBar from './components/SearchBar';
import StationDetails from './components/StationDetails';

const Home = () => {
  const { isLoading, error, data: locations } = useFetchLocations();
  const [text, setText] = useState('');
  const [filteredStations, setFilteredStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);

  const handleFind = (keyword, stations) => {
    if (!keyword) return [];
    const regex = new RegExp(keyword, 'gi');
    return stations.filter((station) => station.STATION_NM.match(regex));
  };

  const handleSearch = () => {
    if (locations) {
      const matchArr = handleFind(text, locations) || [];
      setFilteredStations(matchArr);
      setSelectedStation(null); // Clear previous selection on new search
      console.log('Search results:', matchArr); // Debug log
    }
  };

  useEffect(() => {
    if (locations && text === '') {
      setFilteredStations(locations);
    }
  }, [locations, text]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      <SearchBar text={text} setText={setText} onSearch={handleSearch} />
      <ul>
        {filteredStations.map((station) => (
          <li key={station.id} onClick={() => setSelectedStation(station)}>
            {station.STATION_NM}
          </li>
        ))}
      </ul>
      {selectedStation && <StationDetails station={selectedStation} />}
    </div>
  );
};

export default Home;

