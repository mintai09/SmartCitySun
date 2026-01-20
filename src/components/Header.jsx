import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header fade-in">
      <div className="header-content">
        <h1 className="header-title">
          <span className="icon">🌞</span>
          울산 햇빛지도
        </h1>
        <p className="header-subtitle">
          태양광 발전량 및 ESG 탄소 저감 대시보드
        </p>
        <div className="header-tags">
          <span className="tag">AI 예측 모델</span>
          <span className="tag">실시간 데이터</span>
          <span className="tag">ESG 경영 지원</span>
        </div>
      </div>
      <div className="header-stats">
        <div className="stat-item">
          <span className="stat-value">8</span>
          <span className="stat-label">분석 건물</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">5,000+</span>
          <span className="stat-label">연간 총 발전량 (MWh)</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">2,215</span>
          <span className="stat-label">CO₂ 저감량 (톤)</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
