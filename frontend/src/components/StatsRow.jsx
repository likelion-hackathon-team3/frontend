import { ArrowUp, ArrowDown, Minus } from 'lucide-react'

const ARROW = { up: ArrowUp, down: ArrowDown, none: Minus }
const TONE_COLOR = { good: 'text-sage', bad: 'text-coral', neutral: 'text-muted' }

function StatItem({ label, display, deltaText, arrow, tone }) {
  const Icon = ARROW[arrow] || Minus
  return (
    <div className="flex-1 px-6 py-5">
      <p className="text-xs text-muted">{label}</p>
      <div className="mt-2 text-2xl font-bold text-ink">{display}</div>
      {deltaText && (
        <div className={`mt-1 flex items-center gap-1 text-xs font-medium ${TONE_COLOR[tone] || 'text-muted'}`}>
          <Icon size={12} />
          <span>{deltaText}</span>
        </div>
      )}
    </div>
  )
}

export default function StatsRow({ stats }) {
  const items = [stats.sleep, stats.fatigue, stats.routine, stats.transitionCount]
  return (
    <div className="bg-card rounded-2xl border border-lavender/10 divide-x divide-lavender/10 flex">
      {items.map((item, i) => (
        <StatItem key={i} {...item} />
      ))}
    </div>
  )
}
