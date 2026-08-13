import { Sparkles } from 'lucide-react'

export default function AICommentBar({ comment, onViewDetail }) {
  return (
    <div className="bg-card rounded-2xl border border-lavender/10 p-5 flex items-center gap-4">
      <div className="w-9 h-9 rounded-full bg-lavender-deep/10 flex items-center justify-center shrink-0">
        <Sparkles size={16} className="text-lavender-deep" />
      </div>
      <div className="flex-1">
        <p className="text-xs font-bold text-lavender-deep mb-0.5">AI 코멘트</p>
        <p className="text-sm text-ink/80">{comment}</p>
      </div>
      <button
        type="button"
        onClick={onViewDetail}
        className="shrink-0 text-sm text-ink border border-lavender/20 rounded-xl px-4 py-2 hover:bg-bg transition-colors"
      >
        상세 분석 보기
      </button>
    </div>
  )
}
