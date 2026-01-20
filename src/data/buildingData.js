// 울산 현대해상 주변 건물 데이터 (데모용)
export const buildingData = [
  {
    id: 1,
    name: '현대해상화재보험 울산지점',
    address: '울산광역시 남구 삼산로 282',
    lat: 35.5397,
    lng: 129.3314,
    roofArea: 1200,
    solarRadiation: 1365,
    buildingType: '상업시설',
    floors: 5,
    shadingFactor: 0.95, // 차폐율 (높을수록 좋음)
    installableCapacity: 150,
    color: '#e74c3c'
  },
  {
    id: 2,
    name: '롯데백화점 울산점',
    address: '울산광역시 남구 삼산로 288',
    lat: 35.5386,
    lng: 129.3325,
    roofArea: 3500,
    solarRadiation: 1350,
    buildingType: '상업시설',
    floors: 8,
    shadingFactor: 0.93,
    installableCapacity: 400,
    color: '#3498db'
  },
  {
    id: 3,
    name: '삼산동 주민센터',
    address: '울산광역시 남구 삼산로 94',
    lat: 35.5410,
    lng: 129.3298,
    roofArea: 850,
    solarRadiation: 1380,
    buildingType: '공공시설',
    floors: 3,
    shadingFactor: 0.98,
    installableCapacity: 100,
    color: '#2ecc71'
  },
  {
    id: 4,
    name: '울산 삼산체육관',
    address: '울산광역시 남구 삼산로 55',
    lat: 35.5435,
    lng: 129.3280,
    roofArea: 2200,
    solarRadiation: 1390,
    buildingType: '공공시설',
    floors: 2,
    shadingFactor: 0.99,
    installableCapacity: 280,
    color: '#2ecc71'
  },
  {
    id: 5,
    name: '울산시청',
    address: '울산광역시 남구 중앙로 201',
    lat: 35.5384,
    lng: 129.3114,
    roofArea: 1800,
    solarRadiation: 1375,
    buildingType: '공공시설',
    floors: 12,
    shadingFactor: 0.85,
    installableCapacity: 200,
    color: '#2ecc71'
  },
  {
    id: 6,
    name: '현대자동차 울산공장',
    address: '울산광역시 북구 양정로 700',
    lat: 35.5730,
    lng: 129.3550,
    roofArea: 15000,
    solarRadiation: 1340,
    buildingType: '산업시설',
    floors: 5,
    shadingFactor: 0.90,
    installableCapacity: 1800,
    color: '#9b59b6'
  },
  {
    id: 7,
    name: 'SK에너지 울산공장',
    address: '울산광역시 남구 용연로 250',
    lat: 35.5120,
    lng: 129.3450,
    roofArea: 12000,
    solarRadiation: 1330,
    buildingType: '산업시설',
    floors: 4,
    shadingFactor: 0.88,
    installableCapacity: 1500,
    color: '#9b59b6'
  },
  {
    id: 8,
    name: '울산대학교',
    address: '울산광역시 남구 대학로 93',
    lat: 35.5400,
    lng: 129.3500,
    roofArea: 8000,
    solarRadiation: 1385,
    buildingType: '교육시설',
    floors: 6,
    shadingFactor: 0.92,
    installableCapacity: 950,
    color: '#f39c12'
  }
];

// 월별 일사량 계수 (실제 기상데이터 기반)
export const monthlyRadiationFactor = [
  { month: '1월', factor: 0.65 },
  { month: '2월', factor: 0.75 },
  { month: '3월', factor: 0.90 },
  { month: '4월', factor: 1.05 },
  { month: '5월', factor: 1.15 },
  { month: '6월', factor: 1.10 },
  { month: '7월', factor: 0.95 },
  { month: '8월', factor: 1.00 },
  { month: '9월', factor: 0.95 },
  { month: '10월', factor: 0.85 },
  { month: '11월', factor: 0.70 },
  { month: '12월', factor: 0.60 }
];

// 공공시설 우선순위 데이터
export const priorityFacilities = [
  {
    rank: 1,
    name: '울산 삼산체육관',
    location: '남구 삼산로 55',
    annualGeneration: 15680,
    co2Reduction: 6.95,
    priorityScore: 98
  },
  {
    rank: 2,
    name: '울산시청',
    location: '남구 중앙로 201',
    annualGeneration: 14200,
    co2Reduction: 6.29,
    priorityScore: 95
  },
  {
    rank: 3,
    name: '삼산동 주민센터',
    location: '남구 삼산로 94',
    annualGeneration: 11800,
    co2Reduction: 5.23,
    priorityScore: 92
  },
  {
    rank: 4,
    name: '남구청',
    location: '남구 번영로 200',
    annualGeneration: 10500,
    co2Reduction: 4.65,
    priorityScore: 88
  },
  {
    rank: 5,
    name: '울산문화예술회관',
    location: '남구 번영로 200',
    annualGeneration: 9800,
    co2Reduction: 4.34,
    priorityScore: 85
  }
];

// 시간대별 발전량 패턴 (24시간)
export const hourlyGenerationPattern = [
  0, 0, 0, 0, 0, 0.05, 0.15, 0.35, 0.55, 0.75, 0.90, 0.98,
  1.0, 0.98, 0.90, 0.75, 0.55, 0.35, 0.15, 0.05, 0, 0, 0, 0
];

// 울산시 일사량 히트맵 데이터 (간단한 그리드)
export const solarHeatmapData = [
  { lat: 35.5200, lng: 129.3000, intensity: 1280 },
  { lat: 35.5300, lng: 129.3100, intensity: 1320 },
  { lat: 35.5400, lng: 129.3200, intensity: 1360 },
  { lat: 35.5500, lng: 129.3300, intensity: 1390 },
  { lat: 35.5600, lng: 129.3400, intensity: 1350 },
  { lat: 35.5700, lng: 129.3500, intensity: 1340 }
];
