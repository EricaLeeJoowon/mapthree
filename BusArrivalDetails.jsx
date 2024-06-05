import React, { useState, useEffect } from 'react';
import { getLowFloorBusArrival } from '../api/busApi';

const BusArrivalDetails = ({ stationId }) => {
  const [busArrivalInfo, setBusArrivalInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLowFloorBusArrival(stationId);
      setBusArrivalInfo(data);
    };

    fetchData();
  }, [stationId]);

  return (
    <div>
      <h2>저상버스 도착 정보</h2>
      {busArrivalInfo.length === 0 ? (
        <p>도착 예정인 저상버스가 없습니다.</p>
      ) : (
        <ul>
          {busArrivalInfo.map((bus) => (
            <li key={bus.BUS_ROUTE_ID}>
              {bus.BUS_ROUTE_NM} - {bus.REMAIN_MIN}분 후 도착
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BusArrivalDetails;