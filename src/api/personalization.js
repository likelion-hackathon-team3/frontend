// src/api/personalization.js
const BASE_URL = import.meta.env.VITE_BASE_URL; // 배포 서버 URL 환경변수

export const fetchPersonalization = async (shiftType) => {
  // 명세서 요청 필드: shiftType (string) 필수
  if (!shiftType) {
    console.error("shiftType 파라미터가 누락되었습니다.");
    return null;
  }

  try {
    // API Path: /api/personalization
    // HTTP Method: GET
    const response = await fetch(
      `${BASE_URL}/api/personalization?shiftType=${shiftType}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`개인화 보정 API 호출 에러: ${response.status}`);
    }

    const data = await response.json();
    return data;
    /* 
      명세서 응답 필드 구조:
      {
        "adjustedCaffeineCutoff": string | null,
        "recommendedSleepBuffer": number,
        "repeatedPatternFound": boolean,
        "recommendedRoutineNotice": string
      }
    */
  } catch (error) {
    console.error("fetchPersonalization 통신 실패:", error);
    return null;
  }
};
