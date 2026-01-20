import React, { useEffect, useRef, useState } from 'react';
import './KakaoMap.css';

const KakaoMap = ({ buildings, selectedBuilding, onBuildingSelect }) => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  // 카카오 맵 초기화
  useEffect(() => {
    // 카카오 맵 API 로딩 대기
    const initMap = () => {
      if (!window.kakao || !window.kakao.maps) {
        console.warn('Kakao Maps API not loaded. Showing demo map.');
        return;
      }

      // kakao.maps.load가 있으면 사용 (API 완전히 로드될 때까지 대기)
      if (window.kakao.maps.load) {
        window.kakao.maps.load(() => {
          createMap();
        });
      } else {
        createMap();
      }
    };

    const createMap = () => {
      const container = mapContainer.current;
      const options = {
        center: new window.kakao.maps.LatLng(35.5397, 129.3314), // 현대해상 울산지점
        level: 4
      };

      const kakaoMap = new window.kakao.maps.Map(container, options);
      setMap(kakaoMap);

      // 지도 타입 컨트롤 추가
      const mapTypeControl = new window.kakao.maps.MapTypeControl();
      kakaoMap.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

      // 줌 컨트롤 추가
      const zoomControl = new window.kakao.maps.ZoomControl();
      kakaoMap.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
    };

    // 스크립트 로딩 대기
    if (document.readyState === 'complete') {
      initMap();
    } else {
      window.addEventListener('load', initMap);
      return () => window.removeEventListener('load', initMap);
    }
  }, []);

  // 건물 마커 생성
  useEffect(() => {
    if (!map || !window.kakao) return;

    // 기존 마커 제거
    markers.forEach(marker => marker.setMap(null));

    // 새 마커 생성
    const newMarkers = buildings.map(building => {
      const position = new window.kakao.maps.LatLng(building.lat, building.lng);

      // 커스텀 마커 HTML
      const markerContent = document.createElement('div');
      markerContent.className = `custom-marker ${selectedBuilding?.id === building.id ? 'selected' : ''}`;
      markerContent.style.backgroundColor = building.color;
      markerContent.innerHTML = `
        <div class="marker-inner">
          <span class="marker-label">${building.name}</span>
        </div>
      `;

      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: position,
        content: markerContent,
        yAnchor: 1
      });

      customOverlay.setMap(map);

      // 마커 클릭 이벤트
      markerContent.addEventListener('click', () => {
        onBuildingSelect(building);
        map.panTo(position);
      });

      return customOverlay;
    });

    setMarkers(newMarkers);

  }, [map, buildings, selectedBuilding, onBuildingSelect]);

  // 선택된 건물로 지도 이동
  useEffect(() => {
    if (!map || !selectedBuilding || !window.kakao) return;
    const position = new window.kakao.maps.LatLng(selectedBuilding.lat, selectedBuilding.lng);
    map.panTo(position);
  }, [map, selectedBuilding]);

  return (
    <div className="map-wrapper slide-in-right">
      <div className="map-header">
        <h3 className="map-title">📍 울산시 햇빛지도 (현대해상 주변)</h3>
        <div className="map-subtitle">
          실시간 일사량 기반 태양광 발전 잠재력 분석
        </div>
      </div>

      <div
        ref={mapContainer}
        className="map-container"
        style={{ width: '100%', height: '500px' }}
      >
        {/* 카카오 맵이 로드되지 않은 경우 더미 맵 */}
        {(!window.kakao || !window.kakao.maps) && (
          <div className="demo-map">
            <div className="demo-map-overlay">
              <p className="demo-message">
                🗺️ 데모 버전 - 실제 서비스에서는 카카오 맵 API가 적용됩니다
              </p>
              <div className="demo-buildings">
                {buildings.map(building => (
                  <div
                    key={building.id}
                    className={`demo-marker ${selectedBuilding?.id === building.id ? 'selected' : ''}`}
                    style={{
                      backgroundColor: building.color,
                      top: `${(building.lat - 35.51) * 2000}px`,
                      left: `${(building.lng - 129.30) * 2000}px`
                    }}
                    onClick={() => onBuildingSelect(building)}
                  >
                    <span className="demo-marker-label">{building.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="map-legend">
        <h4 className="legend-title">일사량 범례 (kWh/m²/년)</h4>
        <div className="legend-items">
          <div className="legend-item">
            <span className="legend-color" style={{ background: '#ff4444' }}></span>
            <span className="legend-text">매우 높음 (1400+)</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ background: '#ffaa00' }}></span>
            <span className="legend-text">높음 (1200-1400)</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ background: '#ffee00' }}></span>
            <span className="legend-text">보통 (1000-1200)</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ background: '#88ff00' }}></span>
            <span className="legend-text">낮음 (&lt;1000)</span>
          </div>
        </div>
        <div className="legend-footer">
          <span className="building-type-label">건물 유형:</span>
          <span className="building-type" style={{ color: '#2ecc71' }}>■ 공공시설</span>
          <span className="building-type" style={{ color: '#3498db' }}>■ 상업시설</span>
          <span className="building-type" style={{ color: '#9b59b6' }}>■ 산업시설</span>
          <span className="building-type" style={{ color: '#f39c12' }}>■ 교육시설</span>
        </div>
      </div>
    </div>
  );
};

export default KakaoMap;
