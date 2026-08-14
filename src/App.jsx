import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen.jsx";
import ConditionCheckScreen from "./screens/checkin/ConditionCheckScreen.jsx";
import AnalysisResultScreen from "./screens/checkin/AnalysisResultScreen.jsx";
import Sidebar from "./components/Sidebar.jsx";
import SettingsScreen from "./screens/SettingsScreen.jsx";
import OnboardingScreen from "./screens/OnboardingScreen.jsx";
import ScheduleUploadScreen from "./screens/ScheduleUploadScreen.jsx";
import ScheduleConfirmScreen from "./screens/ScheduleConfirmScreen.jsx";
import ScheduleScreen from "./screens/ScheduleScreen.jsx";
import EnvironmentSetupScreen from "./screens/EnvironmentSetupScreen.jsx";
import TimelinePage from "./screens/Timeline.jsx";

function OtherScreenPlaceholder() {
  return (
    <div className="min-h-screen bg-bg flex">
      <Sidebar />
      <main className="flex-1 p-8" />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* 1. 앱을 켜면 가장 먼저 뜨는 기본 경로(/)를 온보딩으로 설정 */}
      <Route path="/" element={<OnboardingScreen />} />

      {/* 2. 원래 있던 홈 대시보드는 /home 경로로 옮겼습니다 */}
      <Route path="/home" element={<HomeScreen />} />

      {/* 3. 근무표 기능 화면들 연결 */}
      <Route path="/schedule" element={<ScheduleScreen />} />
      <Route path="/schedule/upload" element={<ScheduleUploadScreen />} />
      <Route path="/schedule/confirm" element={<ScheduleConfirmScreen />} />
      <Route path="/schedule/hours" element={<EnvironmentSetupScreen />} />

      <Route path="/settings" element={<SettingsScreen />} />

      {/* 4. 기존 체크인(상태 확인) 화면들 */}
      <Route path="/checkin" element={<ConditionCheckScreen />} />
      <Route path="/checkin/analysis" element={<AnalysisResultScreen />} />

      {/* 🚀 5. [태훈님 찐 최종] 타임라인 라우트 적용 (민서님의 중복 라우트 제거) */}
      <Route
        path="/timeline"
        element={
          <div className="min-h-screen bg-bg flex">
            <Sidebar />
            <main className="flex-1 p-0 overflow-y-auto">
              <TimelinePage />
            </main>
          </div>
        }
      />

      <Route path="*" element={<OtherScreenPlaceholder />} />
    </Routes>
  );
}
