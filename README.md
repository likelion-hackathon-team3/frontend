# 퇴근후애(愛) 프론트엔드

교대근무자를 위한 AI 웰니스 앱 "퇴근후애(愛)"의 프론트엔드입니다. 근무표를 등록하면 현재 컨디션과 웨어러블 데이터를 바탕으로 다음 근무까지의 맞춤 웰니스 타임라인을 제안합니다.

> 이 사본은 **홈 대시보드 담당분 제출용**이라 `App.jsx`에 `/`(홈) 라우트만 연결되어 있고, 나머지 화면은 사이드바 클릭 시 빈 화면으로 넘어갑니다. 다른 화면 파일은 참고용으로 남아있습니다.

## 기술 스택

- React 18
- Vite 5
- Tailwind CSS 3
- react-router-dom v6 (`HashRouter`)
- lucide-react (아이콘)

## 시작하기

### Prerequisites

- Node.js 18 이상
- npm (프로젝트에 `package-lock.json`이 포함되어 있어 npm 사용을 기준으로 합니다)

### Installation

```bash
git clone <레포 주소>
cd 퇴근후애-app
npm install
```

### Environment Variables

현재는 모든 API가 `src/api/*.js` 안의 목업 함수(`Promise` + `setTimeout`)로 동작하기 때문에 별도의 `.env` 설정 없이 바로 실행됩니다. 실제 백엔드 주소가 확정되면 `.env.example`을 추가하고 `VITE_API_BASE_URL` 등의 변수를 안내할 예정입니다.

### Running the App

```bash
npm run dev
```

`http://localhost:5173`에서 확인할 수 있습니다.

## 폴더 구조

```
src/
  api/         화면별 API 목업 함수 (dashboard.js, schedule.js, environment.js, status.js, feedback.js)
  components/  여러 화면에서 재사용하는 공통 컴포넌트 (Sidebar, MonthCalendar, StepIndicator, PreventiveAlerts)
  data/        API 목업이 참조하는 JSON 더미 데이터
  screens/     라우트 1개당 화면 1개 (하위 폴더 checkin/ 은 웰니스 분석 4단계 스텝)
  App.jsx      라우트 정의
  main.jsx     엔트리 포인트
```

## 스크립트 명령어

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 (Vite, HMR 포함) |
| `npm run build` | 프로덕션 빌드 (`dist/` 생성) |
| `npm run preview` | 빌드 결과물 로컬 미리보기 |

별도의 테스트·린트 스크립트는 아직 구성되어 있지 않습니다.

---

## 라우트 & 담당 화면

전체 화면 기준 표입니다.

| 라우트 | 화면 | 담당 파일 | 이 사본에서 |
| --- | --- | --- | --- |
| `/onboarding` | 온보딩 (서비스 소개, 시작하기) | `screens/OnboardingScreen.jsx` | 연결 |
| `/schedule/upload` | 근무표 업로드 (사진 업로드 / AI 인식) | `screens/ScheduleUploadScreen.jsx` | 연결 |
| `/schedule/confirm` | 인식 결과 확인·수정 (캘린더) | `screens/ScheduleConfirmScreen.jsx` | 연결 |
| `/schedule/hours` | 근무시간·통근시간 설정 (최초 1회) | `screens/EnvironmentSetupScreen.jsx` | 연결 |
| `/home` | 홈 대시보드 (인사말, 오늘/다음 근무, 사전예방 카드, CTA) | `screens/HomeScreen.jsx` | 연결 |
| `/schedule` | 근무표 관리 (조회, 재업로드) | `screens/ScheduleScreen.jsx` | 연결 |
| `/checkin` | 웰니스 분석 4단계 (컨디션→웨어러블→분석→타임라인) | `screens/CheckinFlow.jsx`, `screens/checkin/*.jsx` | 미연결 |
| `/feedback` | 피드백 (타임라인 마지막 단계에서 진입, 독립 메뉴 아님) | `screens/FeedbackScreen.jsx` | 미연결 |
| `/settings` | 설정 | `screens/SettingsScreen.jsx` | 연결 |

홈 화면이 실제로 쓰는 파일: `screens/HomeScreen.jsx`, `components/Sidebar.jsx`, `components/PreventiveAlerts.jsx`, `components/MonthCalendar.jsx`(스타일 상수만), `api/status.js`, `api/dashboard.js`, `data/home-today-mock.json`, `data/dashboard-mock.json`

## 디자인 시스템

새로 화면·컴포넌트를 만들 때도 아래 팔레트를 따라주세요 (`tailwind.config.js`에 등록되어 바로 클래스명으로 사용 가능).

