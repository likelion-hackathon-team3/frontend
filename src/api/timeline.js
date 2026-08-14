// GET /api/timeline — AI 개인화 웰니스 타임라인 조회 (경량화 버전)
export function fetchTimeline(date = "") {
  return new Promise((resolve) => {
    console.log(`[GET /api/timeline] 요청 날짜: ${date || "오늘"}`);

    setTimeout(() => {
      resolve({
        success: true,
        isFallback: false,
        data: {
          // 💡 화면 상단에 띄울 제목과 부제목
          pageTitle: "오늘부터 내일 Day 근무 전까지의 맞춤 계획이에요",
          pageSubtitle: "회복을 최우선으로 한 개인 맞춤 루틴입니다.",

          // 💡 타임라인 내용 (수면 강조 박스는 highlight 속성으로 편입!)
          timelineItems: [
            {
              time: "23:30",
              title: "저녁 식사",
              description: "단백질 위주의 가벼운 식사를 권장해요.",
              category: "MEAL",
            },
            {
              time: "00:10",
              title: "취침 준비",
              description: "조명 낮추기, 샤워, 디지털 기기 사용 줄이기",
              category: "PREPARATION",
            },
            {
              time: "00:40",
              title: "취침 (권장 취침 시간)",
              description: "수면 목표 5시간 10분",
              category: "SLEEP",
              highlight: "권장 수면 시간: 5시간 10분", // 👈 심플해진 하이라이트 로직
            },
            {
              time: "05:50",
              title: "기상",
              description: "햇빛을 10분 이상 쬐고 물 한 잔을 마셔요.",
              category: "WAKE_UP",
            },
            {
              time: "06:20",
              title: "아침 식사",
              description: "복합탄수화물과 단백질을 섭취하세요.",
              category: "MEAL",
            },
            {
              time: "07:00",
              title: "D 근무 시작",
              description: "파이팅! 오늘도 잘 해내요!",
              category: "WORK",
            },
          ],

          // 💡 오른쪽 패널에 띄울 추천 포인트
          recommendations: [
            "오늘은 수면 확보가 가장 중요해요.",
            "카페인은 14시 이후 섭취를 피해 주세요.",
            "낮잠이 필요하면 20분 이내로 짧게 유지하세요.",
          ],
        },
      });
    }, 300);
  });
}
