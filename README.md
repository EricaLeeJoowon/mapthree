# 🦽 교통 약자를 위한 생성형 AI 기반 대중교통 안내 시스템 연구

<br/>

## 1. Project

### 1-1. Project Description

Wherever 프로젝트는 교통약자를 대상으로 기획되었습니다. 서울교통공사의 API를 활용하여 사용자들에게 지하철 역마다 설치된 승강기의 위치 정보를 제공합니다. 그뿐만 아니라, 휠체어 이용자들이 접근 가능한 장소를 서로 공유하고 소통할 수 있도록 Firebase를 이용한 소셜 미디어 기능을 구현했습니다. 또한 React Query를 사용해 데이터를 가져오고 캐싱하여 관리했습니다. 더불어 반응형 웹 디자인 및 퍼블리싱 작업을 진행했습니다.

모두가 자유롭고 안전한 이동권을 보장받길 바랍니다.

교통 약자를 위한 생성형 AI 기반 대중교통 안내 시스템은 교통약자를 대상으로 기획되었습니다. 공공데이터포털의 API를 활용하여 사용자들에게 버스정류장의 위치 정보를 제공합니다. 또한, 열린데이터광장의 API를 활용하여 사용자들에게 지하철 역마다 설치된 승강기와 휠체어 리프트의 위치 정보를 제공합니다. 네이버 클라우드 플랫폼의 지도 API를 활용하여 실시간 위치정보를 제공합니다. 또한, React Query를 사용해 데이터를 가져오고 캐싱하여 관리했습니다.

<br/>

## 1-2. Project Duration & Participants

- 2024-05-20 ~ 2023-06-20
- 팀 프로젝트 (3인)
  -엄민서, 이주원, 황유빈

<br/>
<br/>

## 2. Skills

![JAVASCRIPT](https://img.shields.io/badge/JavaScript-f6e158?style=for-the-badge&logo=JavaScript&logoColor=ffffff)
![REACT](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=ffffff)
![Git](https://img.shields.io/badge/Git-f05032?style=for-the-badge&logo=git&logoColor=ffffff)

<br/>
<br/>


## 3. Main Features

1. [Map Page](#3-1-Map-Page)
2. [Subway Page](#3-2-Subway-Page)
3. [Bus Page](#3-3-Bus-Page)
4. [Chatbot Page](#3-4-Chatbot-Page)
5. [Classify Page](#3-5-Classify-Page)
6. [Sentiment Analysis](#3-6-Sentiment-Analysis)

<br/>

### 3-1. Map Page

실시간 위치정보를 구현하기 위해 네이버 지도의 API를 활용합니다. 사용자의 위치에 따라 지도의 위치가 바뀌며, 현재 위치를 텍스트로 나타내고, 'MapComponent' 메서드를 통해 지도 위에 아이콘으로 표시합니다. 

```jsx
import React, { useEffect, useState } from 'react';

const MapComponent = () => {
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
        center: new window.naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10,
      });

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
```

<br/>
<br/>
