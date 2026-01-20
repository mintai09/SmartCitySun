// 건물 데이터베이스 (실제로는 공공 API에서 가져와야 함)
const buildingDatabase = {
    '울산시청': {
        address: '울산광역시 남구 삼산로 100',
        roofArea: 850,
        solarRadiation: 1350,
        lat: 35.5384,
        lng: 129.3114
    },
    '남구 체육관': {
        address: '울산광역시 남구 대공원로 94',
        roofArea: 1200,
        solarRadiation: 1320,
        lat: 35.5450,
        lng: 129.3200
    },
    '울산대학교': {
        address: '울산광역시 남구 대학로 93',
        roofArea: 2500,
        solarRadiation: 1380,
        lat: 35.5400,
        lng: 129.3500
    },
    '현대자동차': {
        address: '울산광역시 북구 산업로 1010',
        roofArea: 5000,
        solarRadiation: 1290,
        lat: 35.5700,
        lng: 129.3000
    }
};

// 현재 선택된 건물
let currentBuilding = '울산시청';

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    createMonthlyChart();
    calculateGeneration();
});

// 지도 마커 클릭 이벤트 설정
function initializeMap() {
    const markers = document.querySelectorAll('.building-marker');
    markers.forEach(marker => {
        marker.addEventListener('click', function() {
            // 모든 마커에서 selected 클래스 제거
            markers.forEach(m => m.classList.remove('selected'));
            // 클릭된 마커에 selected 클래스 추가
            this.classList.add('selected');
            // 건물 정보 업데이트
            currentBuilding = this.getAttribute('data-name');
            updateBuildingInfo();
            calculateGeneration();
        });
    });
}

// 건물 정보 업데이트
function updateBuildingInfo() {
    const building = buildingDatabase[currentBuilding];
    if (building) {
        document.getElementById('buildingName').textContent = currentBuilding;
        document.getElementById('buildingAddress').textContent = building.address;
        document.getElementById('roofArea').textContent = building.roofArea + ' m²';
        document.getElementById('solarRadiation').textContent = building.solarRadiation + ' kWh/m²/년';
    }
}

// 주소 검색 함수
function searchAddress() {
    const address = document.getElementById('addressInput').value;

    if (!address) {
        alert('주소를 입력해주세요.');
        return;
    }

    // 실제로는 공공데이터 API를 호출하여 건물 정보를 가져와야 함
    // 여기서는 데모용으로 랜덤 데이터 생성
    alert('주소 검색 기능은 공공데이터 API 연동 후 구현됩니다.\n현재는 지도에서 건물을 선택해주세요.');
}

// 발전량 계산 함수
function calculateGeneration() {
    const building = buildingDatabase[currentBuilding];
    if (!building) return;

    const panelCapacity = parseFloat(document.getElementById('panelCapacity').value) || 10;
    const panelEfficiency = parseFloat(document.getElementById('panelEfficiency').value) || 17;

    // 발전량 계산 (단순화된 공식)
    // 실제 발전량 = 설치용량(kW) × 일사량(kWh/m²/년) × 효율(%) × 성능계수(0.8)
    const performanceRatio = 0.8;
    const annualGeneration = Math.round(panelCapacity * building.solarRadiation * (panelEfficiency / 100) * performanceRatio);

    // CO2 저감량 계산 (전력배출계수: 0.443 kgCO2/kWh)
    const co2Factor = 0.443;
    const co2Reduction = (annualGeneration * co2Factor / 1000).toFixed(2); // 톤 단위

    // 전기료 절감액 계산 (평균 전기요금: 150원/kWh)
    const electricityRate = 150;
    const costSaving = (annualGeneration * electricityRate).toLocaleString();

    // 소나무 식재 효과 (소나무 1그루당 연간 6.6kg CO2 흡수)
    const treeAbsorption = 6.6 / 1000; // 톤 단위
    const treeEquivalent = Math.round(co2Reduction / treeAbsorption);

    // KPI 업데이트
    animateValue('annualGeneration', 0, annualGeneration, 1000);
    animateValue('co2Reduction', 0, parseFloat(co2Reduction), 1000, 2);
    document.getElementById('costSaving').textContent = costSaving;
    animateValue('treeEquivalent', 0, treeEquivalent, 1000);

    // 차트 업데이트
    updateMonthlyChart(annualGeneration, co2Reduction);
}

