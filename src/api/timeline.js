// src/api/timeline.js

const BASE_URL = import.meta.env.VITE_BASE_URL;

// GET /api/timeline — 실제 백엔드 연동
export const fetchTimeline = async (date = "") => {
  try {
    // 날짜가 있으면 쿼리 파라미터로 붙이고, 없으면 말고!
    const query = date ? `?date=${date}` : "";

    // 진짜 백엔드 주소로 통신 시작!
    const response = await fetch(`${BASE_URL}/api/timeline${query}`);
    const data = await response.json();

    // 에러 처리 (방어적 프로그래밍)
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "타임라인을 불러오지 못했습니다.",
      };
    }

    return data;
  } catch (error) {
    console.error("타임라인 조회 실패:", error);
    return { success: false, message: "서버 연결에 실패했습니다." };
  }
};
