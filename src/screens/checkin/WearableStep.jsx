import { useEffect, useState } from 'react'
import { Loader2, Moon, Footprints, HeartPulse } from 'lucide-react'
import { fetchWearableData } from '../../api/status.js'

export default function WearableStep() {
  const [data, setData] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetchWearableData().then((d) => {
      if (!cancelled) setData(d)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div>
      <h1 className="text-lg font-bold text-ink mb-1">웨어러블 데이터를 확인할게요.</h1>
      <p className="text-sm text-muted mb-6">최근 수면·활동·심박 데이터예요. (MVP 목업 데이터)</p>

      {!data ? (
        <div className="flex items-center gap-2 text-sm text-muted py-10">
          <Loader2 size={16} className="animate-spin" />
          불러오는 중이에요...
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4 max-w-lg">
          <div className="bg-card rounded-2xl border border-lavender/10 p-5 flex flex-col items-center gap-2">
            <Moon size={20} className="text-lavender-deep" />
            <span className="text-lg font-bold text-ink">{data.sleepLabel}</span>
            <span className="text-xs text-muted">수면 시간</span>
          </div>
          <div className="bg-card rounded-2xl border border-lavender/10 p-5 flex flex-col items-center gap-2">
            <Footprints size={20} className="text-sage" />
            <span className="text-lg font-bold text-ink">{data.activitySteps.toLocaleString()}</span>
            <span className="text-xs text-muted">활동량 (걸음)</span>
          </div>
          <div className="bg-card rounded-2xl border border-lavender/10 p-5 flex flex-col items-center gap-2">
            <HeartPulse size={20} className="text-coral" />
            <span className="text-lg font-bold text-ink">{data.heartRate} bpm</span>
            <span className="text-xs text-muted">심박수</span>
          </div>
        </div>
      )}
    </div>
  )
}
