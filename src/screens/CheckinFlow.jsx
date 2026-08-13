import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import StepIndicator from '../components/StepIndicator.jsx'
import ConditionStep from './checkin/ConditionStep.jsx'
import WearableStep from './checkin/WearableStep.jsx'
import AnalysisStep from './checkin/AnalysisStep.jsx'
import TimelineStep from './checkin/TimelineStep.jsx'
import { submitDailyStatus } from '../api/status.js'

const STEPS = [
  { n: 1, label: '컨디션 입력' },
  { n: 2, label: '웨어러블 확인' },
  { n: 3, label: '통합 분석' },
  { n: 4, label: '웰니스 타임라인' },
]

export default function CheckinFlow() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [fatigueLevel, setFatigueLevel] = useState(null)

  function goNext() {
    setStep((s) => Math.min(4, s + 1))
  }
  function goPrev() {
    setStep((s) => Math.max(1, s - 1))
  }

  function handleConditionSelect(level) {
    setFatigueLevel(level)
    submitDailyStatus(level)
    goNext()
  }

  return (
    <div className="min-h-screen bg-bg flex">
      <Sidebar />
      <main className="flex-1 p-8 max-w-3xl">
        <StepIndicator current={step} steps={STEPS} />

        {step === 1 && <ConditionStep value={fatigueLevel} onSelect={handleConditionSelect} />}
        {step === 2 && <WearableStep />}
        {step === 3 && <AnalysisStep />}
        {step === 4 && <TimelineStep />}

        <div className="flex justify-between mt-6 max-w-lg">
          <button
            type="button"
            onClick={step === 1 ? () => navigate('/') : goPrev}
            className="text-sm text-ink border border-lavender/20 rounded-xl px-5 py-2.5 hover:bg-bg transition-colors"
          >
            {step === 1 ? '홈으로' : '이전'}
          </button>

          {step < 4 ? (
            step > 1 && (
              <button
                type="button"
                onClick={goNext}
                className="text-sm text-white bg-lavender-deep rounded-xl px-5 py-2.5 hover:opacity-90 transition-opacity"
              >
                다음
              </button>
            )
          ) : (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => navigate('/feedback')}
                className="text-sm text-ink border border-lavender/20 rounded-xl px-5 py-2.5 hover:bg-bg transition-colors"
              >
                근무 종료 후 피드백 남기기
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="text-sm text-white bg-lavender-deep rounded-xl px-5 py-2.5 hover:opacity-90 transition-opacity"
              >
                완료
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
