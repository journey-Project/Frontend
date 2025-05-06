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

## 폴더 구조 

```

src/
├── assets/                          # 이미지, 폰트, 스타일 등 정적 리소스
│
├── components/
│   ├── Base/                        # 공통 UI 컴포넌트 (Button, Modal 등)
│   │   ├── BaseButton.vue
│   │   ├── BaseModal.vue
│   │   ├── BaseInput.vue
│   │   └── Pagination.vue
│
│   ├── Layout/                      # 전체 레이아웃 관련 컴포넌트
│   │   ├── Header.vue
│   │   ├── Footer.vue
│   │   ├── SideBar.vue
│   │   └── AuthGuard.vue
│
│   ├── Auth/                        # 로그인, 회원가입 등 인증 관련
│   │   ├── LoginForm.vue
│   │   ├── SignUpForm.vue
│   │   ├── EmailSelector.vue
│   │   ├── FindAccountForm.vue
│   │   └── SocialLoginButtons.vue
│
│   ├── Community/                   # 일반 커뮤니티 게시판 관련
│   │   ├── BoardFilter.vue         # 날짜, 검색 필터
│   │   ├── BoardTypeTab.vue        # 커뮤니티 / 동행자 탭
│   │   ├── CategorySelect.vue      # 게시판 선택 드롭다운
│   │   ├── CategoryTab.vue         # 국내/해외 탭
│   │   ├── CommentList.vue         # 댓글 목록
│   │   ├── CommentItem.vue         # 댓글 단일 항목
│   │   ├── CommentForm.vue         # 댓글 입력창
│   │   ├── CommunityEditor.vue     # 일반 게시글 에디터
│   │   ├── CountrySelectBar.vue    # 국가 필터 버튼 리스트
│   │   ├── HotPostList.vue         # HOT 게시글 리스트
│   │   ├── HotPostItem.vue         # HOT 게시글 카드
│   │   ├── PostTable.vue           # 게시글 목록 테이블
│   │   ├── PostRow.vue             # 게시글 단일 행
│   │   ├── PostContent.vue         # 게시글 상세 내용
│   │   ├── PostActions.vue         # 수정/삭제 드롭다운
│   │   ├── StoryCarousel.vue       # 유저 스토리 슬라이더
│   │   └── TagChip.vue             # [프랑스] 같은 태그 UI
│
│   ├── Companion/                   # 동행자 모집 게시판 관련
│   │   ├── CompanionCard.vue       # 동행자 카드
│   │   ├── CompanionFilter.vue     # 동행자 목록 필터
│   │   ├── CompanionWriteForm.vue  # 모집글 작성폼
│   │   ├── CompanionContent.vue    # 상세페이지 본문
│   │   ├── CompanionEditor.vue     # 에디터 + 여행정보 통합
│   │   ├── DateRangePicker.vue     # 여행 기간 선택
│   │   ├── HeadCountSelect.vue     # 희망 인원수 선택
│   │   ├── ImageUploader.vue       # 커버 이미지 등록
│   │   └── CompanionPreview.vue    # 홈에서 3개만 미리보기
│
│   ├── Home/                        # 메인 페이지 전용
│   │   ├── HeroBanner.vue          # 상단 이미지 배너
│   │   ├── SearchBar.vue           # 여행지 검색창
│   │   ├── PopularDestination.vue  # 인기 여행지 카드
│   │   ├── TravelPackageCard.vue   # 추천 여행 상품
│   │   └── DividerImage.vue        # 디자인용 배너
│   │
│   └── Profile/                     # 프로필 관련
│       ├── Avatar.vue              # 유저 이미지 or 이니셜
│       ├── HashtagManager.vue      # 해시태그 추가/삭제
│       ├── ProfileSideMenu.vue     # 왼쪽 사이드 메뉴
│       ├── ScheduleCalendar.vue    # 오른쪽 달력 캘린더
│       ├── scheduleCard.vue        # 여행 일정 카드
│       └── UserCard.vue            # 유저 정보 카드 (프로필 + 자기소개)
│
├── pages/
│   ├── HomePage.vue               # 메인 랜딩 페이지 (/)
│   ├── CommunityHome.vue          # 커뮤니티 대시보드
│   ├── CommunityBoard.vue         # 커뮤니티 게시판 목록
│   ├── CommunityDetail.vue        # 커뮤니티 게시글 상세
│   ├── CommunityWrite.vue         # 커뮤니티 게시글 작성
│   ├── CompanionBoard.vue         # 동행자 모집 게시글 목록
│   ├── CompanionDetail.vue        # 모집 게시글 상세
│   ├── CompanionWrite.vue         # 모집 게시글 작성
│   ├── LoginPage.vue              # 로그인 페이지
│   ├── ProfilePage.vue            # 프로필 페이지
│   └── SignUpPage.vue             # 회원가입 페이지
│
├── api/                            # API 모듈 모음
│   ├── authApi.js
│   ├── commentApi.js
│   ├── communityApi.js
│   ├── companionApi.js
│   ├── packageApi.js
│   ├── postApi.js
│   ├── searchApi.js 
│   └── storyApi.js
│
├── store/                          # Pinia 상태 관리
│   ├── useAuthStore.js
│   ├── usePostStore.js
│   └── useCompanionStore.js
│
├── router/                         # 라우팅 설정
│   └── index.js
│
├── styles/                         # SCSS 변수, 전역 스타일
│   ├── _mixins.scss                # rem 변환 함수, 반응형 정의
│   ├── _variables.scss             # 컬러, 폰트 등 변수 정의
│   └── main.scss                   # 전역 스타일 import
│
└── main.js                         # 앱 엔트리 포인트


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

