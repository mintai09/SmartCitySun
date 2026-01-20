# 📂 프로젝트 구조

## 전체 디렉토리 구조

\`\`\`
SmartCitySun/
│
├── 📄 index.html                 # HTML 템플릿 (Kakao Maps API 스크립트 포함)
├── 📄 vite.config.js             # Vite 빌드 설정
├── 📄 package.json               # 프로젝트 의존성 및 스크립트
├── 📄 .gitignore                 # Git 제외 파일 목록
│
├── 📄 README.md                  # 전체 프로젝트 문서
├── 📄 QUICK_START.md             # 빠른 시작 가이드
├── 📄 PROJECT_STRUCTURE.md       # 이 파일
├── 📄 START.bat                  # Windows 실행 스크립트
│
├── 📁 src/                       # 소스 코드 루트
│   ├── 📄 main.jsx               # React 엔트리 포인트
│   ├── 📄 App.jsx                # 메인 앱 컴포넌트
│   ├── 📄 App.css                # 메인 앱 스타일
│   ├── 📄 index.css              # 글로벌 스타일 & 애니메이션
│   │
│   ├── 📁 components/            # React 컴포넌트
│   │   ├── 📄 Header.jsx         # 헤더 컴포넌트
│   │   ├── 📄 Header.css         # 헤더 스타일
│   │   ├── 📄 SearchPanel.jsx    # 검색/설정 패널
│   │   ├── 📄 SearchPanel.css    # 검색 패널 스타일
│   │   ├── 📄 KakaoMap.jsx       # 카카오 맵 컴포넌트
│   │   ├── 📄 KakaoMap.css       # 맵 스타일
│   │   ├── 📄 KPICards.jsx       # KPI 대시보드 카드
│   │   ├── 📄 KPICards.css       # KPI 카드 스타일
│   │   ├── 📄 Charts.jsx         # Chart.js 그래프
│   │   ├── 📄 Charts.css         # 차트 스타일
│   │   ├── 📄 PriorityTable.jsx  # 우선순위 테이블
│   │   └── 📄 PriorityTable.css  # 테이블 스타일
│   │
│   ├── 📁 data/                  # 데이터 파일
│   │   └── 📄 buildingData.js    # 건물/시설 데이터
│   │
│   └── 📁 utils/                 # 유틸리티 함수
│       └── 📄 calculations.js    # 발전량/CO2 계산 로직
│
├── 📁 node_modules/              # npm 패키지 (gitignore)
├── 📁 dist/                      # 빌드 출력 (gitignore)
│
├── 📄 dashboard.html             # 레거시 HTML 버전 (참고용)
├── 📄 dashboard.css              # 레거시 CSS (참고용)
└── 📄 dashboard.js               # 레거시 JS (참고용)
\`\`\`

## 주요 파일 설명

### 🔧 설정 파일

#### package.json
- 프로젝트 메타데이터
- 의존성 목록
- npm 스크립트 정의

**주요 의존성:**
- \`react\`: ^18.3.1
- \`react-dom\`: ^18.3.1
- \`chart.js\`: ^4.4.1
- \`react-chartjs-2\`: ^5.2.0
- \`vite\`: ^5.4.11

**스크립트:**
\`\`\`json
{
  "dev": "vite",           // 개발 서버 실행
  "build": "vite build",   // 프로덕션 빌드
  "preview": "vite preview" // 빌드 미리보기
}
\`\`\`

#### vite.config.js
- Vite 빌드 도구 설정
- React 플러그인 구성
- 개발 서버 포트: 3000

#### index.html
- React 앱의 HTML 템플릿
- Kakao Maps API 스크립트 로드
- \`<div id="root">\` - React 마운트 지점

### 🎨 소스 코드

#### src/main.jsx
React 애플리케이션 엔트리 포인트
\`\`\`javascript
import ReactDOM from 'react-dom/client'
import App from './App'
ReactDOM.createRoot(document.getElementById('root')).render(<App />)
\`\`\`

#### src/App.jsx
메인 앱 컴포넌트 - 전체 레이아웃 및 상태 관리
- 건물 선택 상태
- 패널 설정 상태
- KPI 데이터 계산
- 하위 컴포넌트 조합

#### src/index.css
글로벌 스타일
- CSS Reset
- 그라데이션 배경
- 스크롤바 스타일
- 애니메이션 키프레임

### 📦 컴포넌트 상세

#### Header.jsx
- 대시보드 제목 및 소개
- 전체 통계 요약 (총 건물 수, 발전량, CO2 저감)
- 태그 배지 (AI 예측, 실시간 데이터, ESG)

#### SearchPanel.jsx
- 주소 검색 입력
- 패널 용량 슬라이더 (1-200 kW)
- 패널 효율 선택 (단결정/다결정/박막형)
- 계산 기준 안내

#### KakaoMap.jsx
- 카카오 맵 API 통합
- 건물 마커 표시
- 마커 클릭 이벤트
- 일사량 범례
- 데모 맵 대체 UI

#### KPICards.jsx
- 4개 KPI 카드:
  1. 연간 예상 발전량
  2. CO₂ 저감량
  3. 전기료 절감
  4. 소나무 식재 효과
- 건물 상세 정보
- 숫자 카운터 애니메이션
- AI 예측 안내

#### Charts.jsx
- Chart.js 통합
- 월별 발전량 막대 그래프
- CO₂ 저감량 라인 그래프
- 이중 Y축
- AI 모델 정보 카드
- 데이터 출처 표시

#### PriorityTable.jsx
- 공공시설 우선순위 테이블
- 클릭 가능한 행
- 순위별 스타일 (금/은/동)
- 우선순위 점수 바
- 정책 활용 시나리오

### 📊 데이터

#### buildingData.js
- \`buildingData\`: 8개 건물 정보
  - 위치 (위도/경도)
  - 옥상 면적
  - 일사량
  - 건물 유형
  - 차폐 계수

- \`monthlyRadiationFactor\`: 월별 일사량 계수
- \`priorityFacilities\`: 공공시설 우선순위 데이터
- \`hourlyGenerationPattern\`: 시간대별 패턴

### 🧮 유틸리티

#### calculations.js
발전량 및 ESG 지표 계산 함수들:

- \`calculateAnnualGeneration()\` - 연간 발전량
- \`calculateCO2Reduction()\` - CO₂ 저감량
- \`calculateCostSaving()\` - 전기료 절감액
- \`calculateTreeEquivalent()\` - 소나무 환산
- \`calculateMonthlyGeneration()\` - 월별 발전량
- \`calculateESGScore()\` - ESG 점수
- \`formatNumber()\` - 숫자 포맷팅
- \`getRadiationColor()\` - 일사량 색상 코드

## 🎯 컴포넌트 흐름

\`\`\`
App.jsx (메인)
├── Header.jsx (헤더)
├── SearchPanel.jsx (검색/설정)
│   └── onSearch / onCalculate → App 상태 업데이트
├── KakaoMap.jsx (지도)
│   └── onBuildingSelect → App 상태 업데이트
├── KPICards.jsx (KPI)
│   └── data prop ← App에서 계산된 데이터
├── Charts.jsx (차트)
│   └── monthlyData prop ← App에서 계산된 데이터
└── PriorityTable.jsx (테이블)
    └── facilities prop ← buildingData에서 가져옴
\`\`\`

## 📐 상태 관리

App.jsx에서 관리되는 주요 상태:

\`\`\`javascript
const [selectedBuilding, setSelectedBuilding] = useState(buildingData[0])
const [panelConfig, setPanelConfig] = useState({ capacity: 10, efficiency: 17 })
const [kpiData, setKpiData] = useState(null)
const [monthlyData, setMonthlyData] = useState(null)
\`\`\`

## 🎨 스타일 구조

각 컴포넌트는 독립적인 CSS 파일을 가지고 있습니다:
- 모듈화된 스타일
- BEM 네이밍 컨벤션
- CSS Grid & Flexbox 레이아웃
- 그라데이션 & 애니메이션
- 반응형 미디어 쿼리

## 🔄 데이터 흐름

1. **사용자 입력** → SearchPanel / KakaoMap
2. **이벤트 발생** → App.jsx 핸들러 호출
3. **상태 업데이트** → setState 함수들
4. **계산 실행** → calculations.js 함수들
5. **결과 저장** → kpiData, monthlyData 상태
6. **렌더링** → 하위 컴포넌트 props 전달
7. **UI 업데이트** → 차트, 카드, 테이블 갱신

## 📱 반응형 브레이크포인트

- **모바일**: < 768px
- **태블릿**: 768px ~ 1200px
- **데스크톱**: 1200px ~ 1400px
- **와이드스크린**: > 1400px

## 🚀 빌드 출력

\`npm run build\` 실행 시:

\`\`\`
dist/
├── index.html          # 최적화된 HTML
├── assets/
│   ├── index-[hash].js  # 번들링된 JavaScript
│   ├── index-[hash].css # 번들링된 CSS
│   └── ...              # 기타 에셋
\`\`\`

## 💡 개발 팁

### 새 컴포넌트 추가
1. \`src/components/\`에 \`.jsx\` 파일 생성
2. 대응하는 \`.css\` 파일 생성
3. App.jsx에서 import 및 사용

### 데이터 추가
1. \`src/data/buildingData.js\` 수정
2. 필요시 \`calculations.js\` 로직 조정

### 스타일 변경
1. 컴포넌트별 CSS 파일 수정
2. 글로벌 스타일은 \`index.css\`
3. 핫 리로드로 즉시 확인

---

**구조가 명확해야 유지보수가 쉽습니다! 📁**
