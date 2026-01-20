import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import './Charts.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Charts = ({ monthlyData }) => {
  if (!monthlyData) return null;

  // 월별 발전량 차트 옵션
  const monthlyChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold'
          },
          padding: 15,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 15,
        titleFont: {
          size: 15
        },
        bodyFont: {
          size: 14
        },
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              if (context.datasetIndex === 0) {
                label += context.parsed.y.toLocaleString() + ' kWh';
              } else {
                label += context.parsed.y.toLocaleString() + ' kg';
              }
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: '발전량 (kWh)',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          callback: function(value) {
            return value.toLocaleString();
          }
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'CO₂ 저감량 (kg)',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        grid: {
          drawOnChartArea: false
        },
        ticks: {
          callback: function(value) {
            return value.toLocaleString();
          }
        }
      }
    }
  };

  // 월별 차트 데이터
  const monthlyChartData = {
    labels: monthlyData.generation.map(item => item.month),
    datasets: [
      {
        label: '월별 발전량',
        data: monthlyData.generation.map(item => item.generation),
        backgroundColor: 'rgba(102, 126, 234, 0.7)',
        borderColor: 'rgba(102, 126, 234, 1)',
        borderWidth: 2,
        yAxisID: 'y',
      },
      {
        label: 'CO₂ 저감량',
        data: monthlyData.co2.map(item => item.co2),
        type: 'line',
        backgroundColor: 'rgba(56, 239, 125, 0.2)',
        borderColor: 'rgba(56, 239, 125, 1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        yAxisID: 'y1',
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: 'rgba(56, 239, 125, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      }
    ]
  };

  return (
    <div className="charts-section fade-in">
      <div className="chart-container">
        <h2 className="chart-title">📈 월별 발전량 및 탄소 저감 추이</h2>
        <div className="chart-wrapper">
          <Bar data={monthlyChartData} options={monthlyChartOptions} />
        </div>
        <div className="chart-footer">
          <div className="chart-legend-custom">
            <div className="legend-item">
              <span className="legend-dot" style={{ background: '#667eea' }}></span>
              <span>발전량 (좌측 축)</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot" style={{ background: '#38ef7d' }}></span>
              <span>CO₂ 저감량 (우측 축)</span>
            </div>
          </div>
          <div className="chart-note">
            <span className="note-icon">ℹ️</span>
            <span>계절별 일사량 변화를 반영한 실제 예상값</span>
          </div>
        </div>
      </div>

      <div className="prediction-panel">
        <h3 className="prediction-title">🤖 AI 예측 모델 정보</h3>
        <div className="prediction-grid">
          <div className="prediction-card">
            <div className="prediction-icon">🧠</div>
            <div className="prediction-content">
              <h4>DNN 모델</h4>
              <p>다층 퍼셉트론을 활용한 비선형 패턴 학습</p>
              <div className="prediction-stats">
                <span className="stat">정확도: 94.5%</span>
              </div>
            </div>
          </div>

          <div className="prediction-card">
            <div className="prediction-icon">🔄</div>
            <div className="prediction-content">
              <h4>LSTM 모델</h4>
              <p>시계열 데이터 기반 발전량 추세 예측</p>
              <div className="prediction-stats">
                <span className="stat">정확도: 92.8%</span>
              </div>
            </div>
          </div>

          <div className="prediction-card">
            <div className="prediction-icon">🎯</div>
            <div className="prediction-content">
              <h4>앙상블</h4>
              <p>두 모델의 결과를 통합하여 최적화</p>
              <div className="prediction-stats">
                <span className="stat">정확도: 96.2%</span>
              </div>
            </div>
          </div>

          <div className="prediction-card">
            <div className="prediction-icon">🔬</div>
            <div className="prediction-content">
              <h4>전이학습</h4>
              <p>전국 데이터로 사전학습 후 울산 특화</p>
              <div className="prediction-stats">
                <span className="stat">데이터: 50만+ 건</span>
              </div>
            </div>
          </div>
        </div>

        <div className="prediction-features">
          <h4 className="features-title">주요 입력 변수</h4>
          <div className="features-tags">
            <span className="feature-tag">일사량 (GHI)</span>
            <span className="feature-tag">기온</span>
            <span className="feature-tag">운량</span>
            <span className="feature-tag">풍속</span>
            <span className="feature-tag">습도</span>
            <span className="feature-tag">패널 각도</span>
            <span className="feature-tag">차폐율</span>
            <span className="feature-tag">과거 발전량</span>
          </div>
        </div>

        <div className="data-sources">
          <h4 className="sources-title">📊 데이터 출처</h4>
          <ul className="sources-list">
            <li>기상청 국가기후데이터센터 - 태양광 자원지도</li>
            <li>한국전력거래소 - 시간별 태양광 발전량</li>
            <li>한국에너지기술연구원 - 발전량 예측 API</li>
            <li>환경부 - 전력 탄소배출계수 (0.443 kgCO₂/kWh)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Charts;
