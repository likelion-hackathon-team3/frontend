// src/api/timelineFeedback.js

const BASE_URL = import.meta.env.VITE_BASE_URL;

// POST /api/feedback — 실제 백엔드 연동
export const submitFeedback = async (payload) => {
  try {
    const response = await fetch(`${BASE_URL}/api/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // 사용자가 입력한 데이터를 JSON 형태로 변환해서 보냄
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "피드백 제출에 실패했습니다.",
      };
    }

    return data;
  } catch (error) {
    console.error("피드백 제출 실패:", error);
    return { success: false, message: "서버 연결에 실패했습니다." };
  }
};
