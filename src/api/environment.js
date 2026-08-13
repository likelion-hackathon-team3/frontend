import mock from '../data/environment-mock.json'

// GET /api/environment — 근무환경(D/E/N 출퇴근시간, 통근시간) 조회
export function fetchEnvironment() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mock), 300)
  })
}

// POST /api/environment — 근무환경 설정 (최초 1회)
export function saveEnvironment(payload) {
  return new Promise((resolve) => {
    console.log('[POST /api/environment]', payload)
    setTimeout(() => resolve({ success: true }), 400)
  })
}
