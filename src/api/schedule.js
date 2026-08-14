import mock from '../data/schedule-mock.json'

// GET /api/schedules — 등록된 월간 근무표 조회
export function fetchSchedule() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mock.registered), 400)
  })
}

// POST /api/schedules/recognize — 근무표 사진 업로드 → AI/OCR 인식 (목업)
// 실제로는 이미지를 업로드하지만, 목업에서는 파일 유무와 상관없이 정해진 인식 결과를 반환한다.
export function recognizeSchedule() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({
      success: true,
      recognizedSchedules: mock.recognizeResult?.schedules || [],
      failedDates: []
    }), 1200)
  })
}

// POST /api/schedules — 근무표 저장 (AI 확정 / 수동입력 / 수정 공용)
export function saveSchedule(payload) {
  return new Promise((resolve) => {
    console.log('[POST /api/schedules]', payload)
    setTimeout(() => resolve({ success: true, savedCount: payload.schedules?.length || 0 }), 400)
  })
}

// DELETE /api/schedules?date=
export function deleteScheduleDate(date) {
  return new Promise((resolve) => {
    console.log('[DELETE /api/schedules]', date)
    setTimeout(() => resolve({ success: true, message: "삭제되었습니다." }), 300)
  })
}
