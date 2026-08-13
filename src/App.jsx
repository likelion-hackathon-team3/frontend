import { Routes, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen.jsx'
import Sidebar from './components/Sidebar.jsx'

// 홈 담당 파트만 남긴 버전. 다른 사이드바 메뉴(근무표/웰니스 분석/설정)는
// 다른 팀원 담당이라 이 폴더에는 구현되어 있지 않으며, 사이드바만 유지된 빈 화면으로 넘어간다.
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
