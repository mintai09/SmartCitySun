# 🚀 GitHub Pages 배포 가이드

## 🔐 API 키 보호 방법

### 1. 카카오 개발자 콘솔에서 도메인 제한 설정 (가장 중요!)

1. https://developers.kakao.com/console/app 접속
2. 앱 선택
3. **"플랫폼" 메뉴** 클릭
4. **"Web 플랫폼 추가"** 클릭
5. **사이트 도메인 입력**:
   - `https://yourusername.github.io` (메인 도메인)
   - `http://localhost:3000` (로컬 개발용)

**이렇게 하면 허용된 도메인에서만 API 키 사용 가능!**

### 2. 환경 변수로 API 키 관리

`.env` 파일 생성 (`.gitignore`에 추가됨):
\`\`\`env
VITE_KAKAO_API_KEY=11206d325cda00850eabe2dfbe04f35d
\`\`\`

코드에서 사용:
\`\`\`javascript
const apiKey = import.meta.env.VITE_KAKAO_API_KEY
\`\`\`

### 3. GitHub Secrets 사용 (GitHub Actions 배포)

GitHub Repository → Settings → Secrets and variables → Actions
- New repository secret 클릭
- Name: `KAKAO_API_KEY`
- Value: `11206d325cda00850eabe2dfbe04f35d`

## 📦 배포 방법

### Option A: GitHub Actions 자동 배포 (권장)

#### 1. GitHub Actions 워크플로우 생성

\`.github/workflows/deploy.yml\` 파일 생성

#### 2. Repository 설정
- Settings → Pages
- Source: GitHub Actions 선택

#### 3. 푸시하면 자동 배포!

\`\`\`bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
\`\`\`

### Option B: gh-pages 브랜치로 수동 배포

#### 1. gh-pages 패키지 설치
\`\`\`bash
npm install --save-dev gh-pages
\`\`\`

#### 2. package.json에 스크립트 추가
\`\`\`json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/SmartCitySun"
}
\`\`\`

#### 3. 배포 실행
\`\`\`bash
npm run deploy
\`\`\`

## ⚙️ Vite 설정 수정

\`vite.config.js\`:
\`\`\`javascript
export default defineConfig({
  plugins: [react()],
  base: '/SmartCitySun/', // Repository 이름
  server: {
    port: 3000,
    open: true
  }
})
\`\`\`

## 🔒 보안 체크리스트

- ✅ 카카오 개발자 콘솔에서 도메인 제한 설정
- ✅ API 키 사용량 제한 설정
- ✅ Referrer 체크 활성화
- ✅ .env 파일 .gitignore에 추가
- ✅ 주기적으로 키 갱신

## 🌐 배포 URL

배포 후 접속 주소:
\`\`\`
https://yourusername.github.io/SmartCitySun/
\`\`\`

## 🐛 문제 해결

### API 키가 노출되었다면?
1. 카카오 개발자 콘솔에서 키 재발급
2. GitHub Repository에서 Secrets 업데이트
3. 도메인 제한 재설정

### 지도가 안 나온다면?
1. 브라우저 콘솔(F12) 확인
2. 카카오 개발자 콘솔에서 도메인 확인
3. HTTPS 프로토콜 확인

---

**준비되면 실제 배포 파일을 생성해드릴까요?**
