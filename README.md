# 퇴근후애(愛) — 홈 화면 (초안1 · WorkWell 분석리포트형)

`퇴근후애-app_백업_초안1_WorkWell분석리포트형`에서 **홈(분석리포트) 화면만** 따로 뽑아낸 폴더입니다.
프론트엔드 담당 파트(홈 화면)만 독립적으로 확인/제출할 때 쓰기 위한 버전이며, 원본 백업 폴더는 건드리지 않았습니다.

## 실행 방법

```bash
npm install
npm run dev
```

## 포함된 것

- `src/screens/HomeScreen.jsx` — 홈(분석리포트) 화면
- `src/components/Sidebar.jsx`, `HomeHeader.jsx`, `StatsRow.jsx`, `TransitionSummary.jsx`, `FatigueChart.jsx`, `AICommentBar.jsx` — 홈 화면 구성 컴포넌트
- `src/api/dashboard.js`, `src/data/home-mock.json`, `src/data/dashboard-mock.json` — 홈 화면용 목업 API/데이터
- `src/App.jsx` — 라우트는 `/`(홈)만 실제로 연결되어 있고, 사이드바의 다른 메뉴(근무표 입력/타임라인/피드백&기록/설정)는 다른 팀원 담당 영역이라 안내 화면만 뜹니다.

## 원본과의 차이

디자인·코드는 원본 백업과 100% 동일합니다. 다른 화면 파일을 아예 포함하지 않고 라우팅만 홈 중심으로 좁힌 것 외에는 변경 사항이 없습니다.
