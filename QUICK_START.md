# 🚀 빠른 시작 가이드

## 📦 1단계: 의존성 설치

터미널을 열고 프로젝트 디렉토리로 이동한 후:

\`\`\`bash
cd e:\SmartCitySun
npm install
\`\`\`

설치되는 주요 패키지:
- React 18.3.1
- Chart.js 4.4.1
- Vite 5.4.11
- react-chartjs-2 5.2.0

## ⚡ 2단계: 개발 서버 실행

\`\`\`bash
npm run dev
\`\`\`

서버가 시작되면 자동으로 브라우저에서 열립니다:
- 주소: http://localhost:3000
- 핫 리로드 지원 (코드 수정 시 자동 새로고침)

## 🎯 3단계: 대시보드 사용하기

### 건물 선택
1. 지도에서 마커를 클릭하여 건물 선택
2. 또는 검색창에 건물명 입력 (예: "현대해상", "롯데백화점")

### 패널 설정 조정
1. 패널 용량 슬라이더로 용량 조절 (1~200 kW)
2. 패널 효율 선택:
   - 단결정 (20%) - 고효율
   - 다결정 (17%) - 표준
   - 박막형 (15%) - 경제형
3. "발전량 계산하기" 버튼 클릭

### 결과 확인
- **KPI 카드**: 발전량, CO₂ 저감량, 절감액, 소나무 효과
- **월별 차트**: 계절별 발전량 변화 추이
- **우선순위 테이블**: 공공시설 설치 순위

## 🗺️ 카카오 맵 API 설정 (선택)

데모 버전은 카카오 맵 없이도 작동하지만, 실제 지도를 사용하려면:

### 1. API 키 발급
1. https://developers.kakao.com/ 접속
2. "내 애플리케이션" > "애플리케이션 추가하기"
3. JavaScript 키 복사

### 2. API 키 적용
\`index.html\` 파일 수정:

\`\`\`html
<!-- 기존 -->
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY&libraries=services,clusterer,drawing"></script>

<!-- 수정 -->
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=여기에_발급받은_키_입력&libraries=services,clusterer,drawing"></script>
\`\`\`

### 3. 서버 재시작
\`\`\`bash
# Ctrl+C로 서버 중지 후
npm run dev
\`\`\`

## 🏗️ 프로덕션 빌드

배포용 빌드 생성:

\`\`\`bash
npm run build
\`\`\`

빌드 결과물:
- 위치: \`dist/\` 폴더
- 최적화된 JavaScript, CSS
- 압축된 에셋

빌드 미리보기:
\`\`\`bash
npm run preview
\`\`\`

## 🔧 문제 해결

### 포트 충돌
다른 앱이 3000 포트를 사용 중이면:

\`vite.config.js\` 수정:
\`\`\`javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // 다른 포트 사용
    open: true
  }
})
\`\`\`

### 의존성 오류
캐시 삭제 후 재설치:
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

### 차트가 표시되지 않음
Chart.js 등록 확인 (\`Charts.jsx\`):
\`\`\`javascript
import { Chart as ChartJS, ... } from 'chart.js';
ChartJS.register(...);
\`\`\`

## 📱 반응형 테스트

브라우저 개발자 도구 (F12)에서:
1. 디바이스 툴바 토글 (Ctrl+Shift+M)
2. 다양한 화면 크기 테스트:
   - 모바일: 375x667
   - 태블릿: 768x1024
   - 데스크톱: 1920x1080

## 🎨 커스터마이징 팁

### 색상 변경
\`src/index.css\`에서 그라데이션 수정:
\`\`\`css
body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
\`\`\`

### 건물 추가
\`src/data/buildingData.js\`에 새 객체 추가

### 계산 로직 수정
\`src/utils/calculations.js\`의 함수 커스터마이징

## 📊 데모 데이터

현재 분석 가능한 8개 건물:
1. 현대해상화재보험 울산지점
2. 롯데백화점 울산점
3. 삼산동 주민센터
4. 울산 삼산체육관
5. 울산시청
6. 현대자동차 울산공장
7. SK에너지 울산공장
8. 울산대학교

## 💡 개발 팁

### 핫 리로드
코드 수정 시 자동으로 브라우저가 새로고침됩니다.

### 콘솔 디버깅
브라우저 콘솔(F12)에서 로그 확인:
\`\`\`javascript
console.log('울산 햇빛지도 대시보드 초기화 완료');
\`\`\`

### 성능 모니터링
React DevTools 설치:
- Chrome: React Developer Tools
- Profiler 탭에서 컴포넌트 렌더링 성능 분석

## 🆘 도움말

문제가 발생하면:
1. README.md 전체 문서 참조
2. GitHub Issues 검색
3. 브라우저 콘솔 오류 확인

---

**즐거운 개발 되세요! 🌞**
