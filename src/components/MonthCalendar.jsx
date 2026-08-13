import { ChevronLeft, ChevronRight } from 'lucide-react'

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

export const MARK_STYLE = {
  D: { bg: 'bg-sage/15', text: 'text-sage', dot: 'bg-sage', label: 'D 주간' },
  E: { bg: 'bg-terracotta/15', text: 'text-terracotta', dot: 'bg-terracotta', label: 'E 저녁' },
  N: { bg: 'bg-lavender-deep/15', text: 'text-lavender-deep', dot: 'bg-lavender-deep', label: 'N 야간' },
  OFF: { bg: 'bg-gold/15', text: 'text-gold', dot: 'bg-gold', label: 'OFF 휴무' },
}

function daysInMonth(year, month) {
  return new Date(year, month, 0).getDate()
}

export default function MonthCalendar({
  year,
  month, // 1-12
  marks = {}, // { [day]: 'D' | 'N' | 'OFF' }
  selectedDays = new Set(),
  onDayClick,
  onPrevMonth,
  onNextMonth,
  showLegend = true,
}) {
  const total = daysInMonth(year, month)
  const firstWeekday = new Date(year, month - 1, 1).getDay()
  const prevMonthTotal = daysInMonth(year, month - 1 === 0 ? 12 : month - 1)

  const cells = []
  for (let i = 0; i < firstWeekday; i++) {
    cells.push({ day: prevMonthTotal - firstWeekday + 1 + i, muted: true })
  }
  for (let d = 1; d <= total; d++) {
    cells.push({ day: d, muted: false })
  }
  while (cells.length % 7 !== 0) {
    cells.push({ day: cells.length - firstWeekday - total + 1, muted: true })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <button type="button" onClick={onPrevMonth} className="p-1 rounded hover:bg-bg text-muted">
          <ChevronLeft size={16} />
        </button>
        <span className="text-sm font-medium text-ink">
          {year}년 {month}월
        </span>
        <button type="button" onClick={onNextMonth} className="p-1 rounded hover:bg-bg text-muted">
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-xs text-muted mb-1">
        {WEEKDAYS.map((w) => (
          <span key={w} className="py-1">
            {w}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-center">
        {cells.map((cell, i) => {
          const mark = !cell.muted ? marks[cell.day] : null
          const style = mark ? MARK_STYLE[mark] : null
          const isSelected = !cell.muted && selectedDays.has(cell.day)
          return (
            <button
              type="button"
              key={i}
              disabled={cell.muted}
              onClick={() => onDayClick && onDayClick(cell.day)}
              className={`mx-auto w-8 h-8 rounded-lg text-xs flex items-center justify-center transition-colors ${
                cell.muted
                  ? 'text-muted/40 cursor-default'
                  : style
                    ? `${style.bg} ${style.text} font-medium`
                    : isSelected
                      ? 'bg-lavender/10 text-ink'
                      : 'text-ink hover:bg-bg'
              }`}
            >
              {cell.day}
            </button>
          )
        })}
      </div>

      {showLegend && (
        <div className="flex items-center gap-4 mt-3 text-xs text-muted flex-wrap">
          {Object.entries(MARK_STYLE).map(([key, s]) => (
            <span key={key} className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full inline-block ${s.dot}`} />
              {s.label}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
