// 환경변수 파일(.env)에 적어둔 실제 배포 주소를 불러옵니다.
const BASE_URL = import.meta.env.VITE_BASE_URL

// GET /api/dashboard?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
// Notion "사전예방 알림 조회 (조건부)" 명세 기준.
// 실제 API는 HTTP 에러 코드가 아니라 200 + { success:false, message } 형태로 예외를 내려준다.
export async function fetchDashboardAlerts({ startDate, endDate } = {}) {
  try {
    const params = new URLSearchParams({ startDate, endDate })
    const res = await fetch(`${BASE_URL}/api/dashboard?${params}`)
    return await res.json()
  } catch (error) {
    return { success: false, message: '사전예방 알림을 불러오는 중 서버 연결에 실패했습니다.' }
  }
}
