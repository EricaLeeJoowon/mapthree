import React, { useEffect, useState } from 'react';
import './MapPage.css';

const MapPage = ({ latitude, longitude }) => {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadMap = () => {
      const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;
      const clientSecret = import.meta.env.VITE_NAVER_CLIENT_SECRET;

      if (!clientId || !clientSecret) {
        setError('API Key is missing');
        return;
      }

      const map = new window.naver.maps.Map('map', {
        center: new window.naver.maps.LatLng(latitude || 37.3595704, longitude || 127.105399),
        zoom: 15,
      });

      if (latitude && longitude) {
        const currentPos = new window.naver.maps.LatLng(latitude, longitude);

        new window.naver.maps.Marker({
          position: currentPos,
          map: map,
        });

        map.setCenter(currentPos);

        const url = `/api/map-reversegeocode/v2/gc?request=coordsToaddr&coords=${longitude},${latitude}&sourcecrs=epsg:4326&output=json&orders=roadaddr`;
        fetch(url, {
          headers: {
            'X-NCP-APIGW-API-KEY-ID': clientId,
            'X-NCP-APIGW-API-KEY': clientSecret,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            if (data.results && data.results.length > 0) {
              const roadAddress = data.results[0].land;
              const address = `${roadAddress.name} ${roadAddress.number1}${roadAddress.number2 ? `-${roadAddress.number2}` : ''}`;
              setAddress(address);
            } else {
              setAddress('주소를 찾을 수 없습니다');
            }
          })
          .catch((error) => {
            console.error('Error fetching reverse geocode:', error);
            setAddress('주소를 가져오는 중 오류 발생');
          });
      } else {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const currentPos = new window.naver.maps.LatLng(latitude, longitude);

            new window.naver.maps.Marker({
              position: currentPos,
              map: map,
            });

            map.setCenter(currentPos);

            const url = `/api/map-reversegeocode/v2/gc?request=coordsToaddr&coords=${longitude},${latitude}&sourcecrs=epsg:4326&output=json&orders=roadaddr`;
            fetch(url, {
              headers: {
                'X-NCP-APIGW-API-KEY-ID': clientId,
                'X-NCP-APIGW-API-KEY': clientSecret,
              },
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
              })
              .then((data) => {
                if (data.results && data.results.length > 0) {
                  const roadAddress = data.results[0].land;
                  const address = `${roadAddress.name} ${roadAddress.number1}${roadAddress.number2 ? `-${roadAddress.number2}` : ''}`;
                  setAddress(address);
                } else {
                  setAddress('주소를 찾을 수 없습니다');
                }
              })
              .catch((error) => {
                console.error('Error fetching reverse geocode:', error);
                setAddress('주소를 가져오는 중 오류 발생');
              });
          }, (error) => {
            console.error('Error getting current position:', error);
            setError('Error getting current position');
          });
        } else {
          console.error('Geolocation is not supported by this browser.');
          setError('Geolocation is not supported by this browser.');
        }
      }
    };

    if (window.naver && window.naver.maps) {
      loadMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${import.meta.env.VITE_NAVER_CLIENT_ID}`;
      script.async = true;
      script.onload = loadMap;
      script.onerror = () => {
        console.error('Error loading Naver Maps script.');
        setError('Error loading Naver Maps script.');
      };
      document.head.appendChild(script);
    }
  }, [latitude, longitude]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="map-container">
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      <div className="current_address">현재 주소: {address}</div>
    </div>
  );
};

export default MapPage;
