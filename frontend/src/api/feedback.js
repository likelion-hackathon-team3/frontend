// POST /api/feedback — 사용자 피드백 입력
// 명세 필드: 실제 수면시간, 카페인 섭취 여부·시간, 근무 후 피로도, 루틴 도움 정도
export function submitFeedback(payload) {
  return new Promise((resolve) => {
    console.log('[POST /api/feedback]', payload)
    setTimeout(() => resolve({ success: true }), 400)
  })
}
