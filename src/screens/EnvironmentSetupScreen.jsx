import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sun, Sunset, Moon } from 'lucide-react'
import Sidebar from '../components/Sidebar.jsx'
import { saveEnvironment } from '../api/environment.js'

function TimeField({ label, value, onChange }) {
  return (
    <label className="flex items-center justify-between text-sm">
      <span className="text-ink/70">{label}</span>
      <input
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-lavender/20 rounded-lg px-2 py-1.5 text-sm bg-bg text-ink"
      />
    </label>
  )
}

export default function EnvironmentSetupScreen() {
  const navigate = useNavigate()
  const [day, setDay] = useState({ start: '07:00', end: '15:00' })
  const [evening, setEvening] = useState({ start: '15:00', end: '23:00' })
  const [night, setNight] = useState({ start: '23:00', end: '07:00' })
  const [commuteMinutes, setCommuteMinutes] = useState(40)
  const [saving, setSaving] = useState(false)

  async function handleSubmit() {
    setSaving(true)
    await saveEnvironment({ day, evening, night, commuteMinutes })
    navigate('/schedule')
  }

  return (
    <div className="min-h-screen bg-bg flex">
      <Sidebar />
      <main className="flex-1 p-8 max-w-2xl">
        <h1 className="text-lg font-bold text-ink mb-1">근무 시간을 설정해주세요.</h1>
        <p className="text-sm text-muted mb-6">최초 1회만 설정하면 돼요.</p>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-card rounded-2xl border border-lavender/10 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Sun size={16} className="text-sage" />
              <span className="text-sm font-bold text-ink">Day</span>
            </div>
            <div className="flex flex-col gap-3">
              <TimeField label="출근" value={day.start} onChange={(v) => setDay((p) => ({ ...p, start: v }))} />
              <TimeField label="퇴근" value={day.end} onChange={(v) => setDay((p) => ({ ...p, end: v }))} />
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-lavender/10 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Sunset size={16} className="text-terracotta" />
              <span className="text-sm font-bold text-ink">Evening</span>
            </div>
            <div className="flex flex-col gap-3">
              <TimeField label="출근" value={evening.start} onChange={(v) => setEvening((p) => ({ ...p, start: v }))} />
              <TimeField label="퇴근" value={evening.end} onChange={(v) => setEvening((p) => ({ ...p, end: v }))} />
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-lavender/10 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Moon size={16} className="text-lavender-deep" />
              <span className="text-sm font-bold text-ink">Night</span>
            </div>
            <div className="flex flex-col gap-3">
              <TimeField label="출근" value={night.start} onChange={(v) => setNight((p) => ({ ...p, start: v }))} />
              <TimeField label="퇴근" value={night.end} onChange={(v) => setNight((p) => ({ ...p, end: v }))} />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-lavender/10 p-5 mb-6 max-w-xs">
          <label className="flex items-center justify-between text-sm">
            <span className="text-ink/70">평균 편도 통근시간</span>
            <div className="flex items-center gap-1">
              <input
                type="number"
                min={0}
                step={5}
                value={commuteMinutes}
                onChange={(e) => setCommuteMinutes(Number(e.target.value))}
                className="w-16 border border-lavender/20 rounded-lg px-2 py-1.5 text-sm bg-bg text-ink text-right"
              />
              <span className="text-ink/70">분</span>
            </div>
          </label>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className="text-sm text-white bg-lavender-deep rounded-xl px-5 py-2.5 hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {saving ? '저장 중...' : '완료'}
        </button>
      </main>
    </div>
  )
}
