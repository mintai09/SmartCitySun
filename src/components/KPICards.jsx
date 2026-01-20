import React, { useState, useEffect } from 'react';
import './KPICards.css';

const KPICards = ({ data }) => {
  const [displayedValues, setDisplayedValues] = useState({
    generation: 0,
    co2: 0,
    cost: 0,
    trees: 0
  });

  // 숫자 애니메이션
  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const stepDuration = duration / steps;

    const animate = (key, target) => {
      let current = 0;
      const increment = target / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setDisplayedValues(prev => ({
          ...prev,
          [key]: key === 'co2' ? current.toFixed(2) : Math.round(current)
        }));
      }, stepDuration);
    };

    if (data) {
      animate('generation', data.annualGeneration);
      animate('co2', parseFloat(data.co2Reduction));
      animate('cost', data.costSaving);
      animate('trees', data.treeEquivalent);
    }
  }, [data]);

  if (!data) return null;

  return (
    <div className="kpi-section fade-in">
      <h2 className="section-header">📊 예상 발전량 및 탄소 저감 효과</h2>

      <div className="kpi-cards-grid">
        <div className="kpi-card primary">
          <div className="kpi-icon">⚡</div>
          <div className="kpi-content">
            <h3 className="kpi-title">연간 예상 발전량</h3>
            <p className="kpi-value">{displayedValues.generation.toLocaleString()}</p>
            <p className="kpi-unit">kWh/년</p>
            <div className="kpi-bar">
              <div className="kpi-bar-fill" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>

        <div className="kpi-card success">
          <div className="kpi-icon">🌱</div>
          <div className="kpi-content">
            <h3 className="kpi-title">연간 CO₂ 저감량</h3>
            <p className="kpi-value">{displayedValues.co2}</p>
            <p className="kpi-unit">톤 CO₂/년</p>
            <div className="kpi-bar">
              <div className="kpi-bar-fill" style={{ width: '78%' }}></div>
            </div>
          </div>
        </div>

        <div className="kpi-card info">
          <div className="kpi-icon">💰</div>
          <div className="kpi-content">
            <h3 className="kpi-title">연간 전기료 절감</h3>
            <p className="kpi-value">{displayedValues.cost.toLocaleString()}</p>
            <p className="kpi-unit">원/년</p>
            <div className="kpi-bar">
              <div className="kpi-bar-fill" style={{ width: '92%' }}></div>
            </div>
          </div>
        </div>

        <div className="kpi-card warning">
          <div className="kpi-icon">🌳</div>
          <div className="kpi-content">
            <h3 className="kpi-title">소나무 식재 효과</h3>
            <p className="kpi-value">{displayedValues.trees.toLocaleString()}</p>
            <p className="kpi-unit">그루</p>
            <div className="kpi-bar">
              <div className="kpi-bar-fill" style={{ width: '88%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {data.building && (
        <div className="building-info-card">
          <h3 className="building-info-title">📍 선택된 건물 정보</h3>
          <div className="building-info-grid">
            <div className="info-row">
              <span className="info-label">건물명</span>
              <span className="info-value">{data.building.name}</span>
            </div>
            <div className="info-row">
              <span className="info-label">주소</span>
              <span className="info-value">{data.building.address}</span>
            </div>
            <div className="info-row">
              <span className="info-label">건물 유형</span>
              <span className="info-value">
                <span className="badge" style={{
                  background: data.building.color,
                  color: 'white'
                }}>
                  {data.building.buildingType}
                </span>
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">옥상 면적</span>
              <span className="info-value">{data.building.roofArea.toLocaleString()} m²</span>
            </div>
            <div className="info-row">
              <span className="info-label">평균 일사량</span>
              <span className="info-value">{data.building.solarRadiation} kWh/m²/년</span>
            </div>
            <div className="info-row">
              <span className="info-label">차폐 계수</span>
              <span className="info-value">
                <span className="badge success">{(data.building.shadingFactor * 100).toFixed(0)}%</span>
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">설치 가능 용량</span>
              <span className="info-value">{data.building.installableCapacity} kW</span>
            </div>
            <div className="info-row">
              <span className="info-label">ESG 점수</span>
              <span className="info-value">
                <span className="badge primary">{data.esgScore}/100</span>
              </span>
            </div>
          </div>

          <div className="ai-prediction-notice">
            <span className="notice-icon">🤖</span>
            <div className="notice-content">
              <strong>AI 예측 모델 적용</strong>
              <p>DNN+LSTM 앙상블 모델 기반 24-48시간 발전량 예측</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KPICards;
