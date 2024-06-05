import React, { useState, useEffect } from 'react';
import { useFetchLocations } from '../hooks/useFetchLocations';
import SearchBar from '../components/SearchBar';
import StationDetails from '../components/StationDetails';
import WheelchairLiftInfo from '../components/WheelchairLiftInfo';
import './SubwayPage.css';
import subwayData from '../subway_data.json'; // Import subway data JSON file
import { Link } from 'react-router-dom';

const SubwayPage = () => {
  const { isLoading, error, data: locations } = useFetchLocations();
  const [text, setText] = useState('');
  const [filteredStations, setFilteredStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [wheelchairLiftInfo, setWheelchairLiftInfo] = useState(null);

  const handleFind = (keyword, stations) => {
    if (!keyword) return [];
    const regex = new RegExp(keyword, 'gi');
    return stations.filter((station) => station.STATION_NM.match(regex));
  };

  const handleSearch = () => {
    if (locations) {
      const matchArr = handleFind(text, locations) || [];
      setFilteredStations(matchArr);
      setSelectedStation(null);
      console.log('검색 결과:', matchArr);
    }
  };

  useEffect(() => {
    if (locations && text === '') {
      setFilteredStations(locations);
    }
  }, [locations, text]);

  const findWheelchairLiftInfo = (stationName) => {
    return subwayData.find((item) => item.station === stationName);
  };

  useEffect(() => {
    if (selectedStation) {
      const liftInfo = findWheelchairLiftInfo(selectedStation.STATION_NM);
      setWheelchairLiftInfo(liftInfo);
    }
  }, [selectedStation]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="sub-page-container">
      <h1>지하철역 정보</h1>
      <div className="nav-buttons">
        <Link to="/"></Link>
        <Link to="/bus"></Link>
      </div>
      <div className="subway-container">
        <SearchBar text={text} setText={setText} onSearch={handleSearch} />
        <div className="content">
          <ul className="station-list">
            {filteredStations.map((station) => (
              <li key={station.id} onClick={() => setSelectedStation(station)}>
                {station.STATION_NM}
              </li>
            ))}
          </ul>
          {selectedStation && (
            <div className="details-container">
              <StationDetails station={selectedStation} />
              <WheelchairLiftInfo liftInfo={wheelchairLiftInfo} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubwayPage;
