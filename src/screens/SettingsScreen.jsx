import { useState } from 'react'
import { Check } from 'lucide-react'
import Sidebar from '../components/Sidebar.jsx'

const TABS = [
  { value: 'daily', label: '일일 설정' },
  { value: 'profile', label: '개인 설정' },
  { value: 'notify', label: '알림 설정' },
]

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-9 h-5 rounded-full relative transition-colors shrink-0 ${checked ? 'bg-lavender-deep' : 'bg-lavender/20'}`}
    >
      <span
        className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all"
        style={{ left: checked ? '18px' : '2px' }}
      />
    </button>
  )
}

function DailySettings() {
  const [reminderHours, setReminderHours] = useState(true)
  const [transitionDay, setTransitionDay] = useState(true)
  const [feedbackReminder, setFeedbackReminder] = useState(false)
  const [pushEnabled, setPushEnabled] = useState(true)
  const [emailEnabled, setEmailEnabled] = useState(true)
  const [smsEnabled, setSmsEnabled] = useState(false)
  const [reportDay, setReportDay] = useState('sun-9')
  const [nightMode, setNightMode] = useState('system')

  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="bg-card rounded-2xl border border-lavender/10 p-5">
        <p className="text-sm font-bold text-ink mb-1">알림 시간 설정</p>
        <p className="text-xs text-muted mb-4">리마인더가 몇 시간 전에 알림을 보낼지 설정해요.</p>
        <div className="flex flex-col gap-3 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={reminderHours} onChange={(e) => setReminderHours(e.target.checked)} />
            다음 근무 10시간 전
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={transitionDay} onChange={(e) => setTransitionDay(e.target.checked)} />
            전환 당일 24시간 전
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={feedbackReminder} onChange={(e) => setFeedbackReminder(e.target.checked)} />
            피드백 리마인드 즉시
          </label>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-lavender/10 p-5">
        <p className="text-sm font-bold text-ink mb-4">알림 방법</p>
        <div className="flex flex-col gap-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-ink/70">앱 푸시 알림</span>
            <Toggle checked={pushEnabled} onChange={setPushEnabled} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-ink/70">이메일</span>
            <Toggle checked={emailEnabled} onChange={setEmailEnabled} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-ink/70">문자 (SMS)</span>
            <Toggle checked={smsEnabled} onChange={setSmsEnabled} />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-lavender/10 p-5">
        <p className="text-sm font-bold text-ink mb-4">기타 설정</p>
        <div className="flex flex-col gap-4 text-sm">
          <label className="flex flex-col gap-1">
            <span className="text-xs text-muted">주간 리포트 알림</span>
            <select
              value={reportDay}
              onChange={(e) => setReportDay(e.target.value)}
              className="border border-lavender/20 rounded-lg px-2 py-1.5 bg-bg text-ink text-sm"
            >
              <option value="sun-9">매주 일요일 오전 9시</option>
              <option value="mon-9">매주 월요일 오전 9시</option>
              <option value="off">받지 않음</option>
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-muted">야간 알림 방식</span>
            <select
              value={nightMode}
              onChange={(e) => setNightMode(e.target.value)}
              className="border border-lavender/20 rounded-lg px-2 py-1.5 bg-bg text-ink text-sm"
            >
              <option value="system">시스템 설정 따름</option>
              <option value="silent">무음</option>
              <option value="realtime">실시간</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  )
}

function ProfileSettings() {
  return (
    <div className="bg-card rounded-2xl border border-lavender/10 p-5 max-w-md">
      <p className="text-sm font-bold text-ink mb-4">개인 설정</p>
      <div className="flex flex-col gap-3 text-sm">
        <label className="flex flex-col gap-1">
          <span className="text-xs text-muted">이름</span>
          <input defaultValue="김OO" className="border border-lavender/20 rounded-lg px-2 py-1.5 bg-bg text-ink" />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-muted">근무지 / 직군</span>
          <input placeholder="예: OO병원 간호사" className="border border-lavender/20 rounded-lg px-2 py-1.5 bg-bg text-ink" />
        </label>
      </div>
    </div>
  )
}

function NotifySettings() {
  return (
    <div className="bg-card rounded-2xl border border-lavender/10 p-5 max-w-md text-sm text-muted">
      전체 알림 on/off, 방해 금지 시간대 등 세부 알림 설정은 다음 스프린트에서 확장될 예정이에요. 지금은 "일일 설정" 탭에서 기본 알림을 조정할 수 있어요.
    </div>
  )
}

export default function SettingsScreen() {
  const [tab, setTab] = useState('daily')
  const [savedAt, setSavedAt] = useState(null)

  function handleSave() {
    setSavedAt(new Date())
  }

  return (
    <div className="min-h-screen bg-bg flex">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="flex gap-4 text-sm mb-6 border-b border-lavender/10">
          {TABS.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTab(t.value)}
              className={`pb-3 -mb-px border-b-2 transition-colors ${
                tab === t.value ? 'border-lavender-deep text-lavender-deep font-medium' : 'border-transparent text-muted'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'daily' && <DailySettings />}
        {tab === 'profile' && <ProfileSettings />}
        {tab === 'notify' && <NotifySettings />}

        <div className="flex items-center gap-3 mt-6">
          <button
            type="button"
            onClick={handleSave}
            className="text-sm text-white bg-lavender-deep rounded-xl px-5 py-2.5 hover:opacity-90 transition-opacity"
          >
            저장하기
          </button>
          {savedAt && (
            <span className="flex items-center gap-1 text-sm text-sage">
              <Check size={14} />
              저장됐어요
            </span>
          )}
        </div>
      </main>
    </div>
  )
}
