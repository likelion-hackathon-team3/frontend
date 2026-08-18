import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, Loader2, PenLine } from 'lucide-react'
import Sidebar from '../components/Sidebar.jsx'
import { recognizeSchedule } from '../api/schedule.js'

export default function ScheduleUploadScreen() {
  const navigate = useNavigate()
  const [recognizing, setRecognizing] = useState(false)

function handleUpload() {
    setRecognizing(true)
    
    recognizeSchedule().then((result) => {
      // success가 true일 때만 다음 화면으로 이동!
      if (result.success === true) {
        // (참고: API 명세서의 recognizedSchedules가 내려올 경우를 대비해 OR(||) 처리도 살짝 추가했습니다)
        navigate('/schedule/confirm', { 
          state: { 
            marks: result.marks || result.recognizedSchedules || {}, 
            uncertain: result.uncertain || result.failedDates || [], 
            source: 'ocr' 
          } 
        })
      } else {
        // 실패 시 알림창 띄우기
        alert(result.message || '이미지를 인식할 수 없습니다. 직접 입력해주세요.')
        setRecognizing(false)
      }
    })
  }

  function handleManual() {
    navigate('/schedule/confirm', { state: { marks: {}, uncertain: [], source: 'manual' } })
  }

  return (
    <div className="min-h-screen bg-bg flex">
      <Sidebar />
      <main className="flex-1 p-8 max-w-md">
        <h1 className="text-lg font-bold text-ink mb-1">근무표를 업로드해주세요.</h1>
        <p className="text-sm text-muted mb-6">근무표 사진을 올리면 AI가 D/E/N/OFF 일정을 자동으로 인식해요.</p>

        <button
          type="button"
          onClick={handleUpload}
          disabled={recognizing}
          className="w-full bg-card border-2 border-dashed border-lavender/30 rounded-2xl py-10 flex flex-col items-center gap-3 hover:border-lavender-deep/50 transition-colors disabled:opacity-60"
        >
          {recognizing ? (
            <>
              <Loader2 size={26} className="text-lavender-deep animate-spin" />
              <span className="text-sm text-ink/70">AI가 근무표를 인식하고 있어요...</span>
            </>
          ) : (
            <>
              <Camera size={26} className="text-lavender-deep" />
              <span className="text-sm text-ink/70">근무표 사진 업로드 (클릭)</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleManual}
          className="mt-4 w-full flex items-center justify-center gap-1.5 text-sm text-ink border border-lavender/20 rounded-xl py-2.5 hover:bg-bg transition-colors"
        >
          <PenLine size={14} />
          사진 없이 직접 입력할게요
        </button>
      </main>
    </div>
  )
}
