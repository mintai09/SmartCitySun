# 🎉 GitHub Pages 배포 준비 완료!

## ✅ 완료된 작업

### 1. API 키 보안 처리
- ✅ `.env` 파일로 API 키 분리
- ✅ 환경 변수로만 접근 (`import.meta.env.VITE_KAKAO_API_KEY`)
- ✅ 빌드 파일에 키 노출 없음 (확인 완료)
- ✅ GitHub Actions에서 Secret 주입

### 2. 배포 자동화
- ✅ `.github/workflows/deploy.yml` 생성
- ✅ Vite 프로덕션 설정 완료
- ✅ GitHub Pages base path 설정

### 3. 카카오 맵 동적 로드
- ✅ `src/config.js`로 API 설정 분리
- ✅ 런타임에 스크립트 동적 로드
- ✅ 로컬/프로덕션 환경 분리

## 🚀 배포 3단계

### STEP 1: 카카오 개발자 콘솔 설정

https://developers.kakao.com/console/app

1. 앱 선택
2. **플랫폼** → **Web 플랫폼 추가**
3. **사이트 도메인** 입력:
   ```
   https://yourusername.github.io
   ```
   (yourusername을 실제 GitHub ID로 변경)
4. **저장**

**이렇게 하면 허용된 도메인에서만 API 작동!** 🔒

### STEP 2: GitHub Repository & Secrets

#### 2-1. Repository 생성
```
https://github.com/new
Repository 이름: SmartCitySun
Public 선택
Create repository 클릭
```

#### 2-2. Secrets 설정
```
Repository → Settings → Secrets and variables → Actions
New repository secret 클릭

Name: KAKAO_API_KEY
Secret: 11206d325cda00850eabe2dfbe04f35d

Add secret 클릭
```

#### 2-3. GitHub Pages 설정
```
Repository → Settings → Pages
Source: GitHub Actions 선택
```

### STEP 3: 코드 푸시 (자동 배포)

```bash
cd e:\SmartCitySun

# Git 초기화
git init
git branch -M main

# 원격 저장소 연결 (yourusername을 실제 ID로 변경!)
git remote add origin https://github.com/yourusername/SmartCitySun.git

# 모든 파일 추가 (.gitignore 자동 제외)
git add .

# 커밋
git commit -m "🌞 Initial commit: Smart City Sun Dashboard"

# 푸시 (자동 배포 시작!)
git push -u origin main
```

## 🌐 배포 URL

푸시 후 약 2-3분 뒤:

```
https://yourusername.github.io/SmartCitySun/
```

## 🔍 배포 확인

1. **GitHub Actions** 탭에서 워크플로우 확인
2. ✅ 녹색 체크마크 = 성공
3. ❌ 빨간 X = 실패 (로그 확인)

## 🔧 문제 해결

### ❌ 지도가 안 나온다

**원인**: 도메인 제한
**해결**: 카카오 개발자 콘솔에서 도메인 확인
```
https://yourusername.github.io
```

### ❌ 404 Not Found

**원인**: Base path 불일치
**해결**: `vite.config.js` 확인
```javascript
base: '/SmartCitySun/'  // Repository 이름과 일치해야 함
```

### ❌ Actions 실패

**원인**: Secrets 미설정
**해결**: GitHub Secrets에 `KAKAO_API_KEY` 확인

### ❌ API 키 노출

**해결**:
1. 카카오 개발자 콘솔에서 **즉시 키 재발급**
2. GitHub Secrets 업데이트
3. 재배포

## 🔒 보안 검증

### 로컬에서 검증
```bash
# 빌드
npm run build

# API 키 검색 (아무것도 나오면 안 됨)
grep -r "11206d" dist/

# 출력: (nothing) = 안전!
```

### GitHub에서 검증
```bash
# .env 파일이 Git에 없는지 확인
git ls-files | grep .env

# 출력: (nothing) = 안전!
```

## 🔄 업데이트 방법

코드 수정 후:
```bash
git add .
git commit -m "Update: 변경 내용"
git push
```

자동으로 재배포됩니다!

## 📊 최종 체크리스트

배포 전:
- [ ] `.env` 파일이 `.gitignore`에 있음
- [ ] GitHub Secrets 설정 완료
- [ ] 카카오 개발자 콘솔 도메인 등록
- [ ] `vite.config.js` base path 확인

배포 후:
- [ ] 카카오 지도 정상 작동
- [ ] 건물 마커 표시
- [ ] 발전량 계산 정상
- [ ] 차트 표시
- [ ] 모바일 반응형 확인

## 💡 유용한 명령어

### 로컬 테스트
```bash
npm run dev          # 개발 서버
npm run build        # 프로덕션 빌드
npm run preview      # 빌드 미리보기
```

### Git 명령어
```bash
git status           # 변경 파일 확인
git log --oneline    # 커밋 히스토리
git remote -v        # 원격 저장소 확인
```

## 🎯 Repository 이름이 다르다면?

예: `solar-dashboard`로 만들었다면

### 1. `vite.config.js` 수정
```javascript
base: '/solar-dashboard/',
```

### 2. 재배포
```bash
git add vite.config.js
git commit -m "Update base path"
git push
```

## 📚 참고 문서

- [DEPLOY_STEPS.md](DEPLOY_STEPS.md) - 상세 배포 가이드
- [README_DEPLOY.md](README_DEPLOY.md) - 보안 가이드
- [GITHUB_DEPLOY.md](GITHUB_DEPLOY.md) - 추가 정보

---

## 🎉 준비 완료!

**지금 바로 배포해보세요!**

1. 카카오 개발자 콘솔 설정
2. GitHub Secrets 설정
3. `git push`

약 2-3분 후 `https://yourusername.github.io/SmartCitySun/`에서 확인!

---

**💡 Tip**: 배포 후 브라우저 캐시 때문에 변경사항이 안 보이면 **Ctrl+Shift+R** (강력 새로고침)
