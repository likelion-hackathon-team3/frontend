import { Routes, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen.jsx'
import ConditionCheckScreen from './screens/checkin/ConditionCheckScreen.jsx'
import AnalysisResultScreen from './screens/checkin/AnalysisResultScreen.jsx'
import Sidebar from './components/Sidebar.jsx'
import SettingsScreen from './screens/SettingsScreen.jsx'
import OnboardingScreen from './screens/OnboardingScreen.jsx'
import ScheduleUploadScreen from './screens/ScheduleUploadScreen.jsx'
import ScheduleConfirmScreen from './screens/ScheduleConfirmScreen.jsx'
import ScheduleScreen from './screens/ScheduleScreen.jsx'
import TimelineStep from './screens/checkin/TimelineStep.jsx'

function OtherScreenPlaceholder() {
  return (
    <div className="min-h-screen bg-bg flex">
      <Sidebar />
      <main className="flex-1 p-8" />
    </div>
  )
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

      <Route path="/settings" element={<SettingsScreen />} />
      <Route path="/timeline" element={<TimelineStep />} />
      
      {/* 4. 기존 체크인(상태 확인) 화면들 */}
      <Route path="/checkin" element={<ConditionCheckScreen />} />
      <Route path="/checkin/analysis" element={<AnalysisResultScreen />} />
      <Route path="*" element={<OtherScreenPlaceholder />} />
    </Routes>
  )
}