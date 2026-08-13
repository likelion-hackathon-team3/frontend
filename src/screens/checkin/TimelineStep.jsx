import { Utensils, Moon, BedDouble, Sunrise, Briefcase, Sparkles } from 'lucide-react'
import data from '../../data/timeline-mock.json'

const TAG_ICON = {
  식사: Utensils,
  권장: Moon,
  수면: BedDouble,
  기상: Sunrise,
  근무: Briefcase,
}

export default function TimelineStep() {
  return (
    <div>
      <h1 className="text-lg font-bold text-ink mb-1">AI 개인화 웰니스 타임라인</h1>
      <p className="text-sm text-muted mb-6">다음 근무 전까지 이 순서대로 준비해보세요.</p>

      <div className="bg-card rounded-2xl border border-lavender/10 p-5 max-w-lg">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={15} className="text-lavender-deep" />
          <span className="text-sm font-bold text-ink">{data.transition.label}</span>
        </div>
        <ul className="flex flex-col">
          {data.events.map((ev, i) => {
            const Icon = TAG_ICON[ev.tag] || Briefcase
            return (
              <li key={i} className="flex items-start gap-3 py-3 border-b border-lavender/10 last:border-b-0">
                <span className="w-8 h-8 rounded-full bg-lavender-deep/10 flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-lavender-deep" />
                </span>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-muted">{ev.time}</span>
                    <span className="text-sm font-medium text-ink">{ev.title}</span>
                  </div>
                  <p className="text-xs text-ink/60 mt-0.5">{ev.desc}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