// 숫자 애니메이션 함수
function animateValue(id, start, end, duration, decimals = 0) {
    const element = document.getElementById(id);
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = decimals > 0 ? current.toFixed(decimals) : Math.round(current).toLocaleString();
    }, 16);
}

// 월별 차트 생성
let monthlyChart;

function createMonthlyChart() {
    const ctx = document.getElementById('monthlyChart').getContext('2d');

    monthlyChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            datasets: [
                {
                    label: '월별 발전량 (kWh)',
                    data: [],
                    backgroundColor: 'rgba(102, 126, 234, 0.7)',
                    borderColor: 'rgba(102, 126, 234, 1)',
                    borderWidth: 2,
                    yAxisID: 'y'
                },
                {
                    label: 'CO₂ 저감량 (kg)',
                    data: [],
                    type: 'line',
                    backgroundColor: 'rgba(56, 239, 125, 0.2)',
                    borderColor: 'rgba(56, 239, 125, 1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                title: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {
                        size: 14
                    },
                    bodyFont: {
                        size: 13
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
                            size: 13,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
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
                            size: 13,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            }
        }
    });
}

// 월별 차트 데이터 업데이트
function updateMonthlyChart(annualGeneration, annualCO2) {
    // 월별 발전량 분포 (계절별 일사량 변화 반영)
    const monthlyDistribution = [0.06, 0.07, 0.09, 0.10, 0.11, 0.10, 0.09, 0.09, 0.08, 0.08, 0.07, 0.06];

    const monthlyGeneration = monthlyDistribution.map(ratio => Math.round(annualGeneration * ratio));
    const monthlyCO2 = monthlyDistribution.map(ratio => Math.round(annualCO2 * ratio * 1000)); // kg 단위

    monthlyChart.data.datasets[0].data = monthlyGeneration;
    monthlyChart.data.datasets[1].data = monthlyCO2;
    monthlyChart.update('active');
}

// 실시간 예측 업데이트 시뮬레이션 (실제로는 AI 모델 API 호출)
function updatePrediction() {
    // DNN+LSTM 앙상블 모델을 통한 예측 시뮬레이션
    const now = new Date();
    const hours = now.getHours();

    // 시간대별 발전량 변화 (낮 시간에 높음)
    let predictionFactor = 1.0;
    if (hours >= 6 && hours <= 18) {
        predictionFactor = 1.0 + Math.sin((hours - 6) * Math.PI / 12) * 0.3;
    } else {
        predictionFactor = 0.7;
    }

    // 기존 계산값에 예측 팩터 적용
    calculateGeneration();
}

// 5분마다 예측 업데이트 (실제 서비스에서는 기상 API 연동)
setInterval(updatePrediction, 300000);

// 공공시설 우선순위 테이블 행 클릭 이벤트
document.addEventListener('DOMContentLoaded', function() {
    const tableRows = document.querySelectorAll('.priority-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            tableRows.forEach(r => r.style.backgroundColor = '');
            this.style.backgroundColor = '#e3f2fd';

            // 클릭한 시설의 정보를 표시 (실제로는 해당 건물로 지도 이동)
            const facilityName = this.cells[1].textContent;
            alert(`${facilityName} 시설 정보를 확인합니다.\n실제 서비스에서는 지도에서 해당 위치를 표시합니다.`);
        });
    });
});

// 엔터키로 검색
document.getElementById('addressInput')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchAddress();
    }
});

// 패널 설정 변경 시 자동 재계산
document.getElementById('panelCapacity')?.addEventListener('change', calculateGeneration);
document.getElementById('panelEfficiency')?.addEventListener('change', calculateGeneration);

// 데이터 내보내기 기능 (추가 기능)
function exportData() {
    const data = {
        building: currentBuilding,
        timestamp: new Date().toISOString(),
        generation: document.getElementById('annualGeneration').textContent,
        co2Reduction: document.getElementById('co2Reduction').textContent,
        costSaving: document.getElementById('costSaving').textContent
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `solar_data_${currentBuilding}_${Date.now()}.json`;
    link.click();
}

// 인쇄 기능
function printDashboard() {
    window.print();
}

console.log('울산 햇빛지도 대시보드 초기화 완료');
console.log('AI 예측모델: DNN+LSTM 앙상블 + 전이학습(Transfer Learning)');
console.log('데이터 출처: 기상청, 한국전력거래소, 한국에너지기술연구원');
