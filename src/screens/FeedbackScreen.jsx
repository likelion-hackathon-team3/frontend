import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ThumbsUp, Meh, ThumbsDown, Check, Coffee } from 'lucide-react'
import Sidebar from '../components/Sidebar.jsx'
import { submitFeedback } from '../api/feedback.js'

const RATINGS = [
  { value: 'good', label: '도움됨', icon: ThumbsUp },
  { value: 'meh', label: '애매해요', icon: Meh },
  { value: 'bad', label: '도움안됨', icon: ThumbsDown },
]

function minutesToLabel(min) {
  const h = Math.floor(min / 60)
  const m = min % 60
  return `${h}시간 ${m}분`
}

export default function FeedbackScreen() {
  const navigate = useNavigate()
  const [sleepMinutes, setSleepMinutes] = useState(340)
  const [caffeineTaken, setCaffeineTaken] = useState(false)
  const [caffeineTime, setCaffeineTime] = useState('14:00')
  const [postShiftFatigue, setPostShiftFatigue] = useState('보통')
  const [rating, setRating] = useState(null)
  const [note, setNote] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit() {
    submitFeedback({
      actualSleepMinutes: sleepMinutes,
      caffeineTaken,
      caffeineTime: caffeineTaken ? caffeineTime : null,
      postShiftFatigue,
      routineHelpfulness: rating,
      note,
    })
    setSubmitted(true)
    setTimeout(() => navigate('/'), 1200)
  }

  return (
    <div className="min-h-screen bg-bg flex">
      <Sidebar />

      <main className="flex-1 p-8 max-w-3xl">
        <h1 className="text-lg font-bold text-ink mb-1">근무가 끝났어요, 피드백을 남겨주세요.</h1>
        <p className="text-sm text-muted mb-6">다음 추천 루틴을 더 정확하게 맞추는 데 쓰여요.</p>

        <div className="grid grid-cols-2 gap-5">
          <div className="bg-card rounded-2xl border border-lavender/10 p-5">
            <p className="text-xs text-muted mb-1">실제 수면 시간</p>
            <p className="text-lg font-bold text-ink mb-2">{minutesToLabel(sleepMinutes)}</p>
            <input
              type="range"
              min={0}
              max={600}
              step={10}
              value={sleepMinutes}
              onChange={(e) => setSleepMinutes(Number(e.target.value))}
              className="w-full"
            />

            <div className="border-t border-lavender/10 mt-4 pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 text-sm text-ink/80">
                  <Coffee size={14} className="text-terracotta" />
                  카페인 섭취
                </span>
                <button
                  type="button"
                  onClick={() => setCaffeineTaken((v) => !v)}
                  className={`w-9 h-5 rounded-full relative transition-colors ${caffeineTaken ? 'bg-lavender-deep' : 'bg-lavender/20'}`}
                >
                  <span
                    className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all"
                    style={{ left: caffeineTaken ? '18px' : '2px' }}
                  />
                </button>
              </div>
              {caffeineTaken && (
                <label className="flex items-center justify-between text-sm">
                  <span className="text-ink/70">섭취 시간</span>
                  <input
                    type="time"
                    value={caffeineTime}
                    onChange={(e) => setCaffeineTime(e.target.value)}
                    className="border border-lavender/20 rounded-lg px-2 py-1 text-sm bg-bg text-ink"
                  />
                </label>
              )}
            </div>

            <div className="border-t border-lavender/10 mt-4 pt-4">
              <p className="text-sm text-ink/80 mb-2">근무 후 피로도</p>
              <div className="flex gap-2">
                {['낮음', '보통', '높음'].map((lv) => (
                  <button
                    key={lv}
                    type="button"
                    onClick={() => setPostShiftFatigue(lv)}
                    className={`flex-1 text-sm rounded-xl border py-2 transition-colors ${
                      postShiftFatigue === lv
                        ? 'border-lavender-deep bg-lavender-deep/10 text-lavender-deep font-medium'
                        : 'border-lavender/10 text-ink/60 hover:bg-bg'
                    }`}
                  >
                    {lv}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-lavender/10 p-5">
            <p className="text-sm font-bold text-ink mb-3">AI 추천 루틴이 도움이 되었나요?</p>
            <div className="flex gap-2 mb-4">
              {RATINGS.map(({ value, label, icon: Icon }) => {
                const isActive = rating === value
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    className={`flex-1 flex flex-col items-center gap-1 rounded-xl border py-3 text-xs transition-colors ${
                      isActive ? 'border-lavender-deep bg-lavender-deep/10 text-lavender-deep' : 'border-lavender/10 text-ink/60 hover:bg-bg'
                    }`}
                  >
                    <Icon size={16} />
                    {label}
                  </button>
                )
              })}
            </div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="느낀 점을 자유롭게 남겨주세요 (선택)&#10;예: 취침 시간을 조금 더 당겨보고 싶어요"
              rows={5}
              className="w-full text-xs border border-lavender/20 rounded-xl px-3 py-2 bg-bg text-ink resize-none"
            />
          </div>
        </div>

        {submitted ? (
          <div className="mt-6 flex items-center gap-2 text-sm text-sage bg-sage/10 rounded-xl px-4 py-3 max-w-md">
            <Check size={16} />
            피드백이 저장됐어요. 홈으로 이동합니다...
          </div>
        ) : (
          <div className="flex justify-between mt-6 max-w-2xl">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-sm text-ink border border-lavender/20 rounded-xl px-5 py-2.5 hover:bg-bg transition-colors"
            >
              나중에
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="text-sm text-white bg-lavender-deep rounded-xl px-5 py-2.5 hover:opacity-90 transition-opacity"
            >
              기록 완료
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
