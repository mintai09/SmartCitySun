# 🚀 GitHub Pages 배포 단계별 가이드

## ✅ 준비 완료된 사항

- ✅ API 키가 환경 변수로 분리됨 (`.env` 파일)
- ✅ `.gitignore`에 `.env` 추가됨 (Git에 올라가지 않음)
- ✅ GitHub Actions 워크플로우 생성됨
- ✅ 카카오 맵 동적 로드 구현
- ✅ Vite 설정 완료

## 📋 배포 단계

### 1️⃣ GitHub Repository 생성

1. https://github.com/new 접속
2. Repository 이름: `SmartCitySun` (또는 원하는 이름)
3. Public 선택
4. "Create repository" 클릭

### 2️⃣ 카카오 개발자 콘솔 설정 (중요!)

1. https://developers.kakao.com/console/app 접속
2. 앱 선택
3. **"플랫폼"** 메뉴 클릭
4. **"Web 플랫폼 추가"** 클릭
5. **사이트 도메인 입력**:
   ```
   https://yourusername.github.io
   ```
   (yourusername을 실제 GitHub 사용자명으로 변경)

6. **저장** 클릭

**이렇게 하면 해당 도메인에서만 API 키 사용 가능!** 🔒

### 3️⃣ GitHub Secrets 설정

1. GitHub Repository 페이지 이동
2. **Settings** → **Secrets and variables** → **Actions** 클릭
3. **"New repository secret"** 클릭
4. 입력:
   - **Name**: `KAKAO_API_KEY`
   - **Secret**: `11206d325cda00850eabe2dfbe04f35d`
5. **"Add secret"** 클릭

### 4️⃣ GitHub Pages 설정

1. Repository → **Settings** → **Pages**
2. **Source**: `GitHub Actions` 선택
3. 저장

### 5️⃣ 코드 업로드

터미널에서 실행:

```bash
cd e:\SmartCitySun

# Git 초기화 (아직 안 했다면)
git init

# 원격 저장소 연결 (yourusername을 실제 사용자명으로 변경)
git remote add origin https://github.com/yourusername/SmartCitySun.git

# 모든 파일 추가 (.gitignore에 있는 파일은 자동 제외됨)
git add .

# 커밋
git commit -m "Initial commit: Smart City Sun Dashboard"

# 푸시 (자동 배포 시작!)
git push -u origin main
```

**주의**: `main` 브랜치가 아니라 `master`라면 `main`을 `master`로 변경

### 6️⃣ 배포 확인

1. GitHub Repository → **Actions** 탭
2. 워크플로우 실행 확인 (약 2-3분 소요)
3. ✅ 성공하면 녹색 체크 표시

### 7️⃣ 사이트 접속

배포 완료 후:
```
https://yourusername.github.io/SmartCitySun/
```

## 🔧 Repository 이름이 다르다면?

`vite.config.js` 수정:
```javascript
base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/',
```

## 🔄 업데이트 배포

코드 수정 후:
```bash
git add .
git commit -m "Update: 수정 내용"
git push
```

자동으로 재배포됩니다!

## 🐛 문제 해결

### 1. 지도가 안 나온다
- 카카오 개발자 콘솔에서 도메인 확인
- GitHub Secrets에 API 키 확인
- 브라우저 콘솔(F12) 오류 확인

### 2. 404 에러
- `vite.config.js`의 `base` 경로 확인
- Repository 이름과 일치하는지 확인

### 3. Actions 실패
- GitHub Actions 탭에서 로그 확인
- Secrets 설정 확인

### 4. API 키가 노출되었다면
1. **즉시 키 재발급** (카카오 개발자 콘솔)
2. GitHub Secrets 업데이트
3. 재배포

## 📊 배포 후 확인 사항

- ✅ 카카오 지도 정상 작동
- ✅ 건물 마커 표시
- ✅ 발전량 계산 정상
- ✅ 차트 표시
- ✅ 반응형 디자인 확인

## 🔒 보안 체크리스트

- ✅ `.env` 파일이 `.gitignore`에 있음
- ✅ GitHub에 `.env` 파일이 없음
- ✅ 카카오 개발자 콘솔에서 도메인 제한 설정
- ✅ GitHub Secrets 사용
- ✅ API 키가 HTML에 직접 노출되지 않음

## 💡 Tip

### 로컬에서 프로덕션 빌드 테스트
```bash
npm run build
npm run preview
```

### 빌드 파일 확인
```bash
# dist 폴더 생성됨
ls dist/
```

## 🌐 최종 URL

```
https://yourusername.github.io/SmartCitySun/
```

---

**준비되셨나요? 위 단계를 따라 배포해보세요! 🚀**

문제가 있으면 GitHub Actions 로그를 확인하세요.
