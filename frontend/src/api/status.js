import wearableMock from '../data/wearable-mock.json'
import analysisMock from '../data/analysis-mock.json'
import homeTodayMock from '../data/home-today-mock.json'

// POST /api/daily-status — 현재 피로도 입력 (낮음/보통/높음)
export function submitDailyStatus(level) {
  return new Promise((resolve) => {
    console.log('[POST /api/daily-status]', { fatigueLevel: level })
    setTimeout(() => resolve({ success: true }), 300)
  })
}

// GET /api/wearable-data — 웨어러블 데이터 조회 (목업)
export function fetchWearableData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(wearableMock), 500)
  })
}

// GET /api/analysis — 통합 분석 조회 (근무 전환 및 개인 상태)
// scenario: 'success' | 'noNextShift' | 'envNotSet'
export function fetchAnalysis(scenario = 'success') {
  return new Promise((resolve) => {
    setTimeout(() => resolve(analysisMock[scenario] ?? analysisMock.success), 700)
  })
}

// 홈 대시보드 상단 "오늘/다음 근무" 카드용 (근무표+근무환경을 조합한 뷰).
// 명세서에 전용 엔드포인트가 없어 프론트에서 조합해 보여준다.
export function fetchTodayAndNextShift() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(homeTodayMock), 300)
  })
}
