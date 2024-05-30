// src/components/SearchBar.jsx
import React from 'react';

const SearchBar = ({ text, setText, onSearch }) => {
  return (
    <div>
      <input
        type="text"
        id="station-name"
        name="stationName"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          console.log('검색어:', e.target.value);
        }}
        placeholder="지하철역 이름을 입력하세요"
      />
      <button onClick={onSearch}>검색</button>
    </div>
  );
};

export default SearchBar;

