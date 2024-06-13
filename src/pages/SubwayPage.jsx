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

  // Web Speech API를 사용하여 음성을 텍스트로 변환하는 함수
  const startSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.lang = 'ko-KR'; // 한국어 설정
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        console.log('음성 인식 시작');
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log('인식된 텍스트:', transcript);
        setText(transcript);
        handleSearch();
      };

      recognition.onerror = (event) => {
        console.error('음성 인식 오류:', event.error);
      };

      recognition.onend = () => {
        console.log('음성 인식 종료');
      };

      recognition.start();
    } else {
      console.error('Web Speech API가 이 브라우저에서 지원되지 않습니다.');
    }
  };

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
        <button onClick={startSpeechRecognition}>음성 명령 시작</button>
      </div>
    </div>
  );
};

export default SubwayPage;
