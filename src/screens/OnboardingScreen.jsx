import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScanLine, Sparkles, BellRing } from 'lucide-react'
import { fetchEnvironment } from '../api/environment.js'

const FEATURES = [
  { icon: ScanLine, title: '근무표 자동 인식', desc: '근무표 사진만 올리면 AI가 D/E/N/OFF를 자동으로 읽어드려요.' },
  { icon: Sparkles, title: '개인화 웰니스 타임라인', desc: '다음 근무 전까지 수면·식사·운동·회복 시점을 맞춤 제안해요.' },
  { icon: BellRing, title: '사전예방 알림', desc: '힘들었던 전환이 다시 예정되면 미리 알려드려요.' },
]

export default function OnboardingScreen() {
  const navigate = useNavigate()

  // 앱이 켜지자마자 설정 여부를 확인하고, 이미 했으면 홈으로 바로 보냅니다!
  useEffect(() => {
    fetchEnvironment().then(env => {
      if (env.configured) {
        navigate('/home')
      }
    })
  }, [navigate])

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="text-2xl font-bold text-ink mb-2">
          퇴근후<span className="text-lavender-deep">애(愛)</span>
        </div>
        <p className="text-sm text-muted mb-8">교대근무자의 퇴근 후 시간을 AI가 설계하다</p>

        <div className="flex flex-col gap-3 mb-8 text-left">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-card border border-lavender/10 rounded-2xl p-4 flex items-start gap-3">
              <span className="w-9 h-9 rounded-full bg-lavender-deep/10 flex items-center justify-center shrink-0">
                <Icon size={16} className="text-lavender-deep" />
              </span>
              <div>
                <p className="text-sm font-bold text-ink">{title}</p>
                <p className="text-xs text-muted mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => navigate('/schedule/upload')}
          className="w-full text-sm text-white bg-lavender-deep rounded-xl py-3 font-medium hover:opacity-90 transition-opacity"
        >
          시작하기
        </button>
      </div>
    </div>
  )
}
