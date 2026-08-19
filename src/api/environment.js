import mock from '../data/environment-mock.json'
// 환경변수 파일(.env)에 적어둔 실제 배포 주소를 불러옵니다!
const BASE_URL = import.meta.env.VITE_BASE_URL;
// GET /api/environment — 근무환경 조회
export async function fetchEnvironment() {
  try {
    const res = await fetch(`${BASE_URL}/api/environment`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("근무환경 조회 실패:", error);
    return { configured: false };
  }
}

// POST /api/environment — 근무환경 설정
export async function saveEnvironment(payload) {
  try {
    const res = await fetch(`${BASE_URL}/api/environment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return { success: false, message: "근무환경 저장 중 서버 연결에 실패했습니다." };
  }
}
