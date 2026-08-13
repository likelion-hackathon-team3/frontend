import { Check } from 'lucide-react'

const DEFAULT_STEPS = [
  { n: 1, label: '교대 유형 선택' },
  { n: 2, label: '근무표 입력' },
  { n: 3, label: '근무 시간 설정' },
  { n: 4, label: '확인 및 저장' },
]

export default function StepIndicator({ current, steps = DEFAULT_STEPS }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      {steps.map((step, i) => {
        const isDone = step.n < current
        const isCurrent = step.n === current
        return (
          <div key={step.n} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${
                  isDone
                    ? 'bg-lavender-deep text-white'
                    : isCurrent
                      ? 'bg-lavender-deep text-white'
                      : 'border border-lavender/30 text-muted'
                }`}
              >
                {isDone ? <Check size={13} /> : step.n}
              </span>
              <span className={`text-sm ${isCurrent ? 'text-ink font-medium' : 'text-muted'}`}>{step.label}</span>
            </div>
            {i < steps.length - 1 && <span className="w-8 h-px bg-lavender/20 mx-1" />}
          </div>
        )
      })}
    </div>
  )
}
