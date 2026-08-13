import homeMock from '../data/home-mock.json'
import dashboardMock from '../data/dashboard-mock.json'

// 홈 화면 상단 통계 / 전환별 피로도 요약·추이 차트는 Notion API 명세서에
// 아직 해당 엔드포인트가 없다 (전 항목 "예정" 상태). 백엔드가 확정되기 전까지
// 프론트에서만 쓰는 임시 목업이며, 실제 API가 나오면 이 함수 내부만 교체하면 된다.
export function fetchHomeSummary(scenario = 'success') {
  return new Promise((resolve) => {
    setTimeout(() => resolve(homeMock[scenario] ?? homeMock.success), 500)
  })
}

// GET /api/dashboard?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
// Notion "사전예방 알림 조회 (조건부)" 명세 기준.
// 실제 API는 HTTP 에러 코드가 아니라 200 + { success:false, message } 형태로 예외를 내려준다.
export function fetchDashboardAlerts(scenario = 'success', { startDate, endDate } = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const entry = dashboardMock[scenario] ?? dashboardMock.success
      resolve(entry)
    }, 500)
  })
}

export const HOME_SCENARIOS = [
  { value: 'success', label: 'success (데이터 있음)' },
  { value: 'empty', label: 'empty (근무 기록 없음)' },
]

export const DASHBOARD_SCENARIOS = [
  { value: 'success', label: 'success (알림 있음)' },
  { value: 'empty', label: 'success (알림 없음)' },
  { value: 'missingParams', label: '필수값 누락' },
  { value: 'invalidDateFormat', label: '날짜 형식 오류' },
  { value: 'dateRangeInvalid', label: '조회 기간 오류' },
  { value: 'noSchedule', label: '등록된 근무표 없음' },
  { value: 'serverError', label: '서버 오류' },
]
