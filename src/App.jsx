import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchPanel from './components/SearchPanel';
import KakaoMap from './components/KakaoMap';
import KPICards from './components/KPICards';
import Charts from './components/Charts';
import PriorityTable from './components/PriorityTable';
import { buildingData, monthlyRadiationFactor, priorityFacilities } from './data/buildingData';
import {
  calculateAnnualGeneration,
  calculateCO2Reduction,
  calculateCostSaving,
  calculateTreeEquivalent,
  calculateMonthlyGeneration,
  calculateMonthlyCO2,
  calculateESGScore
} from './utils/calculations';
import { loadKakaoMapScript } from './config';
import './App.css';

function App() {
  const [selectedBuilding, setSelectedBuilding] = useState(buildingData[0]);
  const [panelConfig, setPanelConfig] = useState({
    capacity: 10,
    efficiency: 17
  });
  const [kpiData, setKpiData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // 카카오 맵 스크립트 로드
  useEffect(() => {
    loadKakaoMapScript()
      .then(() => {
        console.log('Kakao Maps API loaded successfully');
        setMapLoaded(true);
      })
      .catch((error) => {
        console.error('Failed to load Kakao Maps API:', error);
        setMapLoaded(true); // 데모 맵으로 진행
      });
  }, []);

  // 발전량 계산
  useEffect(() => {
    if (selectedBuilding) {
      calculateAll();
    }
  }, [selectedBuilding, panelConfig]);

  const calculateAll = () => {
    const annualGeneration = calculateAnnualGeneration(
      panelConfig.capacity,
      selectedBuilding.solarRadiation,
      panelConfig.efficiency,
      selectedBuilding.shadingFactor
    );

    const co2Reduction = calculateCO2Reduction(annualGeneration);
    const costSaving = calculateCostSaving(annualGeneration);
    const treeEquivalent = calculateTreeEquivalent(co2Reduction);
    const esgScore = calculateESGScore(co2Reduction, annualGeneration);

    // 월별 데이터 계산
    const monthlyGeneration = calculateMonthlyGeneration(annualGeneration, monthlyRadiationFactor);
    const monthlyCO2 = calculateMonthlyCO2(monthlyGeneration);

    setKpiData({
      annualGeneration,
      co2Reduction,
      costSaving,
      treeEquivalent,
      esgScore,
      building: selectedBuilding
    });

    setMonthlyData({
      generation: monthlyGeneration,
      co2: monthlyCO2
    });
  };

  const handleBuildingSelect = (building) => {
    setSelectedBuilding(building);
    // 선택된 건물의 설치 가능 용량으로 자동 설정
    setPanelConfig(prev => ({
      ...prev,
      capacity: Math.min(building.installableCapacity, 200)
    }));
  };

  const handleSearch = (address) => {
    // 주소로 건물 검색
    const foundBuilding = buildingData.find(
      b => b.name.includes(address) || b.address.includes(address)
    );

    if (foundBuilding) {
      handleBuildingSelect(foundBuilding);
      alert(`"${foundBuilding.name}" 건물을 찾았습니다!`);
    } else {
      alert(`"${address}" 검색 결과가 없습니다.\n데모 버전에서는 제한된 건물만 검색 가능합니다.\n\n검색 가능한 건물:\n- 현대해상\n- 롯데백화점\n- 울산시청\n- 울산대학교\n- 현대자동차`);
    }
  };

  const handleCalculate = (config) => {
    setPanelConfig(config);
  };

  return (
    <div className="app">
      <div className="container">
        <Header />

        <div className="main-content">
          <div className="left-column">
            <SearchPanel
              onSearch={handleSearch}
              onCalculate={handleCalculate}
            />
            <KakaoMap
              buildings={buildingData}
              selectedBuilding={selectedBuilding}
              onBuildingSelect={handleBuildingSelect}
            />
          </div>

          <div className="right-column">
            <KPICards data={kpiData} />
          </div>
        </div>

        <Charts monthlyData={monthlyData} />

        <PriorityTable facilities={priorityFacilities} />

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h4>💡 데이터 출처</h4>
              <p>기상청 국가기후데이터센터 | 한국전력거래소 | 한국에너지기술연구원</p>
            </div>
            <div className="footer-section">
              <h4>🔬 AI 기술</h4>
              <p>DNN+LSTM 앙상블 모델 + 전이학습(Transfer Learning)</p>
            </div>
            <div className="footer-section">
              <h4>📊 배출계수</h4>
              <p>전력: 0.443 kgCO₂/kWh (환경부 고시)</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>🌞 울산 햇빛지도 - 태양광 발전량 및 ESG 탄소 저감 대시보드 (Demo Version)</p>
            <p className="footer-note">
              본 서비스는 데모 버전입니다. 실제 서비스에서는 카카오 맵 API와 공공데이터 API가 연동됩니다.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
