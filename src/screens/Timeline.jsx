import { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  Utensils,
  Bath,
  Briefcase,
  Coffee,
  Dumbbell,
  Sparkles,
  X,
  Loader2,
  Minus,
  Plus,
  Star,
} from "lucide-react";

// 💡 1. 통신에 필요한 API 함수 2개 모두 임포트!
import { fetchTimeline } from "../api/timeline.js";
import { submitFeedback } from "../api/timelineFeedback.js";

// 상단 범례 데이터
const LEGEND_ITEMS = [
  { label: "수면", color: "bg-lavender-deep" },
  { label: "식사", color: "bg-gold" },
  { label: "운동", color: "bg-sage" },
  { label: "회복", color: "bg-coral" },
  { label: "카페인", color: "bg-[#6D4C41]" },
  { label: "근무", color: "bg-blue-600" },
];

// 카테고리 테마 매퍼 (아이콘 & 색상 자동화)
const CATEGORY_THEME = {
  SLEEP: {
    icon: Moon,
    color: "text-lavender-deep",
    dotColor: "border-lavender-deep",
  },
  MEAL: { icon: Utensils, color: "text-gold", dotColor: "border-gold" }, // 👈 sage에서 gold로 수정!
  EXERCISE: { icon: Dumbbell, color: "text-sage", dotColor: "border-sage" },
  PREPARATION: {
    icon: Bath,
    color: "text-coral",
    dotColor: "borgit add .der-coral",
  }, // 👈 blue-400에서 coral로 수정!
  CAFFEINE: {
    icon: Coffee,
    color: "text-[#6D4C41]",
    dotColor: "border-[#6D4C41]",
  },
  WAKE_UP: {
    icon: Sun,
    color: "text-lavender-deep",
    dotColor: "border-lavender-deep",
  },
  WORK: {
    icon: Briefcase,
    color: "text-blue-600",
    dotColor: "border-blue-600",
  },
};

const DEFAULT_THEME = {
  icon: Sparkles,
  color: "text-lavender-deep",
  dotColor: "border-lavender-deep",
};

