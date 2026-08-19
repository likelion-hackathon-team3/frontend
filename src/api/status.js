import homeTodayMock from '../data/home-today-mock.json'

// 환경변수 파일(.env)에 적어둔 실제 배포 주소를 불러옵니다.
const BASE_URL = import.meta.env.VITE_BASE_URL

// POST /api/daily-status — 현재 피로도 입력 (낮음/보통/높음)
export async function submitDailyStatus(level) {
  try {
    const res = await fetch(`${BASE_URL}/api/daily-status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fatigueLevel: level }),
    })
    const data = await res.json()
    if (!res.ok) {
      return { success: false, message: data.message || '피로도 저장에 실패했습니다.' }
    }
    return data
  } catch (error) {
    return { success: false, message: '피로도 저장 중 서버 연결에 실패했습니다.' }
  }
}

// GET /api/wearable-data — 웨어러블 데이터 조회
// 백엔드는 { sleepHours, activityLevel, heartRate } 형태로 내려주므로,
// 화면에서 쓰는 형태(sleepLabel 표시 문자열, activitySteps)로 여기서 변환한다.
export async function fetchWearableData() {
  try {
    const res = await fetch(`${BASE_URL}/api/wearable-data`)
    const data = await res.json()
    if (!res.ok) return null
    return {
      sleepHours: data.sleepHours,
      sleepLabel: formatHoursLabel(data.sleepHours),
      activitySteps: data.activityLevel,
      heartRate: data.heartRate,
    }
  } catch (error) {
    console.error('웨어러블 데이터 조회 실패:', error)
    return null
  }
}

// GET /api/analysis — 통합 분석 조회 (근무 전환 및 개인 상태)
export async function fetchAnalysis() {
  try {
    const res = await fetch(`${BASE_URL}/api/analysis`)
    const data = await res.json()
    if (!res.ok) {
      // 서버가 예외를 { success:false, message } 형태로 안 내려주고
      // 500 에러 페이지를 그대로 줄 때를 대비한 방어 처리.
      return { success: false, message: data.message || '분석 데이터를 불러오지 못했습니다.' }
    }
    return data
  } catch (error) {
    return { success: false, message: '분석 데이터를 불러오는 중 서버 연결에 실패했습니다.' }
  }
}

// nextShiftMinutes(분) 표시용 포맷터.
// 남은 시간 자체는 백엔드가 계산해 내려주며, 여기서는 표시 문자열로만 변환한다.
export function formatShiftMinutes(minutes) {
  if (minutes == null) return null
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours === 0) return `${mins}분`
  if (mins === 0) return `${hours}시간`
  return `${hours}시간 ${mins}분`
}

// availableHours(시간, 소수 가능) 표시용 포맷터. 위와 동일한 원리로 분 단위로 변환해 재사용한다.
export function formatHoursLabel(hours) {
  if (hours == null) return null
  return formatShiftMinutes(Math.round(hours * 60))
}

// transitionType("OFF_TO_EVENING" 형태)을 화면에 보여줄 라벨로 변환한다.
const SHIFT_SHORT = { DAY: 'D', EVENING: 'E', NIGHT: 'N', OFF: 'OFF' }
const SHIFT_FULL = { DAY: 'Day', EVENING: 'Evening', NIGHT: 'Night', OFF: 'Off' }
export function formatTransitionLabel(transitionType) {
  if (!transitionType) return { short: '-', full: '' }
  const [from, to] = transitionType.split('_TO_')
  return {
    short: `${SHIFT_SHORT[from] || from} → ${SHIFT_SHORT[to] || to}`,
    full: `${SHIFT_FULL[from] || from} → ${SHIFT_FULL[to] || to}`,
  }
}

export const RISK_LABEL = { NORMAL: '정상', CAUTION: '주의', DANGER: '위험' }

// 홈 대시보드 상단 "오늘/다음 근무" 카드용 (근무표+근무환경을 조합한 뷰).
// 명세서에 전용 엔드포인트가 없어 프론트에서 조합해 보여준다.
export function fetchTodayAndNextShift() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(homeTodayMock), 300)
  })
}
