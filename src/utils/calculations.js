// 태양광 발전량 계산 유틸리티

/**
 * 연간 예상 발전량 계산
 * @param {number} panelCapacity - 패널 용량 (kW)
 * @param {number} solarRadiation - 연간 평균 일사량 (kWh/m²/년)
 * @param {number} efficiency - 패널 효율 (%)
 * @param {number} shadingFactor - 차폐 계수 (0-1)
 * @returns {number} 연간 발전량 (kWh)
 */
export const calculateAnnualGeneration = (
  panelCapacity,
  solarRadiation,
  efficiency = 17,
  shadingFactor = 0.95
) => {
  const performanceRatio = 0.8; // 종합 성능계수
  const annualGeneration =
    panelCapacity *
    solarRadiation *
    (efficiency / 100) *
    performanceRatio *
    shadingFactor;

  return Math.round(annualGeneration);
};

/**
 * CO2 저감량 계산
 * @param {number} generation - 발전량 (kWh)
 * @returns {number} CO2 저감량 (톤)
 */
export const calculateCO2Reduction = (generation) => {
  const CO2_FACTOR = 0.443; // kgCO2/kWh (환경부 기준)
  return (generation * CO2_FACTOR / 1000).toFixed(2);
};

/**
 * 전기료 절감액 계산
 * @param {number} generation - 발전량 (kWh)
 * @param {number} rate - 전기료 단가 (원/kWh)
 * @returns {number} 절감액 (원)
 */
export const calculateCostSaving = (generation, rate = 150) => {
  return Math.round(generation * rate);
};

/**
 * 소나무 식재 효과 계산
 * @param {number} co2Reduction - CO2 저감량 (톤)
 * @returns {number} 소나무 그루 수
 */
export const calculateTreeEquivalent = (co2Reduction) => {
  const TREE_ABSORPTION = 6.6 / 1000; // 톤 단위 (소나무 1그루당 연간 6.6kg CO2 흡수)
  return Math.round(co2Reduction / TREE_ABSORPTION);
};

/**
 * 월별 발전량 계산
 * @param {number} annualGeneration - 연간 발전량
 * @param {Array} monthlyFactors - 월별 계수 배열
 * @returns {Array} 월별 발전량 배열
 */
export const calculateMonthlyGeneration = (annualGeneration, monthlyFactors) => {
  const totalFactor = monthlyFactors.reduce((sum, item) => sum + item.factor, 0);
  return monthlyFactors.map(item => ({
    month: item.month,
    generation: Math.round((annualGeneration * item.factor) / totalFactor)
  }));
};

/**
 * 월별 CO2 저감량 계산
 * @param {Array} monthlyGeneration - 월별 발전량 배열
 * @returns {Array} 월별 CO2 저감량 배열
 */
export const calculateMonthlyCO2 = (monthlyGeneration) => {
  const CO2_FACTOR = 0.443;
  return monthlyGeneration.map(item => ({
    month: item.month,
    co2: Math.round(item.generation * CO2_FACTOR)
  }));
};

/**
 * 시간대별 발전량 예측
 * @param {number} maxGeneration - 최대 발전량 (kWh)
 * @param {Array} hourlyPattern - 시간대별 패턴 (0-1)
 * @returns {Array} 시간대별 발전량
 */
export const predictHourlyGeneration = (maxGeneration, hourlyPattern) => {
  return hourlyPattern.map((factor, hour) => ({
    hour,
    generation: (maxGeneration * factor).toFixed(2)
  }));
};

/**
 * 설치 가능 용량 계산
 * @param {number} roofArea - 옥상 면적 (m²)
 * @param {number} panelArea - 패널 단위 면적 (m²)
 * @param {number} panelCapacity - 패널 단위 용량 (kW)
 * @returns {number} 설치 가능 용량 (kW)
 */
export const calculateInstallableCapacity = (
  roofArea,
  panelArea = 1.6,
  panelCapacity = 0.3
) => {
  const utilizationRate = 0.7; // 옥상 활용률 70%
  const availableArea = roofArea * utilizationRate;
  const numberOfPanels = Math.floor(availableArea / panelArea);
  return Math.round(numberOfPanels * panelCapacity);
};

/**
 * 투자 회수 기간 계산
 * @param {number} installCost - 설치 비용 (원)
 * @param {number} annualSaving - 연간 절감액 (원)
 * @returns {number} 회수 기간 (년)
 */
export const calculatePaybackPeriod = (installCost, annualSaving) => {
  return (installCost / annualSaving).toFixed(1);
};

/**
 * ESG 점수 계산
 * @param {number} co2Reduction - CO2 저감량 (톤)
 * @param {number} generation - 발전량 (kWh)
 * @returns {number} ESG 점수 (0-100)
 */
export const calculateESGScore = (co2Reduction, generation) => {
  const co2Score = Math.min((co2Reduction / 10) * 50, 50);
  const generationScore = Math.min((generation / 20000) * 50, 50);
  return Math.round(co2Score + generationScore);
};

/**
 * 숫자 포맷팅 (천단위 콤마)
 * @param {number} num - 숫자
 * @returns {string} 포맷팅된 문자열
 */
export const formatNumber = (num) => {
  return num.toLocaleString('ko-KR');
};

/**
 * 일사량에 따른 색상 코드 반환
 * @param {number} radiation - 일사량 (kWh/m²/년)
 * @returns {string} 색상 코드
 */
export const getRadiationColor = (radiation) => {
  if (radiation >= 1400) return '#ff4444'; // 높음
  if (radiation >= 1200) return '#ffaa00'; // 중간
  if (radiation >= 1000) return '#ffee00'; // 보통
  return '#88ff00'; // 낮음
};