export default function TimelinePage({ targetDate = "" }) {
  // --- 상태 관리 (State) ---
  const [loading, setLoading] = useState(true);
  const [timelineData, setTimelineData] = useState(null);

  // 피드백 모달 관련 상태
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // 💡 POST 전송 중(로딩) 상태

  // 피드백 입력 데이터
  const [feedback, setFeedback] = useState({
    actualSleepDuration: 6.0,
    caffeineIntake: {
      taken: false,
      lastTime: "12:00",
    },
    postShiftFatigue: 5,
    routineHelpfulness: 0,
  });

  // --- 화면 렌더링 시 타임라인 데이터 가져오기 (GET) ---
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchTimeline(targetDate).then((res) => {
      if (!isMounted) return;
      if (res.success) {
        setTimelineData(res.data);
      } else {
        alert(res.message || "타임라인을 불러오지 못했습니다.");
      }
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [targetDate]);

  // --- 핸들러 함수 ---
  const handleOpenFeedback = () => setIsFeedbackModalOpen(true);
  const handleCloseFeedback = () => setIsFeedbackModalOpen(false);

  // 💡 피드백 제출 로직 (POST 통신 + UX 처리)
  const handleSubmit = async () => {
    if (feedback.routineHelpfulness === 0) {
      alert("루틴 도움 정도(별점)를 평가해 주세요!");
      return;
    }

    // 1. 통신 시작 (버튼 비활성화 및 스피너 온)
    setIsSubmitting(true);

    // 2. 전송할 데이터 포장
    const payload = {
      feedbackDate: targetDate || new Date().toISOString().split("T")[0],
      actualSleepDuration: feedback.actualSleepDuration,
      caffeineIntake: feedback.caffeineIntake,
      postShiftFatigue: feedback.postShiftFatigue,
      routineHelpfulness: feedback.routineHelpfulness,
    };

    try {
      // 3. 백엔드로 데이터 쏘기 (API 호출)
      const res = await submitFeedback(payload);

      // 4. 성공/실패 분기 처리
      if (res.success) {
        alert(
          "피드백이 성공적으로 제출되었습니다! AI가 다음 일정을 더 똑똑하게 준비할게요.",
        );
        handleCloseFeedback(); // 성공 시 모달 닫기
      } else {
        alert(res.message || "피드백 제출에 실패했습니다.");
      }
    } catch (error) {
      alert("서버와 통신 중 오류가 발생했습니다.");
    } finally {
      // 5. 통신 종료 (무조건 스피너 끄기)
      setIsSubmitting(false);
    }
  };

  // --- UI 렌더링 ---
  if (loading) {
    return (
      <div className="p-16 flex flex-col items-center justify-center gap-3 text-muted">
        <Loader2 className="animate-spin text-lavender-deep" size={32} />
        <p className="text-sm font-medium">
          맞춤 타임라인을 불러오는 중입니다...
        </p>
      </div>
    );
  }

  if (!timelineData)
    return (
      <div className="p-16 text-center text-muted">
        표시할 데이터가 없습니다.
      </div>
    );

  return (
    <div className="p-8 flex flex-col gap-6 max-w-[1100px] relative">
      {/* 1. 헤더 (API 명세서 적용) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-lavender-deep text-white text-xs font-bold px-2 py-1 rounded-full">
              04
            </span>
            <span className="font-bold text-ink">개인화 웰니스 타임라인</span>
          </div>
          <h1 className="text-2xl font-bold text-ink">
            {timelineData.pageTitle}
          </h1>
          <p className="text-sm text-muted mt-1">{timelineData.pageSubtitle}</p>
        </div>

        <div className="flex items-center gap-4 bg-white border border-lavender/20 rounded-2xl px-4 py-2 shadow-sm">
          {LEGEND_ITEMS.map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span className={`w-3 h-3 rounded-full ${item.color}`} />
              <span className="text-xs font-medium text-ink">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. 메인 컨텐츠 영역 */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* 왼쪽 타임라인 리스트 */}
        <div className="flex-1 w-full bg-card rounded-3xl border border-lavender/10 p-6 md:p-8 shadow-sm">
          <div className="relative">
            <div className="absolute left-[23px] top-6 bottom-6 w-px bg-lavender/40" />
            <div className="flex flex-col">
              {timelineData.timelineItems?.map((item, idx) => {
                const theme = CATEGORY_THEME[item.category] || DEFAULT_THEME;
                const IconComponent = theme.icon;
                return (
                  <div key={idx} className="flex items-stretch relative z-10">
                    <div className="w-12 shrink-0 flex justify-center relative pt-[26px]">
                      <div
                        className={`w-3 h-3 rounded-full bg-white border-2 ${theme.dotColor} z-10`}
                      />
                    </div>
                    <div className="flex-1 flex items-start gap-5 py-5 border-b border-[#EAE6F5] last:border-0">
                      <div className="w-14 shrink-0 pt-0.5">
                        <span className={`font-bold text-lg ${theme.color}`}>
                          {item.time}
                        </span>
                      </div>
                      <div className={`pt-0.5 shrink-0 ${theme.color}`}>
                        <IconComponent size={24} strokeWidth={2.5} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-ink text-base mb-0.5">
                          {item.title}
                        </h3>
                        <p className="text-sm text-ink/70">
                          {item.description}
                        </p>
                        {item.highlight && (
                          <div className="inline-block bg-[#F5F3FA] text-lavender-deep text-xs font-bold px-3 py-1.5 rounded-xl mt-2">
                            {item.highlight}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 오른쪽 추천 포인트 박스 */}
        <div className="w-full lg:w-72 flex flex-col gap-4">
          <div className="bg-[#F5F3FA] rounded-3xl border border-lavender/20 p-6">
            <h3 className="font-bold text-lavender-deep mb-6">추천 포인트</h3>
            <ul className="flex flex-col gap-5 text-sm text-ink/90 font-medium">
              {timelineData.recommendations?.map((recText, idx) => (
                <li key={idx} className="flex gap-2.5">
                  <span className="text-lavender-deep font-bold mt-0.5">•</span>
                  <span className="leading-relaxed">{recText}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <button
        onClick={handleOpenFeedback}
        className="w-full bg-[#F5F3FA] hover:bg-[#EAE6F5] text-lavender-deep font-bold text-lg py-5 rounded-3xl border border-lavender/20 transition-colors shadow-sm mt-2"
      >
        이 계획대로 실천하고 피드백 남기기
      </button>

      {/* 3. 유저 친화적 피드백 모달 */}
      {isFeedbackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-lavender/20">
              <div>
                <h2 className="text-xl font-bold text-ink">타임라인 피드백</h2>
                <p className="text-sm text-muted mt-1">
                  답변해 주시면 AI가 다음 일정을 더 완벽하게 짜드려요!
                </p>
              </div>
              <button
                onClick={handleCloseFeedback}
                className="p-2 rounded-xl text-muted hover:bg-bg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
              {/* 실제 수면 시간 */}
              <div className="flex flex-col gap-3">
                <h3 className="text-base font-bold text-ink">
                  간밤에 실제로 몇 시간 주무셨나요?
                </h3>
                <div className="flex items-center justify-between bg-bg rounded-2xl p-4">
                  <button
                    onClick={() =>
                      setFeedback((prev) => ({
                        ...prev,
                        actualSleepDuration: Math.max(
                          0,
                          prev.actualSleepDuration - 0.5,
                        ),
                      }))
                    }
                    className="p-2 bg-white rounded-xl shadow-sm hover:bg-lavender/10 text-lavender-deep"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="text-xl font-bold text-ink">
                    {feedback.actualSleepDuration} 시간
                  </span>
                  <button
                    onClick={() =>
                      setFeedback((prev) => ({
                        ...prev,
                        actualSleepDuration: Math.min(
                          24,
                          prev.actualSleepDuration + 0.5,
                        ),
                      }))
                    }
                    className="p-2 bg-white rounded-xl shadow-sm hover:bg-lavender/10 text-lavender-deep"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              {/* 카페인 섭취 */}
              <div className="flex flex-col gap-3">
                <h3 className="text-base font-bold text-ink">
                  오늘 카페인을 섭취하셨나요?
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setFeedback((prev) => ({
                        ...prev,
                        caffeineIntake: {
                          ...prev.caffeineIntake,
                          taken: false,
                        },
                      }))
                    }
                    className={`flex-1 py-3 rounded-2xl font-medium transition-colors border ${!feedback.caffeineIntake.taken ? "bg-lavender-deep text-white border-lavender-deep" : "bg-white text-ink/70 border-lavender/30"}`}
                  >
                    안 마심
                  </button>
                  <button
                    onClick={() =>
                      setFeedback((prev) => ({
                        ...prev,
                        caffeineIntake: { ...prev.caffeineIntake, taken: true },
                      }))
                    }
                    className={`flex-1 py-3 rounded-2xl font-medium transition-colors border ${feedback.caffeineIntake.taken ? "bg-lavender-deep text-white border-lavender-deep" : "bg-white text-ink/70 border-lavender/30"}`}
                  >
                    마심
                  </button>
                </div>
                {feedback.caffeineIntake.taken && (
                  <div className="flex items-center justify-between bg-bg rounded-2xl p-4 mt-1 animate-in fade-in">
                    <span className="text-sm font-medium text-ink">
                      마지막 섭취 시간
                    </span>
                    <input
                      type="time"
                      value={feedback.caffeineIntake.lastTime}
                      onChange={(e) =>
                        setFeedback((prev) => ({
                          ...prev,
                          caffeineIntake: {
                            ...prev.caffeineIntake,
                            lastTime: e.target.value,
                          },
                        }))
                      }
                      className="bg-white border border-lavender/30 rounded-xl px-3 py-1.5 text-ink font-medium focus:outline-none focus:border-lavender-deep"
                    />
                  </div>
                )}
              </div>

              {/* 체감 피로도 */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-ink">
                    오늘 근무 후 체감 피로도는 어떤가요?
                  </h3>
                  <span className="text-lg font-bold text-lavender-deep">
                    {feedback.postShiftFatigue}점
                  </span>
                </div>
                <div className="flex flex-col gap-2 bg-bg rounded-2xl p-5">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={feedback.postShiftFatigue}
                    onChange={(e) =>
                      setFeedback((prev) => ({
                        ...prev,
                        postShiftFatigue: parseInt(e.target.value),
                      }))
                    }
                    className="w-full accent-lavender-deep"
                  />
                  <div className="flex justify-between text-xs font-medium text-muted mt-1">
                    <span>쌩쌩함 (1)</span>
                    <span>방전 직전 (10)</span>
                  </div>
                </div>
              </div>

              {/* 루틴 도움 정도 */}
              <div className="flex flex-col gap-3">
                <h3 className="text-base font-bold text-ink">
                  오늘 제안해 드린 루틴이 도움이 되었나요?
                </h3>
                <div className="flex justify-center gap-2 bg-bg rounded-2xl p-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() =>
                        setFeedback((prev) => ({
                          ...prev,
                          routineHelpfulness: star,
                        }))
                      }
                      className="p-1 transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star
                        size={36}
                        className={
                          feedback.routineHelpfulness >= star
                            ? "fill-gold text-gold"
                            : "text-lavender/30"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 💡 4. 제출 버튼 (따닥 방지 + 로딩 스피너 UI 완벽 적용) */}
            <div className="p-6 border-t border-lavender/20">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 text-white font-bold text-lg py-4 rounded-2xl transition-colors shadow-md 
                  ${isSubmitting ? "bg-lavender-deep/50 cursor-not-allowed" : "bg-lavender-deep hover:bg-lavender-deep/90"}`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={24} />
                    제출 중...
                  </>
                ) : (
                  "피드백 제출하기"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
