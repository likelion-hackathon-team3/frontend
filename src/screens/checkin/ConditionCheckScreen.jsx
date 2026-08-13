import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Smile, Meh, Frown, Moon, Footprints, HeartPulse, Watch, Check, ArrowRight, Loader2 } from 'lucide-react'
import Sidebar from '../../components/Sidebar.jsx'
import { submitDailyStatus, fetchWearableData } from '../../api/status.js'

// User Flow 02단계 — 현재 상태 확인 (컨디션 입력).
// 컨디션 입력과 웨어러블 데이터 확인을 한 화면에서 같이 보여준 뒤, "내 상태 분석하기"를
// 누르면 03단계(통합분석 결과)로 넘어간다. GET /api/wearable-data, POST /api/daily-status 사용.
const CONDITION_OPTIONS = [
  { value: '낮음', Icon: Smile, desc: '컨디션이 좋아요', ring: 'border-sage', bg: 'bg-sage/10', text: 'text-sage' },
  { value: '보통', Icon: Meh, desc: '보통이에요', ring: 'border-gold', bg: 'bg-gold/10', text: 'text-gold' },
  { value: '높음', Icon: Frown, desc: '많이 피곤해요', ring: 'border-coral', bg: 'bg-coral/10', text: 'text-coral' },
]

function WearableRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="flex items-center gap-2 text-sm text-ink/70">
        <Icon size={16} className="text-lavender-deep" />
        {label}
      </span>
      <span className="text-sm font-bold text-ink">{value}</span>
    </div>
  )
}

export default function ConditionCheckScreen() {
  const navigate = useNavigate()
  const [fatigueLevel, setFatigueLevel] = useState(null)
  const [wearable, setWearable] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetchWearableData().then((data) => {
      if (!cancelled) setWearable(data)
    })
    return () => {
      cancelled = true
    }
  }, [])

  function handleSubmit() {
    if (!fatigueLevel) return
    submitDailyStatus(fatigueLevel)
    navigate('/checkin/analysis')
  }

  return (
    <div className="min-h-screen bg-bg flex">
      <Sidebar />

      <main className="flex-1 p-8 max-w-4xl">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-7 h-7 rounded-full bg-lavender-deep text-white text-xs font-bold flex items-center justify-center shrink-0">
            02
          </span>
          <span className="text-sm font-bold text-ink">현재 상태 확인 (컨디션 입력)</span>
        </div>

        <h1 className="text-2xl font-bold text-ink mb-1">오늘의 상태를 알려주세요</h1>
        <p className="text-sm text-muted mb-6">정확한 분석을 위해 현재 컨디션과 웨어러블 데이터를 확인합니다.</p>

        <div className="grid grid-cols-2 gap-5 mb-6">
          <div className="bg-card rounded-2xl border border-lavender/10 p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-lavender-deep text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h2 className="text-sm font-bold text-ink">현재 컨디션</h2>
            </div>
            <h3 className="text-base font-bold text-ink mb-1">지금 피로도는 어떤가요?</h3>
            <p className="text-xs text-muted mb-5">현재 느끼는 피로도를 선택해주세요.</p>

            <div className="grid grid-cols-3 gap-3">
              {CONDITION_OPTIONS.map(({ value, Icon, desc, ring, bg, text }) => {
                const isSelected = fatigueLevel === value
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFatigueLevel(value)}
                    className={`relative flex flex-col items-center gap-2 rounded-2xl border-2 py-5 transition-colors ${
                      isSelected ? `${ring} ${bg}` : 'border-lavender/10 bg-bg hover:border-lavender/30'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-lavender-deep text-white flex items-center justify-center">
                        <Check size={10} />
                      </span>
                    )}
                    <span className={`w-11 h-11 rounded-full flex items-center justify-center ${bg}`}>
                      <Icon size={22} className={text} />
                    </span>
                    <span className="text-sm font-bold text-ink">{value}</span>
                    <span className="text-xs text-muted">{desc}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-lavender/10 p-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-full bg-lavender-deep text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h2 className="text-sm font-bold text-ink">오늘의 웨어러블 데이터</h2>
            </div>
            <p className="text-xs text-muted mb-3 ml-8">연동된 웨어러블 데이터입니다. (예시 데이터)</p>

            {!wearable ? (
              <div className="flex items-center gap-2 text-sm text-muted py-10 justify-center">
                <Loader2 size={16} className="animate-spin" />
                불러오는 중이에요...
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-lavender/10">
                <WearableRow icon={Moon} label="수면시간" value={wearable.sleepLabel} />
                <WearableRow icon={Footprints} label="활동량" value={`${wearable.activitySteps.toLocaleString()} 걸음`} />
                <WearableRow icon={HeartPulse} label="안정시 심박수" value={`${wearable.heartRate} bpm`} />
                <WearableRow icon={Watch} label="착용 기기" value={wearable.device} />
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          disabled={!fatigueLevel}
          onClick={handleSubmit}
          className="w-full flex items-center justify-center gap-1.5 text-sm font-medium text-white bg-lavender-deep rounded-xl py-3.5 hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          내 상태 분석하기
          <ArrowRight size={16} />
        </button>
      </main>
    </div>
  )
}
