import { BatteryLow, BatteryMedium, BatteryFull } from 'lucide-react'

const OPTIONS = [
  { value: '낮음', icon: BatteryLow, color: 'text-coral', bg: 'bg-coral/10 border-coral' },
  { value: '보통', icon: BatteryMedium, color: 'text-gold', bg: 'bg-gold/10 border-gold' },
  { value: '높음', icon: BatteryFull, color: 'text-sage', bg: 'bg-sage/10 border-sage' },
]

export default function ConditionStep({ value, onSelect }) {
  return (
    <div>
      <h1 className="text-lg font-bold text-ink mb-1">지금 컨디션은 어떠세요?</h1>
      <p className="text-sm text-muted mb-6">현재 피로도를 선택해주세요.</p>

      <div className="grid grid-cols-3 gap-4 max-w-lg">
        {OPTIONS.map(({ value: v, icon: Icon, color, bg }) => {
          const isSelected = value === v
          return (
            <button
              key={v}
              type="button"
              onClick={() => onSelect(v)}
              className={`flex flex-col items-center gap-2 rounded-2xl border-2 py-6 transition-colors ${
                isSelected ? bg : 'border-lavender/10 bg-card hover:border-lavender/30'
              }`}
            >
              <Icon size={26} className={isSelected ? color : 'text-muted'} />
              <span className={`text-sm font-medium ${isSelected ? color : 'text-ink/70'}`}>{v}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
