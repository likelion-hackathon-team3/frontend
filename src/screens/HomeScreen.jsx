import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2, CalendarClock, Clock3, Sparkles } from 'lucide-react'
import Sidebar from '../components/Sidebar.jsx'
import PreventiveAlerts from '../components/PreventiveAlerts.jsx'
import { fetchTodayAndNextShift } from '../api/status.js'
import { MARK_STYLE } from '../components/MonthCalendar.jsx'

function ShiftCard({ label, tag, shift }) {
  const style = MARK_STYLE[shift.type]
  return (
    <div className="bg-card rounded-2xl border border-lavender/10 p-4 flex-1">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted">{label}</span>
        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${style.bg} ${style.text}`}>{tag}</span>
      </div>
      <p className="text-lg font-bold text-ink">
        {shift.start} - {shift.end}
      </p>
      <p className="text-xs text-muted mt-1">{shift.durationLabel}</p>
    </div>
  )
}

export default function HomeScreen() {
  const navigate = useNavigate()
  const [state, setState] = useState({ status: 'loading', data: null })

  useEffect(() => {
    let cancelled = false
    fetchTodayAndNextShift().then((data) => {
      if (!cancelled) setState({ status: 'success', data })
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="min-h-screen bg-bg flex">
      <Sidebar />

      <main className="flex-1 p-8 max-w-3xl">
        {state.status === 'loading' && (
          <div className="flex items-center gap-2 text-sm text-muted py-20 justify-center">
            <Loader2 size={16} className="animate-spin" />
            불러오는 중이에요...
          </div>
        )}

        {state.status === 'success' && (
          <>
            <div className="mb-6">
              <h1 className="text-lg font-bold text-ink">좋은 아침입니다, {state.data.greeting.name} 님.</h1>
              <p className="text-sm text-muted mt-1">{state.data.greeting.message}</p>
            </div>

            <div className="flex gap-4 mb-5">
              <ShiftCard label="오늘의 근무" tag={state.data.today.label} shift={state.data.today} />
              <ShiftCard
                label={`다음 근무 (${state.data.next.dayLabel})`}
                tag={state.data.next.label}
                shift={state.data.next}
              />
              <div className="bg-card rounded-2xl border border-lavender/10 p-4 flex-1 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted">다음 근무까지</span>
                  <Clock3 size={14} className="text-lavender-deep" />
                </div>
                <p className="text-lg font-bold text-lavender-deep">{state.data.next.timeUntilLabel} 남음</p>
              </div>
            </div>

            <div className="mb-5">
              <PreventiveAlerts />
            </div>

            <div className="bg-card rounded-2xl border border-lavender/10 p-6">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-lavender-deep" />
                <p className="text-sm font-bold text-ink">오늘의 웰니스 준비</p>
              </div>
              <p className="text-sm text-muted mb-4">현재 상태를 확인하고 다음 근무까지의 맞춤 계획을 만들어보세요.</p>
              <button
                type="button"
                onClick={() => navigate('/checkin')}
                className="flex items-center gap-1.5 text-sm text-white bg-lavender-deep rounded-xl px-5 py-2.5 hover:opacity-90 transition-opacity"
              >
                <CalendarClock size={14} />
                현재 상태 확인하기
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
