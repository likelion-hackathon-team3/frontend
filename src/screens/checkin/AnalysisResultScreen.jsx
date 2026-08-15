import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TriangleAlert, Lightbulb, Check, ArrowRight, Loader2, Moon, Footprints, HeartPulse, Watch } from 'lucide-react'
import Sidebar from '../../components/Sidebar.jsx'
import { fetchAnalysis, fetchWearableData, formatShiftMinutes } from '../../api/status.js'

// User Flow 03단계 — 통합분석 결과.
// GET /api/analysis 응답(근무 전환 분석 + 개인 회복 상태 분석)과
// GET /api/wearable-data 응답(오늘의 웨어러블 수치)을 함께 반영한다.
// "맞춤 웰니스 계획 보기"를 누르면 04단계(웰니스 타임라인)로 넘어가는데,
// 타임라인 화면은 다른 팀원 담당이라 이 사본에는 포함되어 있지 않다 (라우트만 남겨둠).
const RISK_STYLE = {
  NORMAL: { bg: 'bg-sage/10', border: 'border-sage/30', icon: 'text-sage', text: 'text-sage' },
  CAUTION: { bg: 'bg-gold/10', border: 'border-gold/30', icon: 'text-gold', text: 'text-gold' },
  DANGER: { bg: 'bg-coral/10', border: 'border-coral/30', icon: 'text-coral', text: 'text-coral' },
}

function Cell({ label, value, sub, valueClass = 'text-ink' }) {
  return (
    <div>
      <p className="text-xs text-muted mb-0.5">{label}</p>
      <p className={`text-sm font-bold ${valueClass}`}>{value}</p>
      {sub && <p className="text-[11px] text-muted mt-0.5">{sub}</p>}
    </div>
  )
}

function MiniStat({ icon: Icon, label, value }) {
  return (
    <div className="bg-bg rounded-xl p-3 flex flex-col gap-1">
      <span className="flex items-center gap-1 text-[11px] text-muted">
        <Icon size={12} />
        {label}
      </span>
      <span className="text-sm font-bold text-ink">{value}</span>
    </div>
  )
}

