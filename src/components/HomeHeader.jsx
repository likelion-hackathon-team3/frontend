import { RefreshCw, ChevronDown } from 'lucide-react'

export default function HomeHeader({ name, message, period }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="text-xl font-bold text-ink">안녕하세요, {name}님!</h1>
        <p className="text-sm text-muted mt-1">{message}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex items-center gap-2 text-sm text-ink border border-lavender/20 rounded-xl px-3 py-2 hover:bg-bg transition-colors"
        >
          {period}
          <RefreshCw size={13} className="text-muted" />
        </button>
        <button
          type="button"
          className="flex items-center gap-1 text-sm text-ink border border-lavender/20 rounded-xl px-3 py-2 hover:bg-bg transition-colors"
        >
          이번 달 요약
          <ChevronDown size={13} className="text-muted" />
        </button>
      </div>
    </div>
  )
}
