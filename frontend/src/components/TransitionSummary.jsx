const BADGE_STYLE = {
  주의: { bar: 'bg-coral', badge: 'bg-coral/10 text-coral' },
  좋음: { bar: 'bg-sage', badge: 'bg-sage/10 text-sage' },
  개선: { bar: 'bg-lavender-deep', badge: 'bg-lavender-deep/10 text-lavender-deep' },
}

function Row({ label, transition, score, badge }) {
  const style = BADGE_STYLE[badge] || BADGE_STYLE['좋음']
  return (
    <div className="flex items-center gap-3 py-3 border-b border-lavender/10 last:border-b-0">
      <span className={`w-1 self-stretch rounded-full ${style.bar}`} />
      <div className="flex-1">
        <p className="text-xs text-muted">{label}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-bold text-ink">{transition}</span>
          <span className="text-sm text-ink/80">{score}</span>
        </div>
      </div>
      <span className={`text-xs font-medium px-3 py-1 rounded-full ${style.badge}`}>{badge}</span>
    </div>
  )
}

export default function TransitionSummary({ highlights, onViewAll }) {
  if (!highlights) {
    return (
      <div className="bg-card rounded-2xl border border-lavender/10 p-5">
        <h3 className="text-sm font-bold text-ink mb-2">전환별 피로도 요약</h3>
        <p className="text-sm text-muted py-6 text-center">표시할 데이터가 없어요.</p>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-2xl border border-lavender/10 p-5">
      <h3 className="text-sm font-bold text-ink mb-1">전환별 피로도 요약</h3>
      <div>
        <Row {...highlights.worst} />
        <Row {...highlights.best} />
        <Row {...highlights.improved} />
      </div>
      <button
        type="button"
        onClick={onViewAll}
        className="mt-4 w-full text-center text-sm text-lavender-deep border border-lavender/20 rounded-xl py-2 hover:bg-lavender-deep/5 transition-colors"
      >
        전체보기
      </button>
    </div>
  )
}