export default function AnalysisResultScreen() {
  const navigate = useNavigate()
  const [state, setState] = useState({ status: 'loading', data: null, wearable: null, message: '' })

  useEffect(() => {
    let cancelled = false
    Promise.all([fetchAnalysis('success'), fetchWearableData()]).then(([res, wearable]) => {
      if (cancelled) return
      if (res.success === false) {
        setState({ status: 'error', data: null, wearable: null, message: res.message })
      } else {
        setState({ status: 'success', data: res, wearable, message: '' })
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  const risk = state.data ? RISK_STYLE[state.data.riskLevel] || RISK_STYLE.CAUTION : RISK_STYLE.CAUTION

  return (
    <div className="min-h-screen bg-bg flex">
      <Sidebar />

      <main className="flex-1 p-8 max-w-5xl">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-7 h-7 rounded-full bg-lavender-deep text-white text-xs font-bold flex items-center justify-center shrink-0">
            03
          </span>
          <span className="text-sm font-bold text-ink">통합분석 결과</span>
        </div>

        {state.status === 'loading' && (
          <div className="flex items-center gap-2 text-sm text-muted py-20 justify-center">
            <Loader2 size={16} className="animate-spin" />
            분석하는 중이에요...
          </div>
        )}

        {state.status === 'error' && (
          <div className="flex items-center gap-2 text-sm text-coral bg-coral/5 border border-coral/20 rounded-2xl px-5 py-4">
            <TriangleAlert size={16} />
            {state.message}
          </div>
        )}

        {state.status === 'success' && state.data && (
          <>
            <div className={`rounded-2xl border p-5 mb-6 ${risk.bg} ${risk.border}`}>
              <div className="flex items-center gap-2 mb-1">
                <TriangleAlert size={16} className={risk.icon} />
                <p className="text-base font-bold text-ink">
                  이번 {state.data.transitionLabel} 전환은 '{state.data.riskLabel}'가 필요해요
                </p>
              </div>
              <p className="text-sm text-ink/70">{state.data.bannerMessage}</p>
            </div>

            <div className="grid grid-cols-2 gap-5 mb-6">
              <div className="bg-card rounded-2xl border border-lavender/10 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-6 h-6 rounded-full bg-lavender-deep text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h2 className="text-sm font-bold text-ink">근무 전환 분석</h2>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Cell label="전환 유형" value={state.data.transitionLabel} sub={state.data.transitionSubLabel} valueClass="text-lavender-deep" />
                  <Cell label="최근 연속 근무일수" value={`${state.data.consecutiveDays}일`} sub="(오늘 포함)" />
                  <Cell label="다음 근무까지" value={formatShiftMinutes(state.data.currentCondition.nextShiftMinutes)} />
                  <Cell label="실제 활용 가능시간" value={state.data.availableHoursLabel} sub={state.data.availableHoursNote} valueClass="text-sage" />
                </div>

                <div className="bg-bg rounded-xl p-4">
                  <p className="text-xs text-muted mb-1">전환 위험도</p>
                  <div className={`flex items-center gap-1.5 font-bold text-sm mb-1 ${risk.text}`}>
                    <TriangleAlert size={14} />
                    {state.data.riskLabel}
                  </div>
                  <p className="text-xs text-ink/70 leading-relaxed">{state.data.riskNote}</p>
                </div>
              </div>

              <div className="bg-card rounded-2xl border border-lavender/10 p-5">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-lavender-deep text-white text-xs font-bold flex items-center justify-center">
                      2
                    </span>
                    <h2 className="text-sm font-bold text-ink">
                      개인 회복 상태 분석 <span className="text-muted font-normal">(웨어러블 + 컨디션 기반)</span>
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Cell
                    label="현재 피로도 (사용자 입력)"
                    value={state.data.currentCondition.fatigueLevel}
                    sub={state.data.currentCondition.fatigueNote}
                    valueClass="text-coral"
                  />
                  <Cell
                    label="종합 회복 상태"
                    value={state.data.currentCondition.recoveryStatus}
                    sub={state.data.currentCondition.recoveryNote}
                    valueClass="text-coral"
                  />
                </div>

                <p className="text-xs text-muted mb-2">오늘의 웨어러블 데이터</p>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  <MiniStat icon={Moon} label="수면시간" value={state.wearable.sleepLabel} />
                  <MiniStat icon={Footprints} label="활동량" value={`${state.wearable.activitySteps.toLocaleString()} 걸음`} />
                  <MiniStat icon={HeartPulse} label="안정시 심박수" value={`${state.wearable.heartRate} bpm`} />
                  <MiniStat icon={Watch} label="착용 기기" value="스마트워치" />
                </div>

                <div className="bg-lavender-deep/5 rounded-xl p-4">
                  <p className="text-xs font-bold text-lavender-deep mb-1">AI 코멘트</p>
                  <p className="text-xs text-ink/70 leading-relaxed">{state.data.aiComment}</p>
                </div>
              </div>
            </div>

            <div className="bg-lavender-deep/5 border border-lavender/10 rounded-2xl p-5 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="text-xs font-bold text-lavender-deep mb-2 flex items-center gap-1.5">
                  <Lightbulb size={14} />
                  이번 전환을 위한 핵심 포인트
                </p>
                <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-ink/70">
                  {state.data.keyPoints.map((point) => (
                    <span key={point} className="flex items-center gap-1">
                      <Check size={12} className="text-sage" />
                      {point}
                    </span>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate('/timeline')}
                className="shrink-0 flex items-center gap-1.5 text-sm text-white bg-lavender-deep rounded-xl px-5 py-2.5 hover:opacity-90 transition-opacity"
              >
                맞춤 웰니스 계획 보기
                <ArrowRight size={14} />
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
