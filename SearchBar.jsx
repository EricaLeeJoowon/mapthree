import React from 'react';
import './SearchBar.css';

const SearchBar = ({ text, setText, onSearch }) => {
  return (
    <div className = "center">
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
        className = "input-field"
      />
      <button onClick={onSearch} className="search-button">검색</button>
     </div>
    </div>
  );
};

export default SearchBar;
