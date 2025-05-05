# 🧭 Journey 프로젝트 개발 가이드

> 📝 **목적**  Vue 3 기반 **Journey** 프론트엔드 개발을 시작하기 전에 모든 팀원이 동일한 규칙과 흐름을 이해하도록 정리한 문서입니다.

---

## 📒 목차

1. [기술 스택](#기술-스택)
2. [저장소 & 브랜치 전략](#저장소--브랜치-전략)
3. [커밋 메시지 규칙](#커밋-메시지-규칙)
4. [개발 흐름](#개발-흐름)
5. [코드 스타일 & 네이밍](#코드-스타일--네이밍)
6. [폴더 구조](#폴더-구조)
7. [환경 변수 & 보안](#환경-변수--보안)
8. [CI/CD 파이프라인](#cicd-파이프라인)

---

## 기술 스택

| 레이어              | 선택                                              | 비고                      |
|-------------------|-------------------------------------------------|--------------------------|
| 프레임워크         | **Vue 3** (Composition API)                    |                          |
| 번들러 / DevServer | **Vite**                                        | 빠른 HMR 지원             |
| 언어               | **JavaScript (ES202x)**                         |                          |
| 상태 관리          | **Pinia**                                       | `useXStore` 방식          |
| 라우팅             | **Vue Router**                                  | History 모드              |
| 스타일링           | 🟡 **SCSS (모듈화 적용 예정)**                  | CSS 변수 vs SCSS 변수 논의 중 |
| 테스트             | **Vitest** + Vue Test Utils                     | 단위 및 컴포넌트 테스트   |
| 린트 / 포맷        | **ESLint** (`eslint-plugin-vue`) + **Prettier**| `.vue`, `.js` 통일        |
| UI 라이브러리(선택) | 🔲 **미정 (Element Plus? Tailwind?)**           | 필요 여부 및 방향 논의 예정 |


---

## 저장소 & 브랜치 전략

세 명 규모이므로 **GitHub Flow**를 사용합니다.

```text
main                  # 항상 배포 가능한 상태
└─ feat/<issue|-짧은-설명>   # 기능 개발 브랜치
└─ fix/<issue|-짧은-설명>    # 버그 수정 브랜치
└─ chore/<주제>              # 설정·문서 등
```

* **Workflow**: Issue 생성 → 브랜치 → 작업 → PR → 리뷰 → Rebase & Merge → 삭제
* `main` 보호 규칙: **1명 이상 리뷰 + CI 통과**가 있어야 머지 가능
* Merge 방식: **Rebase & merge** (커밋 로그 간결화)

---

## 커밋 메시지 규칙

**Conventional Commits** 양식을 사용합니다.

```
<type>(scope): <subject>
```

| type     | 설명                           |
| -------- | ---------------------------- |
| feat     | 새로운 기능                       |
| fix      | 버그 수정                        |
| docs     | 문서 수정                        |
| style    | 코드 포맷·세미콜론·CSS 등 기능 변화 없는 수정 |
| refactor | 리팩터링 (버그 수정 ×, 기능 추가 ×)      |
| test     | 테스트 추가·수정                    |
| chore    | 빌드/도구/잡무                     |
| ci       | CI/CD 설정 변경                  |

예시: `feat: 소셜 로그인 모달 구현`

---

## 개발 흐름

1. **main 최신화**: `git pull origin main`
2. **브랜치 생성**: `git checkout -b feat/45-login-modal`
3. **작업 & 커밋**: 작동 가능한 최소 단위로 커밋 (ESLint/Prettier 통과)
4. **푸시 & PR**: GitHub에서 PR 생성, 템플릿 작성
5. **리뷰**: 1명 이상 승인 + CI (코드 리뷰 필수) ✅
6. **Rebase & Merge** → 브랜치 삭제

---

## 코드 스타일 & 네이밍

| 항목          | 규칙                     | 예시                                                |
| ----------- | ---------------------- | ------------------------------------------------- |
| 변수·함수       | `camelCase`            | `userProfile`                                     |
| 컴포넌트 파일     | `PascalCase.vue`       | `SignUpModal.vue`                                 |
| Pinia Store | `useXStore.js`         | `useAuthStore.js`                                 |
| CSS 클래스     | BEM 또는 Utility (초기 결정) | `c-card__title`                                   |
| i18n 키      | `dot.case`             | `profile.title`                                   |
| 임포트 경로      | `@` → `src/`           | `import Modal from '@/components/Base/Modal.vue'` |

Prettier + ESLint `--fix` 로 포맷 자동 적용.

---

## 폴더 구조 (제안)
```
journey-frontend/
├─ public/
│   └─ index.html               # 앱 진입점임
├─ src/
│   ├─ assets/                     # 이미지나 폰트 들어갈 예정
│   ├─ components/
│   │   ├─ Base/                 # 버튼, 모달, 인풋 등 공통 UI 컴포넌트
│   │   ├─ Layout/             # Header, Footer, Sidebar, AuthGuard(페이지 전체 감싸는 부분 구현)
│   │   ├─ Auth/                 # LoginForm, SignUpForm, SocialBtn(로그인/회원가입 관련 컴포넌트들)
│   │   ├─ Board/               # PostList, PostItem, CommentList, Editor(게시판 관련 컴포넌트들 - 글 목록, 댓글 목록)
│   │   ├─ Home/               # HeroCarousel, SearchBar(홈 화면 전용 컴포넌트 (배너, 검색 등))
│   │   └─ Profile/              # AvatarUpload, ProfileForm(프로필 전용 UI (아바타 업로드, 프로필 수정 폼 등))
│   ├─ pages/                      # 라우트 진입 컴포넌트
│   │   ├─ HomePage.vue   # 홈화면
│   │   ├─ LoginPage.vue        # 로그인화면
│   │   ├─ SignUpPage.vue         # 회원가입화면
│   │   ├─ CompanionBoardPage.vue        # /companions (동행자 모집 게시판)
│   │   ├─ CommunityBoardPage.vue        # /community/:country (국가별 커뮤니티 게시판)
│   │   ├─ PostDetailPage.vue                      # /boards/:type/:id (게시글 상세 페이지)
│   │   └─ ProfilePage.vue # 마이페이지 (닉네임, 프로필 수정 등)
│   ├─ router/
│   │   ├─ index.js      # 라우터 & 가드
│   │   └─ routes.js       # 경로 정의 모음
│   ├─ stores/      # Pinia
│   │   ├─ useAuthStore.js  # 로그인 상태, 토큰
│   │   ├─ useUserStore.js    # 사용자 정보 (이름, 이메일 등)
│   │   └─ useBoardStore.js     # 게시판 글 목록, 선택된 게시글 등
│   ├─ services/                  # API 래퍼
│   │   ├─ api.js                 # Axios 인스턴스 + 인터셉터
│   │   └─ authService.js         # 로그인, 회원가입, 소셜 로그인 API 함수들 정리
│   ├─ utils/
│   │   ├─ validators.js  # 이메일 형식 검사 같은 함수들
│   │   └─ constants.js  # 게시판 종류, 국가 리스트 같은 고정 데이터 상수
│   ├─ styles/
│   │   ├─ _variables.scss        # 색상, 폰트 크기, mixin 등을 변수로 저장
│   │   └─ main.scss                  # 논의 필요
│   ├─ App.vue
│   └─ main.js
├─ tests/                         # Vitest + Vue Test Utils(필요할지 모르겠음)
│   ├─ components/
│   └─ stores/
├─ .env.local.example
├─ vite.config.js
└─ package.json

```

---

## 환경 변수 & 보안

* **로컬**: `.env.local` – Git ignored
* **CI**: GitHub `Secrets` – 예) `VITE_API_BASE_URL`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`
* 코드에서 접근: `import.meta.env.VITE_*`

---



## CI/CD 파이프라인

### 도구

* **GitHub Actions**: PR 및 `main` 푸시 시 자동 실행
* **AWS S3 + CloudFront**: 정적 파일 배포 & 글로벌 CDN

