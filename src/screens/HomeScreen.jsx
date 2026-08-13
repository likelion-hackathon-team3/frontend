import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2, AlertTriangle } from 'lucide-react'
import Sidebar from '../components/Sidebar.jsx'
import HomeHeader from '../components/HomeHeader.jsx'
import StatsRow from '../components/StatsRow.jsx'
import TransitionSummary from '../components/TransitionSummary.jsx'
import FatigueChart from '../components/FatigueChart.jsx'
import AICommentBar from '../components/AICommentBar.jsx'
import { fetchHomeSummary, HOME_SCENARIOS } from '../api/dashboard.js'

export default function HomeScreen() {
  const navigate = useNavigate()
  const [scenario, setScenario] = useState('success')
  const [state, setState] = useState({ status: 'loading', data: null, message: '' })

  useEffect(() => {
    let cancelled = false
    setState({ status: 'loading', data: null, message: '' })

    fetchHomeSummary(scenario)
      .then((data) => {
        if (cancelled) return
        setState({ status: 'success', data, message: '' })
      })
      .catch((err) => {
        if (cancelled) return
        setState({ status: 'error', data: null, message: err.message })
      })

    return () => {
      cancelled = true
    }
  }, [scenario])

  return (
    <div className="min-h-screen bg-bg flex">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* 개발용 시나리오 전환 — 홈 화면 목업(fetchHomeSummary) 상태별 확인용. 실 배포 시 제거.
            주의: 이 데이터는 아직 API 명세서에 없는 임시 프론트 목업이다 (알림은 별도 fetchDashboardAlerts). */}
        <div className="mb-4 flex items-center gap-2 text-xs text-muted">
          <span>미리보기 시나리오</span>
          <select
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            className="border border-lavender/20 rounded-lg px-2 py-1 bg-card text-ink"
          >
            {HOME_SCENARIOS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {state.status === 'loading' && (
          <div className="flex items-center gap-2 text-sm text-muted py-20 justify-center">
            <Loader2 size={16} className="animate-spin" />
            분석 리포트를 불러오는 중이에요...
          </div>
        )}

        {state.status === 'error' && (
          <div className="flex items-center gap-2 text-sm text-coral bg-coral/5 border border-coral/20 rounded-2xl px-5 py-4">
            <AlertTriangle size={16} />
            {state.message}
          </div>
        )}

        {state.status === 'success' && state.data && (
          <>
            <HomeHeader
              name={state.data.greeting.name}
              message={state.data.greeting.message}
              period={state.data.period}
            />

            <div className="flex flex-col gap-5">
              <StatsRow stats={state.data.stats} />

              <div className="grid grid-cols-2 gap-5">
                <TransitionSummary
                  highlights={state.data.transitionHighlights}
                  onViewAll={() => navigate('/timeline')}
                />
                <FatigueChart data={state.data.fatigueTrend} />
              </div>

              <AICommentBar comment={state.data.aiComment} onViewDetail={() => navigate('/timeline')} />
            </div>
          </>
        )}
      </main>
    </div>
  )
}
