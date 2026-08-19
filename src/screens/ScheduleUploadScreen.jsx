import { useState, useRef } from 'react' // 👈 useRef 추가
import { useNavigate } from 'react-router-dom'
import { Camera, Loader2, PenLine } from 'lucide-react'
import Sidebar from '../components/Sidebar.jsx'
import { recognizeSchedule } from '../api/schedule.js'

export default function ScheduleUploadScreen() {
  const navigate = useNavigate()
  const [recognizing, setRecognizing] = useState(false)
  
  // 💡 1. 숨겨진 파일 입력창을 조종할 리모컨(ref) 생성
  const fileInputRef = useRef(null)

  // 💡 2. 업로드 박스를 누르면 숨겨진 파일창을 대신 클릭하게 만드는 함수
  const handleBoxClick = () => {
    fileInputRef.current.click()
  }

  // 💡 3. 사용자가 실제 사진 파일을 선택했을 때 실행되는 함수
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setRecognizing(true)

    // 나중에 진짜 백엔드 OCR(사진 전송) API를 연결할 때 이 파라미터(file)를 넘겨주면 됩니다!
    recognizeSchedule(file).then((result) => {
      if (result.success === true) {
        navigate('/schedule/confirm', { 
          state: { 
            marks: result.marks || result.recognizedSchedules || {}, 
            uncertain: result.uncertain || result.failedDates || [], 
            source: 'ocr' 
          } 
        })
      } else {
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

        {/* 💡 4. 업로드 박스를 누르면 handleBoxClick이 실행되도록 연결 */}
        <button
          type="button"
          onClick={handleBoxClick}
          disabled={recognizing}
          className="w-full bg-card border-2 border-dashed border-lavender/30 rounded-2xl py-10 flex flex-col items-center gap-3 hover:border-lavender-deep/50 transition-colors disabled:opacity-60 cursor-pointer"
        >
          {/* 💡 화면에는 보이지 않지만 실제로 파일 선택 팝업을 띄워주는 핵심 요소 */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

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