// POST /api/feedback — 사용자 피드백 제출 (가짜 백엔드 통신)
export function submitFeedback(payload) {
  return new Promise((resolve) => {
    // 💡 백엔드로 날아가는 데이터를 콘솔창에서 확인할 수 있게 찍어줍니다.
    console.log("[POST /api/feedback] 프론트엔드에서 쏴준 데이터:", payload);

    // 실제 인터넷 통신이 걸리는 시간(0.5초)을 흉내 냅니다.
    setTimeout(() => {
      // 명세서의 '응답 필드 성공 예시'와 똑같은 형태로 결과를 돌려줍니다.
      resolve({
        success: true,
        message: "피드백이 성공적으로 등록되었습니다.",
      });
    }, 500);
  });
}
