# ⚠️ GitHub Pages 활성화 오류 해결

## 문제
```
Get Pages site failed. Please verify that the repository has Pages enabled
```

## ✅ 해결 방법 (2가지)

### 방법 1: GitHub 웹에서 설정 (권장)

#### 1. Repository Settings로 이동
```
https://github.com/mintai09/SmartCitySun/settings/pages
```

#### 2. Pages 설정 확인
- **Source**: `GitHub Actions` 선택
- 자동 저장됨

#### 3. 재배포 트리거
```bash
cd e:\SmartCitySun
git commit --allow-empty -m "Trigger GitHub Pages deployment"
git push
```

### 방법 2: 워크플로우 수정 (자동 활성화)

워크플로우에 자동 활성화 추가했습니다.

Actions 탭에서 다시 실행:
1. https://github.com/mintai09/SmartCitySun/actions
2. 실패한 워크플로우 클릭
3. 우측 상단 **Re-run all jobs** 클릭

---

## 🔍 확인 사항

### Repository가 Public인지 확인
```
https://github.com/mintai09/SmartCitySun
```

좌측 상단에 **Public** 표시가 있어야 함

Private이면:
1. Settings → Danger Zone
2. Change visibility → Make public

### Pages 메뉴가 보이는지 확인
Settings → Pages 메뉴가 있어야 함

없으면 Repository가 Private일 가능성 높음

---

## 🚀 빠른 해결

### 1단계: Pages 활성화
```
https://github.com/mintai09/SmartCitySun/settings/pages
Source: GitHub Actions 선택
```

### 2단계: 빈 커밋 푸시
```bash
cd e:\SmartCitySun
git commit --allow-empty -m "Enable GitHub Pages"
git push
```

### 3단계: 확인
Actions 탭에서 워크플로우 진행 확인

---

## 완료 후

배포 성공 시:
```
https://mintai09.github.io/SmartCitySun/
```

2-3분 후 접속 가능!
