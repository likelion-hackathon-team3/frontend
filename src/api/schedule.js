import mock from '../data/schedule-mock.json'

// 1단계: 백엔드 팀원이 알려준 진짜 서버 주소를 여기에 넣으세요!
const BASE_URL = 'http://localhost:8080'; 

// ---------------------------------------------------------
// [진짜 서버 연동] 1. 근무표 조회 (GET)
// ---------------------------------------------------------
export async function fetchSchedule(year = 2026, month = 8) {
  try {
    const formattedMonth = `${year}-${String(month).padStart(2, '0')}`;
    const response = await fetch(`${BASE_URL}/api/schedules?month=${formattedMonth}`);
    const data = await response.json();

    // 데이터가 없으면 빈 캘린더 반환
    if (!data.schedules) return { year, month, marks: {} }; 

    // 백엔드 배열 형식 -> 프론트엔드 캘린더 형식으로 자동 번역
    const shiftReverseMap = { 'DAY': 'D', 'EVENING': 'E', 'NIGHT': 'N', 'OFF': 'OFF' };
    const marks = {};

    data.schedules.forEach(item => {
      const dayStr = item.date.split('-')[2]; // 날짜에서 일(Day)만 쏙 빼냄
      const dayNum = parseInt(dayStr, 10).toString();
      marks[dayNum] = shiftReverseMap[item.shift] || item.shift;
    });

    return { year, month, marks };
  } catch (error) {
    console.error("조회 에러:", error);
    return { year, month, marks: {} }; // 에러 시 빈 캘린더 띄우기
  }
}

// ---------------------------------------------------------
// [진짜 서버 연동] 2. 근무표 저장 (POST)
// ---------------------------------------------------------
export async function saveSchedule(payload) {
  try {
    // 프론트엔드 캘린더 형식 -> 백엔드가 좋아하는 배열 형식으로 자동 번역!
    const formattedSchedules = Object.entries(payload.marks).map(([day, shiftShort]) => {
      const shiftMap = { 'D': 'DAY', 'E': 'EVENING', 'N': 'NIGHT', 'OFF': 'OFF' };
      const formattedDate = `${payload.year}-${String(payload.month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      return {
        date: formattedDate,
        shift: shiftMap[shiftShort] || shiftShort
      };
    });

    // 번역된 데이터를 진짜 서버로 발사!
    const response = await fetch(`${BASE_URL}/api/schedules`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ schedules: formattedSchedules })
    });

    return await response.json(); // { success: true/false } 형태의 쪽지를 받아서 돌려줌
  } catch (error) {
    return { success: false, message: "저장 중 서버와 연결이 끊겼습니다." };
  }
}

// ---------------------------------------------------------
// [임시 유지] 3. 근무표 사진 인식 (현재 파일 선택 기능이 없어서 목업 유지)
// ---------------------------------------------------------
export function recognizeSchedule() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({
      success: true,
      recognizedSchedules: mock.recognizeResult?.schedules || [],
      failedDates: []
    }), 1200)
  })
}

// ---------------------------------------------------------
// [진짜 서버 연동] 4. 근무표 특정 날짜 삭제 (DELETE)
// ---------------------------------------------------------
export async function deleteScheduleDate(date) {
  try {
    const response = await fetch(`${BASE_URL}/api/schedules?date=${date}`, {
      method: 'DELETE'
    });
    return await response.json();
  } catch (error) {
    return { success: false, message: "삭제 중 서버와 연결이 끊겼습니다." };
  }
}