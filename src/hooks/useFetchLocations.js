// src/hooks/useFetchLocations.js
import { useQuery } from 'react-query';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

export async function getLocations() {
  const allData = [];
  const ITEMS_PER_PAGE = 1000;

  try {
    for (let page = 1; ; page++) {
      const startItem = (page - 1) * ITEMS_PER_PAGE + 1;
      const endItem = page * ITEMS_PER_PAGE;

      const res = await axios.get(
        `http://openapi.seoul.go.kr:8088/${import.meta.env.VITE_REACT_APP_METRO_API_KEY}/json/SeoulMetroFaciInfo/${startItem}/${endItem}`
      );

      console.log('API Response:', res.data); // Log the entire response

      const data = res.data?.SeoulMetroFaciInfo?.row || [];
      allData.push(...data);

      if (data.length < ITEMS_PER_PAGE) {
        break;
      }
    }

    console.log('Fetched data:', allData); // Log all fetched data
    return allData.map((item) => ({ ...item, id: uuid() }));
  } catch (e) {
    console.log('Error occurred:', e);
    return [];
  }
}

export const useFetchLocations = () => {
  return useQuery('locations', getLocations, {
    staleTime: 1000 * 60 * 10,
  });
};
