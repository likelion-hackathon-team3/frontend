import { useEffect, useState } from 'react'
import { TriangleAlert } from 'lucide-react'
import { fetchDashboardAlerts } from '../api/dashboard.js'

// riskLevel별 색상 매핑 (지침 4장 API 연동 규칙 참고)
const RISK_STYLE = {
  NORMAL: { bg: 'bg-sage/5', border: 'border-sage/20', icon: 'text-sage', title: 'text-sage' },
  CAUTION: { bg: 'bg-gold/5', border: 'border-gold/20', icon: 'text-gold', title: 'text-gold' },
  DANGER: { bg: 'bg-coral/5', border: 'border-coral/20', icon: 'text-coral', title: 'text-coral' },
}

// 홈 대시보드 "사전예방 카드" — User Flow 명세 기준.
// 과거 피로도가 높았던 동일 근무 전환이 다시 예정된 경우에만 조건부로 노출된다.
// GET /api/dashboard (Notion API 명세서 · 사전예방 알림 조회) 응답을 기준으로 동작하며,
// 실제 API는 HTTP 에러가 아니라 200 + { success:false, message } 형태로 예외를 내려주므로
// try/catch가 아니라 success 플래그로 상태를 분기한다.
// 데이터가 없거나(조건 미충족) 로딩/에러 상태에서는 카드를 아예 노출하지 않는다 (조건부 노출 원칙).
export default function PreventiveAlerts({ scenario = 'success', startDate, endDate }) {
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    let cancelled = false

    fetchDashboardAlerts(scenario, { startDate, endDate }).then((res) => {
      if (cancelled) return
      if (res.success) {
        setAlerts(res.alerts || [])
      } else {
        console.error('[GET /api/dashboard]', res.message)
        setAlerts([])
      }
    })

    return () => {
      cancelled = true
    }
  }, [scenario, startDate, endDate])

  if (alerts.length === 0) return null

  return (
    <div className="flex flex-col gap-3">
      {alerts.map((alert, i) => {
        const style = RISK_STYLE[alert.riskLevel] || RISK_STYLE.CAUTION
        return (
          <div key={`${alert.date}-${i}`} className={`rounded-2xl border p-5 ${style.bg} ${style.border}`}>
            <div className="flex items-center gap-2 mb-1">
              <TriangleAlert size={15} className={style.icon} />
              <p className={`text-sm font-bold ${style.title}`}>{alert.title}</p>
            </div>
            <p className="text-sm text-ink/70">{alert.message}</p>
            {alert.recommendation && <p className="text-xs text-ink/60 mt-1">{alert.recommendation}</p>}
          </div>
        )
      })}
    </div>
  )
}