| 토큰 | 색상 | 용도 |
| --- | --- | --- |
| `bg` | #F8F7FC | 전체 배경 |
| `card` | #FEFDFB | 카드 배경 |
| `ink` | #2E2A38 | 기본 텍스트 |
| `muted` | #A79BC0 | 보조 텍스트 |
| `coral` | #F2794A | 전환/경고 |
| `terracotta` | #C98A5D | 피로도 관련 |
| `sage` | #6FAE8F | 긍정/좋음 |
| `lavender` / `lavender-deep` | #9B87C4 / #8C7AE6 | 브랜드 강조색, 버튼 |
| `gold` | #D9A441 | 루틴 관련 |

자주 쓰는 패턴:

- 카드: `bg-card rounded-2xl border border-lavender/10 p-5`
- 메인 버튼: `text-white bg-lavender-deep rounded-xl px-5 py-2.5 hover:opacity-90`
- 보조 버튼: `text-ink border border-lavender/20 rounded-xl px-5 py-2.5 hover:bg-bg`
- 화면 레이아웃: `<div className="min-h-screen bg-bg flex"><Sidebar /><main className="flex-1 p-8">...</main></div>`

## API 연동 규칙

모든 API는 `src/api/*.js`의 목업 함수로 시뮬레이션되어 있습니다. 실제 API가 나오면 함수 내부의 `Promise`/`setTimeout` 부분만 `fetch`로 교체하면 되도록 짜여 있습니다.

가장 중요한 규칙: 실제 API는 **HTTP 에러 코드가 아니라 200 응답 + `{ success: boolean, message?: string }`** 형태로 실패를 내려줍니다. 컴포넌트에서는 `try/catch`가 아니라 `res.success` 값으로 분기해야 합니다.

```js
const res = await fetchSomething()
if (res.success) {
  // 정상 처리
} else {
  // res.message로 에러 표시
}
```

| 화면/기능 | 엔드포인트 | 파일 |
| --- | --- | --- |
| 근무표 업로드 인식 | `POST /api/schedules/recognize` | `src/api/schedule.js` |
| 근무표 저장/조회/삭제 | `POST, GET, DELETE /api/schedules` | `src/api/schedule.js` |
| 근무환경 설정/조회 | `POST, GET /api/environment` | `src/api/environment.js` |
| 현재 피로도 입력 | `POST /api/daily-status` | `src/api/status.js` |
| 웨어러블 데이터 | `GET /api/wearable-data` | `src/api/status.js` |
| 통합 분석 조회 | `GET /api/analysis` | `src/api/status.js` |
| 사전예방 알림 | `GET /api/dashboard` | `src/api/dashboard.js` |
| 사용자 피드백 | `POST /api/feedback` | `src/api/feedback.js` |
| 웰니스 타임라인 | `GET, POST /api/timeline` | `src/data/timeline-mock.json` (아직 목업만, fetch 미연동) |
| 개인화 보정 | `GET /api/personalization` | 미구현 (추가해야함) |

전체 15개 엔드포인트 명세는 Notion "API 명세서" 페이지 참고.

## Git 협업 규칙

**브랜치**

- `main` — 항상 실행 가능한 상태만 유지
- 작업은 `feature/{담당화면}` 브랜치에서 (예: `feature/home`, `feature/checkin`, `feature/schedule`)

**커밋 메시지**

```
feat: 홈 대시보드 사전예방 카드 조건부 노출 구현
fix: 근무표 업로드 시 파일 선택 안 되던 버그 수정
style: 버튼 여백 조정
```

**PR 규칙**

- PR 제목에 담당 화면 명시, 본문에 스크린샷 첨부
- 최소 1명 리뷰 후 머지
- 머지는 순서 맞춰서 진행 (동시에 여러 PR 머지하면 충돌 위험)

**충돌 줄이는 팁**

- `App.jsx`, `Sidebar.jsx` 등 공통 파일은 수정 전 단톡방에 먼저 알리기
- 각자 담당 라우트/화면 파일 위주로만 수정
- 새 화면을 추가할 땐 기존 화면 파일을 복사해서 시작하면 스타일이 자동으로 맞춰짐

## 코드 컨벤션

- 컴포넌트는 함수형 + `export default function ComponentName()`
- 화면 컴포넌트는 항상 `<Sidebar />` + `<main className="flex-1 p-8">` 구조로 시작
- 로딩/에러 상태는 `useState({ status: 'loading' | 'success' | 'error', data, message })` 패턴 재사용
- 아이콘은 `lucide-react`에서만 가져오기

## 참고 문서

- `1. 사용자 플로우.pdf`, `2. MVP 기능 범위표.pdf`, `3. 기능별 입력·처리·출력·예외 명세.pdf`
- Notion API 명세서 (팀 워크스페이스)
