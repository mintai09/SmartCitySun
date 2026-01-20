# 🚀 배포 가이드

## React 대시보드 실행 완료!

울산 햇빛지도 대시보드가 성공적으로 React로 확장되었습니다.

## ✅ 완성된 기능

### 🗺️ 카카오 맵 통합
- 울산 현대해상 주변 8개 건물 표시
- 인터랙티브 마커 (클릭 가능)
- 데모 맵 대체 UI (API 키 없이도 작동)

### ⚡ 실시간 발전량 계산
- 패널 용량/효율 설정
- 건물별 특성 반영
- 즉시 재계산

### 🌱 ESG 지표
- CO₂ 저감량
- 전기료 절감액
- 소나무 식재 효과
- ESG 점수

### 📊 시각화
- Chart.js 월별 그래프
- KPI 대시보드 카드
- 우선순위 테이블

## 🎯 실행 방법

### Windows 사용자
\`\`\`
START.bat 더블클릭
\`\`\`

### 터미널 사용자
\`\`\`bash
cd e:\SmartCitySun
npm run dev
\`\`\`

브라우저가 자동으로 열립니다: **http://localhost:3000**

## 📦 빌드 (배포용)

\`\`\`bash
npm run build
\`\`\`

결과물: `dist/` 폴더

## 🗺️ 카카오 맵 API 설정 (선택사항)

실제 지도를 사용하려면:

1. https://developers.kakao.com/ 에서 API 키 발급
2. `index.html` 수정:
\`\`\`html
<script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=여기에_키_입력"></script>
\`\`\`

## 📁 주요 파일

- `src/App.jsx` - 메인 앱
- `src/components/` - React 컴포넌트들
- `src/data/buildingData.js` - 건물 데이터
- `src/utils/calculations.js` - 계산 로직

## 🎨 특징

- ✨ 모던 그라데이션 디자인
- 📱 완전 반응형 (모바일/태블릿/PC)
- 🎭 부드러운 애니메이션
- 🖱️ 인터랙티브 UI

## 📚 문서

- `README.md` - 전체 문서
- `QUICK_START.md` - 빠른 시작
- `PROJECT_STRUCTURE.md` - 구조 설명

---

**즐거운 개발 되세요! 🌞**
