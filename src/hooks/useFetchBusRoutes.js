import { useQuery } from 'react-query';
import axios from 'axios';

const fetchBusStopLocations = async () => {
  const APP_API_KEY = import.meta.env.REACT_APP_API_KEY;
  const response = await axios.get(
    `http://openapi.seoul.go.kr:8088/${APP_API_KEY}/json/busStopLocationXyInfo/1/5/`
  );
  const data = response.data;

  console.log(data);  // 응답 데이터 로그 출력

  // data 및 data.RESULT의 존재 여부를 확인 (구조가 예상과 다를 수 있음)
  if (data && data.RESULT && data.RESULT.CODE === 'INFO-000') {
    return data.busStopLocationXyInfo.row;
  } else {
    const errorMessage = data && data.RESULT && data.RESULT.MESSAGE ? data.RESULT.MESSAGE : 'Unknown API Error';
    console.error('API Error Response:', data);  // 오류 상황 로그 출력
    throw new Error(`API Error: ${errorMessage}`);
  }
};

export const useFetchBusStopLocations = () => {
  return useQuery('busStopLocations', fetchBusStopLocations, {
    staleTime: 1000 * 60 * 10, // 10분 동안 데이터를 새로고침하지 않음
  });
};