import { Routes, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen.jsx'
import ConditionCheckScreen from './screens/checkin/ConditionCheckScreen.jsx'
import AnalysisResultScreen from './screens/checkin/AnalysisResultScreen.jsx'
import Sidebar from './components/Sidebar.jsx'

// 담당 파트: 홈 대시보드 → 현재 상태 확인(컨디션+웨어러블) → 통합분석 결과.
// 그 다음 단계인 웰니스 타임라인(04)부터는 다른 팀원 담당이라 이 폴더에는 없고,
// 사이드바의 다른 메뉴(근무표/설정)와 함께 사이드바만 유지된 빈 화면으로 넘어간다.
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
      <Route path="/" element={<HomeScreen />} />
      <Route path="/checkin" element={<ConditionCheckScreen />} />
      <Route path="/checkin/analysis" element={<AnalysisResultScreen />} />
      <Route path="*" element={<OtherScreenPlaceholder />} />
    </Routes>
  )
}
