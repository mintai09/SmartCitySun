import React, { useState } from 'react';
import './SearchPanel.css';

const SearchPanel = ({ onSearch, onCalculate }) => {
  const [address, setAddress] = useState('');
  const [panelCapacity, setPanelCapacity] = useState(10);
  const [panelEfficiency, setPanelEfficiency] = useState(17);

  const handleSearch = () => {
    if (!address.trim()) {
      alert('주소를 입력해주세요.');
      return;
    }
    onSearch(address);
  };

  const handleCalculate = () => {
    onCalculate({
      capacity: panelCapacity,
      efficiency: panelEfficiency
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-panel slide-in-left">
      <div className="search-section">
        <h3 className="section-title">🔍 건물 검색</h3>
        <div className="search-input-group">
          <input
            type="text"
            className="search-input"
            placeholder="울산시 건물 주소 또는 건물명을 입력하세요"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="search-button" onClick={handleSearch}>
            검색
          </button>
        </div>
        <div className="search-hint">
          💡 예시: 현대해상, 롯데백화점 울산점, 울산시청
        </div>
      </div>

      <div className="config-section">
        <h3 className="section-title">⚙️ 패널 설정</h3>
        <div className="config-grid">
          <div className="config-item">
            <label className="config-label">
              <span className="label-text">패널 용량 (kW)</span>
              <span className="label-value">{panelCapacity} kW</span>
            </label>
            <input
              type="range"
              min="1"
              max="200"
              step="1"
              value={panelCapacity}
              onChange={(e) => setPanelCapacity(Number(e.target.value))}
              className="range-input"
            />
            <div className="range-labels">
              <span>1</span>
              <span>100</span>
              <span>200</span>
            </div>
          </div>

          <div className="config-item">
            <label className="config-label">
              <span className="label-text">패널 효율</span>
              <select
                value={panelEfficiency}
                onChange={(e) => setPanelEfficiency(Number(e.target.value))}
                className="select-input"
              >
                <option value="20">단결정 (20% 효율) - 고효율</option>
                <option value="17">다결정 (17% 효율) - 표준</option>
                <option value="15">박막형 (15% 효율) - 경제형</option>
              </select>
            </label>
          </div>
        </div>

        <button className="calculate-button" onClick={handleCalculate}>
          <span className="button-icon">⚡</span>
          발전량 계산하기
        </button>
      </div>

      <div className="info-section">
        <h4 className="info-title">📊 계산 기준</h4>
        <ul className="info-list">
          <li>일사량: 기상청 태양광 자원지도 기반</li>
          <li>성능계수: 0.8 (시스템 손실 반영)</li>
          <li>CO₂ 배출계수: 0.443 kgCO₂/kWh</li>
          <li>차폐율: 주변 건물/지형 고려</li>
        </ul>
      </div>
    </div>
  );
};

export default SearchPanel;
