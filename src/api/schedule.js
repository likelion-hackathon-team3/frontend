import mock from '../data/schedule-mock.json'

// 환경변수 파일(.env)에 적어둔 실제 배포 주소를 불러옵니다!
const BASE_URL = import.meta.env.VITE_BASE_URL;

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
// [진짜 서버 연동] 3. 근무표 사진 인식 (OCR)
// ---------------------------------------------------------
export async function recognizeSchedule(imageFile) {
  try {
    // 1. 이미지를 서버로 보내기 위해 짐을 쌉니다 (FormData)
    const formData = new FormData();
    formData.append('file', imageFile);

    // 2. 백엔드 OCR API로 사진을 발사합니다!
    const response = await fetch(`${BASE_URL}/api/ocr/schedule`, {
      method: 'POST',
      body: formData, // 사진(파일)은 JSON이 아니라 formData로 보냅니다.
    });

    const res = await response.json();

    // 3. 백엔드 통신 성공 시 데이터 번역 작업
    if (res.success === true) {
      // (백엔드 공통 ApiResponse 포맷 적용 여부에 따라 데이터를 안전하게 꺼냅니다)
      const schedules = res.data?.recognizedSchedules || res.recognizedSchedules || [];
      const failed = res.data?.failedDates || res.failedDates || [];

      // 백엔드가 준 배열 [{ date: "2026-08-16", shift: "DAY" }] 을
      // 프론트 달력이 좋아하는 객체 { "16": "D" } 로 번역!
      const shiftReverseMap = { 'DAY': 'D', 'EVENING': 'E', 'NIGHT': 'N', 'OFF': 'OFF' };
      const marks = {};

      schedules.forEach(item => {
        const dayStr = item.date.split('-')[2];
        const dayNum = parseInt(dayStr, 10).toString();
        marks[dayNum] = shiftReverseMap[item.shift] || item.shift;
      });

      return {
        success: true,
        marks: marks,       // 👈 번역 완료된 캘린더 데이터
        uncertain: failed   // 👈 인식이 안 된 날짜들
      };
    } else {
      return { success: false, message: res.message };
    }

  } catch (error) {
    console.error("OCR 에러:", error);
    return { success: false, message: "사진 분석 중 서버와 연결이 끊겼습니다." };
  }
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