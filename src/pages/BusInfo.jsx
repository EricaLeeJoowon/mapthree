// src/pages/BusInfo.jsx
import React from 'react';
import PropTypes from 'prop-types';

const BusInfo = ({ busInfo }) => {
  if (!busInfo || !busInfo.msgBody || !busInfo.msgBody.itemList) {
    return <p>버스 정보가 없습니다.</p>;
  }

  return (
    <div>
      <h2>버스 도착 정보</h2>
      <ul>
        {busInfo.msgBody.itemList.map((bus, index) => (
          <li key={index}>
            <p>버스 번호: {bus.rtNm}</p>
            <p>도착 예정 시간: {bus.arrmsg1}</p>
            <p>현재 위치: {bus.lastStnNm}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

BusInfo.propTypes = {
  busInfo: PropTypes.object.isRequired,
};

export default BusInfo;
