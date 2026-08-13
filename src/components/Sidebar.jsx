import { NavLink } from 'react-router-dom'
import { Home, CalendarDays, Clock, MessageSquareHeart, Settings } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/', label: '홈', icon: Home, end: true },
  { to: '/schedule', label: '근무표 입력', icon: CalendarDays },
  { to: '/timeline', label: '타임라인', icon: Clock },
  { to: '/feedback', label: '피드백 & 기록', icon: MessageSquareHeart },
  { to: '/settings', label: '설정', icon: Settings },
]

export default function Sidebar() {
  return (
    <aside className="w-56 shrink-0 border-r border-lavender/10 px-4 py-6 flex flex-col gap-8">
      <div className="text-xl font-bold text-ink px-2">
        퇴근후<span className="text-lavender-deep">애(愛)</span>
      </div>
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left transition-colors ${
                isActive
                  ? 'bg-lavender-deep/10 text-lavender-deep font-medium'
                  : 'text-ink/70 hover:bg-bg'
              }`
            }
          >
            <Icon size={18} strokeWidth={2} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
