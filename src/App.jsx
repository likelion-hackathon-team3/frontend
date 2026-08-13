import { Routes, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen.jsx'
import Sidebar from './components/Sidebar.jsx'

// 이 앱은 초안1(WorkWell 분석리포트형) 디자인 중 "홈(분석리포트)" 화면만 담당 파트로 분리한 버전입니다.
// 사이드바의 다른 메뉴(근무표 입력 / 타임라인 / 피드백 & 기록 / 설정)는 다른 팀원 담당이라
// 이 폴더에는 구현되어 있지 않으며, 클릭 시 사이드바만 유지된 빈 화면이 표시됩니다.
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
      <Route path="*" element={<OtherScreenPlaceholder />} />
    </Routes>
  )
}
