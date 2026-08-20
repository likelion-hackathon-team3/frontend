import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2, CalendarClock, Clock3, Sparkles } from 'lucide-react'
import Sidebar from '../components/Sidebar.jsx'
import PreventiveAlerts from '../components/PreventiveAlerts.jsx'

// [팀원 공유용 주석: 수정한 부분 시작]
// 기존의 임시 데이터(fetchTodayAndNextShift 등) 대신 실제 백엔드 데이터를 조합하기 위해 
// environment(근무시간 설정)와 schedule(달력) API를 추가로 import 했습니다.
import { fetchAnalysis, formatShiftMinutes } from '../api/status.js'
import { fetchEnvironment } from '../api/environment.js'
import { fetchSchedule } from '../api/schedule.js'
// [팀원 공유용 주석: 수정한 부분 끝]

import { MARK_STYLE } from '../components/MonthCalendar.jsx'

// 사전예방 알림 조회 기간: 오늘부터 앞으로 14일.
function toISODate(date) {
  return date.toISOString().slice(0, 10)
}
function getAlertDateRange() {
  const today = new Date()
  const twoWeeksLater = new Date(today)
  twoWeeksLater.setDate(today.getDate() + 14)
  return { startDate: toISODate(today), endDate: toISODate(twoWeeksLater) }
}

function ShiftCard({ label, tag, shift }) {
  const style = MARK_STYLE[shift.type] || MARK_STYLE['OFF']
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

    async function loadRealDashboardData() {
      try {
        // [팀원 공유용 주석: 수정한 부분 시작]
        // 1. API 호출에 필요한 오늘과 내일의 날짜 계산 로직 추가
        const today = new Date()
        const year = today.getFullYear()
        const month = today.getMonth() + 1
        const date = today.getDate()

        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        const tomorrowDate = tomorrow.getDate()
        const tomorrowMonth = tomorrow.getMonth() + 1
        const tomorrowYear = tomorrow.getFullYear()

        // 2. Promise.all을 사용해 설정된 근무시간, 이번 달 근무표, 타임라인 분석 데이터를 한 번에 가져옴
        const [env, thisMonthSchedule, analysis] = await Promise.all([
          fetchEnvironment(),
          fetchSchedule(year, month),
          fetchAnalysis()
        ])

        // 3. (예외 처리) 오늘이 월말이라 내일이 다음 달 1일이 되는 경우, 다음 달 근무표도 추가로 가져옵니다.
        let nextMonthSchedule = null
        if (month !== tomorrowMonth) {
          nextMonthSchedule = await fetchSchedule(tomorrowYear, tomorrowMonth)
        }
        const tomorrowMarks = nextMonthSchedule ? nextMonthSchedule.marks : thisMonthSchedule.marks

        if (cancelled) return

        // 4. 백엔드에서 받아온 근무 시간 데이터(env)를 달력의 D, E, N 타입과 매핑
        const shiftInfo = {
          'D': { label: 'Day', time: env.dayShift },
          'E': { label: 'Evening', time: env.eveningShift },
          'N': { label: 'Night', time: env.nightShift },
          'OFF': { label: '휴무', time: null }
        }

        // 5. 달력 데이터에서 오늘과 내일의 근무 형태 추출 (기본값 OFF)
        const todayType = thisMonthSchedule.marks[date] || 'OFF'
        const tomorrowType = tomorrowMarks[tomorrowDate] || 'OFF'

        // 6. 달력 타입(D/E/N)을 홈 화면 카드 UI 규격에 맞게 포맷팅 및 근무 시간(duration) 자동 계산
        const formatShift = (type) => {
          const info = shiftInfo[type] || shiftInfo['OFF']
          
          if (!info.time || type === 'OFF') {
            return { type: 'OFF', label: '휴무', start: '-', end: '-', durationLabel: '충분한 휴식을 취하세요' }
          }
          
          const startHour = parseInt(info.time.start.split(':')[0], 10)
          const endHour = parseInt(info.time.end.split(':')[0], 10)
          let duration = endHour - startHour
          if (duration < 0) duration += 24 // 야간(Night) 근무 시간 역전 방지

          return {
            type: type,
            label: info.label,
            start: info.time.start,
            end: info.time.end,
            durationLabel: `${duration}시간 근무`
          }
        }
        // [팀원 공유용 주석: 수정한 부분 끝]

        const nextShiftIn = analysis.success !== false ? formatShiftMinutes(analysis.nextShiftMinutes) : null

        // [팀원 공유용 주석: 수정한 부분 시작]
        // 7. 하드코딩된 임시 데이터 대신, 위에서 조합한 실제 서버 데이터를 state에 저장하도록 변경
        setState({
          status: 'success',
          data: {
            greeting: { name: '김간호사', message: '다음 일정을 확인하고, 건강한 전환을 준비해보세요.' },
            today: formatShift(todayType),
            next: { ...formatShift(tomorrowType), dayLabel: '내일' },
            nextShiftIn
          }
        })
        // [팀원 공유용 주석: 수정한 부분 끝]
      } catch (error) {
        console.error("대시보드 데이터 로드 실패:", error)
        if (!cancelled) setState({ status: 'error' })
      }
    }

    loadRealDashboardData()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    // ... (이 아래의 return(JSX 화면 렌더링) 부분은 기존 코드 원본과 완전히 동일합니다) ...
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
                <p className="text-lg font-bold text-lavender-deep">
                  {state.data.nextShiftIn ? `${state.data.nextShiftIn} 남음` : '-'}
                </p>
              </div>
            </div>

            <div className="mb-5">
              <PreventiveAlerts {...getAlertDateRange()} />
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