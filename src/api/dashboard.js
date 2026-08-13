import dashboardMock from '../data/dashboard-mock.json'

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

export const DASHBOARD_SCENARIOS = [
  { value: 'success', label: 'success (알림 있음)' },
  { value: 'empty', label: 'success (알림 없음)' },
  { value: 'missingParams', label: '필수값 누락' },
  { value: 'invalidDateFormat', label: '날짜 형식 오류' },
  { value: 'dateRangeInvalid', label: '조회 기간 오류' },
  { value: 'noSchedule', label: '등록된 근무표 없음' },
  { value: 'serverError', label: '서버 오류' },
]
