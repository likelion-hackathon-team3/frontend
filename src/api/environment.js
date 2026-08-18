import mock from '../data/environment-mock.json'
const BASE_URL = 'http://localhost:8080';

// GET /api/environment — 근무환경 조회
export async function fetchEnvironment() {
  //추후 promise삭제
  return new Promise((resolve) => {
    setTimeout(() => resolve({ configured: false }), 300)
  })
  // try {
  //   const res = await fetch(`${BASE_URL}/api/environment`);
  //   const data = await res.json();
  //   return data;
  // } catch (error) {
  //   console.error("근무환경 조회 실패:", error);
  //   return { configured: false };
  // }
}

// POST /api/environment — 근무환경 설정
export async function saveEnvironment(payload) {
  //추후 promise 삭제
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 400)
  })
  // try {
  //   const res = await fetch(`${BASE_URL}/api/environment`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(payload)
  //   });
  //   const data = await res.json();
  //   return data;
  // } catch (error) {
  //   return { success: false, message: "근무환경 저장 중 서버 연결에 실패했습니다." };
  // }
}
