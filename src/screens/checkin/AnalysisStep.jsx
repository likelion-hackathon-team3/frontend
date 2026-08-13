import { useEffect, useState } from 'react'
import { Loader2, AlertTriangle } from 'lucide-react'
import { fetchAnalysis } from '../../api/status.js'

const RISK_LABEL = { NORMAL: '일반', CAUTION: '주의', DANGER: '위험' }
const RISK_STYLE = {
  NORMAL: 'bg-sage/10 text-sage',
  CAUTION: 'bg-gold/10 text-gold',
  DANGER: 'bg-coral/10 text-coral',
}

function Cell({ label, value }) {
  return (
    <div>
      <p className="text-xs text-muted">{label}</p>
      <p className="text-sm font-bold text-ink mt-0.5">{value}</p>
    </div>
  )
}

export default function AnalysisStep({ scenario = 'success' }) {
  const [state, setState] = useState({ status: 'loading', data: null, message: '' })

  useEffect(() => {
    let cancelled = false
    fetchAnalysis(scenario).then((res) => {
      if (cancelled) return
      if (res.success === false) {
        setState({ status: 'error', data: null, message: res.message })
      } else {
        setState({ status: 'success', data: res, message: '' })
      }
    })
    return () => {
      cancelled = true
    }
  }, [scenario])

  return (
    <div>
      <h1 className="text-lg font-bold text-ink mb-1">통합 분석 결과예요.</h1>
      <p className="text-sm text-muted mb-6">근무 전환 정보와 현재 상태를 함께 분석했어요.</p>

      {state.status === 'loading' && (
        <div className="flex items-center gap-2 text-sm text-muted py-10">
          <Loader2 size={16} className="animate-spin" />
          분석하는 중이에요...
        </div>
      )}

      {state.status === 'error' && (
        <div className="flex items-center gap-2 text-sm text-coral bg-coral/5 border border-coral/20 rounded-2xl px-5 py-4 max-w-lg">
          <AlertTriangle size={16} />
          {state.message}
        </div>
      )}

      {state.status === 'success' && state.data && (
        <div className="bg-card rounded-2xl border border-lavender/10 p-5 max-w-lg">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-bold text-ink">{state.data.transitionType.replaceAll('_', ' → ')}</span>
            <span className={`ml-auto text-xs font-medium px-3 py-1 rounded-full ${RISK_STYLE[state.data.riskLevel]}`}>
              {RISK_LABEL[state.data.riskLevel]}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Cell label="연속 근무일수" value={`${state.data.consecutiveDays}일`} />
            <Cell label="실제 활용 가능시간" value={`${state.data.availableHours}시간`} />
            <Cell label="현재 피로도" value={state.data.currentCondition.fatigueLevel} />
            <Cell label="회복 상태" value={state.data.currentCondition.recoveryStatus} />
          </div>
          <div className="border-t border-lavender/10 pt-3">
            <Cell label="웨어러블 수면시간" value={`${state.data.currentCondition.sleepHours}시간`} />
          </div>
        </div>
      )}
    </div>
  )
}
