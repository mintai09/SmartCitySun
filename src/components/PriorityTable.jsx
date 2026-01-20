import React, { useState } from 'react';
import './PriorityTable.css';

const PriorityTable = ({ facilities }) => {
  const [selectedFacility, setSelectedFacility] = useState(null);

  const handleRowClick = (facility) => {
    setSelectedFacility(facility.rank === selectedFacility?.rank ? null : facility);
  };

  const getTotalStats = () => {
    return facilities.reduce((acc, facility) => ({
      generation: acc.generation + facility.annualGeneration,
      co2: acc.co2 + facility.co2Reduction
    }), { generation: 0, co2: 0 });
  };

  const total = getTotalStats();

  return (
    <div className="priority-section fade-in">
      <div className="priority-header">
        <h2 className="priority-title">🏛️ 공공시설 태양광 설치 우선순위</h2>
        <p className="priority-subtitle">
          발전 잠재량과 탄소 저감 효과를 기준으로 산출된 설치 우선순위
        </p>
      </div>

      <div className="priority-stats-banner">
        <div className="banner-item">
          <span className="banner-label">상위 5개 시설 총 발전량</span>
          <span className="banner-value">{total.generation.toLocaleString()} kWh/년</span>
        </div>
        <div className="banner-item">
          <span className="banner-label">연간 CO₂ 저감</span>
          <span className="banner-value">{total.co2.toFixed(2)} 톤/년</span>
        </div>
        <div className="banner-item">
          <span className="banner-label">분석 시설 수</span>
          <span className="banner-value">{facilities.length}개</span>
        </div>
      </div>

      <div className="table-container">
        <table className="priority-table">
          <thead>
            <tr>
              <th className="rank-col">순위</th>
              <th className="name-col">시설명</th>
              <th className="location-col">위치</th>
              <th className="generation-col">예상 발전량<br/>(kWh/년)</th>
              <th className="co2-col">CO₂ 저감량<br/>(톤/년)</th>
              <th className="score-col">우선순위 점수</th>
            </tr>
          </thead>
          <tbody>
            {facilities.map((facility) => (
              <tr
                key={facility.rank}
                className={`
                  table-row
                  ${selectedFacility?.rank === facility.rank ? 'selected' : ''}
                  ${facility.rank <= 3 ? `rank-${facility.rank}` : ''}
                `}
                onClick={() => handleRowClick(facility)}
              >
                <td className="rank-cell">
                  {facility.rank === 1 && <span className="medal">🥇</span>}
                  {facility.rank === 2 && <span className="medal">🥈</span>}
                  {facility.rank === 3 && <span className="medal">🥉</span>}
                  {facility.rank > 3 && <span className="rank-number">{facility.rank}</span>}
                </td>
                <td className="name-cell">
                  <div className="facility-name">{facility.name}</div>
                </td>
                <td className="location-cell">{facility.location}</td>
                <td className="generation-cell">
                  {facility.annualGeneration.toLocaleString()}
                </td>
                <td className="co2-cell">
                  <span className="co2-badge">{facility.co2Reduction}</span>
                </td>
                <td className="score-cell">
                  <div className="score-wrapper">
                    <span className={`score-badge ${getScoreClass(facility.priorityScore)}`}>
                      {facility.priorityScore}
                    </span>
                    <div className="score-bar">
                      <div
                        className="score-bar-fill"
                        style={{ width: `${facility.priorityScore}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedFacility && (
        <div className="facility-detail">
          <h3 className="detail-title">📍 {selectedFacility.name} 상세 정보</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">설치 우선순위</span>
              <span className="detail-value">#{selectedFacility.rank}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">연간 발전량</span>
              <span className="detail-value">{selectedFacility.annualGeneration.toLocaleString()} kWh</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">탄소 저감량</span>
              <span className="detail-value">{selectedFacility.co2Reduction} 톤 CO₂</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">우선순위 점수</span>
              <span className="detail-value">{selectedFacility.priorityScore}/100</span>
            </div>
          </div>
        </div>
      )}

      <div className="policy-summary">
        <h3 className="summary-title">📋 정책 활용 시나리오</h3>
        <div className="summary-grid">
          <div className="summary-card">
            <div className="summary-icon">💰</div>
            <div className="summary-content">
              <h4>예산 효율성</h4>
              <p>상위 5개 시설 우선 설치 시 최대 탄소 감축 효과 달성</p>
              <div className="summary-stat">
                투자 대비 효과: <strong>연간 {total.co2.toFixed(1)}톤 CO₂ 감축</strong>
              </div>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">🌱</div>
            <div className="summary-content">
              <h4>ESG 기여도</h4>
              <p>울산시 공공시설 탄소중립 목표 달성 지원</p>
              <div className="summary-stat">
                소나무 식재 효과: <strong>{Math.round(total.co2 / 0.0066).toLocaleString()}그루</strong>
              </div>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">🚀</div>
            <div className="summary-content">
              <h4>확산 전략</h4>
              <p>시민 참여형 태양광 보급사업 연계 추진</p>
              <div className="summary-stat">
                모범 사례: <strong>공공시설 선도 → 민간 확대</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getScoreClass = (score) => {
  if (score >= 90) return 'excellent';
  if (score >= 80) return 'good';
  return 'average';
};

export default PriorityTable;
