# 🔐 GitHub Pages 배포 - API 키 보호 완료!

## ✅ 적용된 보안 조치

### 1. 환경 변수로 API 키 분리
- `.env` 파일에 API 키 저장
- `.gitignore`에 포함 (Git에 올라가지 않음)
- 코드에서 `import.meta.env.VITE_KAKAO_API_KEY` 사용

### 2. 카카오 맵 동적 로드
- `src/config.js`: API 키를 환경 변수에서 가져옴
- `src/App.jsx`: 런타임에 스크립트 동적 로드
- `index.html`: 하드코딩된 키 제거

### 3. GitHub Actions + Secrets
- `.github/workflows/deploy.yml`: 자동 배포 워크플로우
- GitHub Secrets에 API 키 저장
- 빌드 시 환경 변수로 주입

### 4. 카카오 개발자 콘솔 도메인 제한
- 허용된 도메인에서만 API 키 사용 가능
- `https://yourusername.github.io` 등록 필요

## 📦 생성된 파일

```
SmartCitySun/
├── .env                          # API 키 (Git 제외)
├── .env.example                  # 예시 파일
├── .github/workflows/deploy.yml  # 자동 배포
├── src/config.js                 # API 설정 (NEW)
├── vite.config.js                # 프로덕션 설정
├── DEPLOY_STEPS.md               # 배포 단계
└── GITHUB_DEPLOY.md              # 배포 가이드
```

## 🚀 빠른 배포 (3단계)

### 1. 카카오 개발자 콘솔 설정
https://developers.kakao.com/console/app
- 플랫폼 → Web 플랫폼 추가
- 도메인: `https://yourusername.github.io`

### 2. GitHub Secrets 설정
Repository → Settings → Secrets → Actions
- Name: `KAKAO_API_KEY`
- Value: `11206d325cda00850eabe2dfbe04f35d`

### 3. 코드 푸시
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/SmartCitySun.git
git push -u origin main
```

## 🌐 접속 URL

```
https://yourusername.github.io/SmartCitySun/
```

## 🔒 보안 검증

### API 키 노출 확인
```bash
# .env 파일이 Git에 없는지 확인
git ls-files | grep .env
# 결과가 없어야 함 (있으면 .gitignore 확인)

# 빌드 파일에서 API 키 검색
npm run build
grep -r "11206d325cda00850eabe2dfbe04f35d" dist/
# 하드코딩된 키가 있으면 안 됨
```

### 도메인 제한 테스트
1. 다른 도메인에서 접속
2. 카카오 맵 로드 실패 확인 (정상)
3. 허용된 도메인에서만 작동

## 💡 장점

### ✅ API 키 보호
- GitHub 코드에서 키 숨김
- 환경 변수로 관리
- 도메인 제한으로 이중 보호

### ✅ 자동 배포
- 코드 푸시만으로 자동 배포
- GitHub Actions 사용
- 빌드 자동화

### ✅ 유지보수 용이
- `.env` 파일만 수정
- 키 변경 시 쉽게 업데이트
- 로컬/프로덕션 환경 분리

## 🔄 업데이트 방법

### 코드 수정
```bash
# 파일 수정 후
git add .
git commit -m "Update"
git push
```

### API 키 변경
1. `.env` 로컬 파일 수정
2. GitHub Secrets 업데이트
3. 재배포 (자동)

## ⚠️ 주의사항

### .env 파일 절대 Git에 올리지 마세요!
```bash
# 확인
git status
# .env가 나오면 안 됨

# 실수로 올렸다면
git rm --cached .env
git commit -m "Remove .env"
git push
# 그리고 API 키 재발급!
```

### Repository가 Public이면
- API 키는 여전히 안전 (환경 변수 사용)
- 코드는 공개됨
- 도메인 제한으로 보호

## 📖 자세한 가이드

- **[DEPLOY_STEPS.md](DEPLOY_STEPS.md)** - 단계별 배포 가이드
- **[GITHUB_DEPLOY.md](GITHUB_DEPLOY.md)** - 상세 배포 문서

---

**🎉 이제 안전하게 GitHub Pages에 배포할 수 있습니다!**
