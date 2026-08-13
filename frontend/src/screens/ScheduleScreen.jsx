import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2, Upload } from 'lucide-react'
import Sidebar from '../components/Sidebar.jsx'
import MonthCalendar from '../components/MonthCalendar.jsx'
import { fetchSchedule } from '../api/schedule.js'

export default function ScheduleScreen() {
  const navigate = useNavigate()
  const [state, setState] = useState({ status: 'loading', data: null })

  useEffect(() => {
    let cancelled = false
    fetchSchedule().then((data) => {
      if (!cancelled) setState({ status: 'success', data })
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="min-h-screen bg-bg flex">
      <Sidebar />
      <main className="flex-1 p-8 max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-lg font-bold text-ink mb-1">근무표</h1>
            <p className="text-sm text-muted">등록된 근무표를 확인하고 필요하면 다시 업로드할 수 있어요.</p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/schedule/upload')}
            className="flex items-center gap-1.5 text-sm text-white bg-lavender-deep rounded-xl px-4 py-2.5 hover:opacity-90 transition-opacity shrink-0"
          >
            <Upload size={14} />
            근무표 업로드
          </button>
        </div>

        {state.status === 'loading' ? (
          <div className="flex items-center gap-2 text-sm text-muted py-20 justify-center">
            <Loader2 size={16} className="animate-spin" />
            근무표를 불러오는 중이에요...
          </div>
        ) : (
          <div className="bg-card rounded-2xl border border-lavender/10 p-5">
            <MonthCalendar year={state.data.year} month={state.data.month} marks={state.data.marks} onDayClick={() => {}} />
          </div>
        )}
      </main>
    </div>
  )
}
