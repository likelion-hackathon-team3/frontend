import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AlertTriangle, Check } from 'lucide-react'
import Sidebar from '../components/Sidebar.jsx'
import MonthCalendar, { MARK_STYLE } from '../components/MonthCalendar.jsx'
import { saveSchedule, fetchSchedule, deleteScheduleDate } from '../api/schedule.js'
import { fetchEnvironment } from '../api/environment.js'

const PATTERNS = ['D', 'E', 'N', 'OFF']
const YEAR = 2026
const MONTH = 8

export default function ScheduleConfirmScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const initial = location.state || { marks: {}, uncertain: [], source: 'manual' }

  const [marks, setMarks] = useState(initial.marks)
  const [uncertain, setUncertain] = useState(new Set(initial.uncertain || []))
  const [activePattern, setActivePattern] = useState('D')
  const [saving, setSaving] = useState(false)

  // 2. 사용자가 달력에서 지워버린(삭제할) 날짜들을 모아둘 바구니를 만듭니다.
  const [deletedDates, setDeletedDates] = useState(new Set())

  useEffect(() => {
    fetchSchedule(YEAR, MONTH).then((res) => {
      if (res.marks) {
        setMarks((prevMarks) => ({
          ...res.marks,
          ...prevMarks
        }))
      }
    })
  }, [])

  function handleDayClick(day) {
    // 백엔드 명세서 규격에 맞게 "2026-08-05" 형태로 날짜를 만듭니다.
    const dateStr = `${YEAR}-${String(MONTH).padStart(2, '0')}-${String(day).padStart(2, '0')}`

    setMarks((prev) => {
      const next = { ...prev }
      if (next[day] === activePattern) {
        //  3-1. 이미 칠해진 날짜를 한 번 더 눌러서 지울 때 -> 삭제 바구니에 담기
        delete next[day]
        setDeletedDates((prevSet) => new Set(prevSet).add(dateStr))
      } else {
        //  3-2. 새롭게 날짜를 칠할 때 -> 삭제 바구니에 혹시 있었다면 빼주기
        next[day] = activePattern
        setDeletedDates((prevSet) => {
          const newSet = new Set(prevSet)
          newSet.delete(dateStr)
          return newSet
        })
      }
      return next
    })
    
    setUncertain((prev) => {
      const next = new Set(prev)
      next.delete(String(day))
      return next
    })
  }

  async function handleRegister() {
    setSaving(true)
    
    try {
      // 1. 장바구니에 담아둔 삭제할 날짜들을 백엔드에서 싹 지웁니다.
      const deletePromises = Array.from(deletedDates).map(date => deleteScheduleDate(date))
      await Promise.all(deletePromises)

      // 2. 남은 근무표 데이터를 백엔드에 저장합니다.
      const res = await saveSchedule({ year: YEAR, month: MONTH, marks })
      
      if (res.success === true) {
        // 💡 백엔드 서버 대신, 현재 브라우저 탭의 임시 기억 장치를 확인합니다!
        const hasSeenSetup = sessionStorage.getItem('hasSeenEnvSetup')

        if (!hasSeenSetup) {
          // 브라우저가 처음 열려서 아직 설정 화면을 안 봤다면?
          // 1) "이제 봤음!" 이라고 도장을 쾅 찍어줍니다.
          sessionStorage.setItem('hasSeenEnvSetup', 'true')
          // 2) 설정 화면으로 보냅니다.
          navigate('/schedule/hours') 
        } else {
          // 이미 도장이 찍혀 있다면 무조건 달력 화면으로 보냅니다.
          navigate('/schedule') 
        }
      } else {
        alert(res.message || '근무표 등록에 실패했습니다.')
      }
    } catch (error) {
      console.error(error)
      alert("서버 통신 중 오류가 발생했습니다.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg flex">
      <Sidebar />
      <main className="flex-1 p-8 max-w-2xl">
        <h1 className="text-lg font-bold text-ink mb-1">
          {initial.source === 'ocr' ? 'AI 인식 결과를 확인해주세요.' : '근무표를 입력해주세요.'}
        </h1>
        <p className="text-sm text-muted mb-6">
          {initial.source === 'ocr'
            ? '잘못 인식되었거나 빠진 날짜는 아래에서 직접 눌러 수정할 수 있어요.'
            : '왼쪽에서 유형을 고른 뒤 달력의 날짜를 눌러 지정해주세요. 날짜를 한번 더 누르면 유형을 삭제할 수 있어요.'}
        </p>

        {uncertain.size > 0 && (
          <div className="mb-4 flex items-center gap-2 text-sm text-coral bg-coral/5 border border-coral/20 rounded-xl px-4 py-3">
            <AlertTriangle size={15} />
            {uncertain.size}개 날짜가 잘 인식되지 않았어요. 아래 캘린더에서 확인해주세요.
          </div>
        )}

        <div className="grid grid-cols-[160px_1fr] gap-5">
          <div className="bg-card rounded-2xl border border-lavender/10 p-4 h-fit">
            <p className="text-xs font-bold text-ink mb-3">근무 유형</p>
            <div className="flex flex-col gap-2">
              {PATTERNS.map((p) => {
                const style = MARK_STYLE[p]
                const isActive = activePattern === p
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setActivePattern(p)}
                    className={`text-left text-sm px-3 py-2 rounded-xl border transition-colors ${
                      isActive ? `${style.bg} ${style.text} border-transparent font-medium` : 'border-lavender/10 text-ink/70 hover:bg-bg'
                    }`}
                  >
                    {style.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-lavender/10 p-5">
            <MonthCalendar year={YEAR} month={MONTH} marks={marks} onDayClick={handleDayClick} />
            {uncertain.size > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {[...uncertain].map((d) => (
                  <span key={d} className="text-[11px] text-coral bg-coral/10 rounded-full px-2 py-0.5">
                    {d}일 재확인 필요
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={handleRegister}
            disabled={saving}
            className="flex items-center gap-1.5 text-sm text-white bg-lavender-deep rounded-xl px-5 py-2.5 hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {saving ? '등록 중...' : (
              <>
                <Check size={14} />
                등록 완료
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  )
}