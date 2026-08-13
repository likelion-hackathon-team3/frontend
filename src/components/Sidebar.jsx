import { NavLink } from 'react-router-dom'
import { Home, CalendarDays, Activity, Settings } from 'lucide-react'

// 공식 User Flow / MVP 문서 기준 4개 메뉴 (홈 대시보드 / 근무표 / 웰니스 분석 / 설정)
const NAV_ITEMS = [
  { to: '/', label: '홈 대시보드', icon: Home, end: true },
  { to: '/schedule', label: '근무표', icon: CalendarDays },
  { to: '/checkin', label: '웰니스 분석', icon: Activity },
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
