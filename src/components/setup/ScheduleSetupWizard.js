import { useState } from 'react';
import Step1ShiftType from './Step1ShiftType';
import Step2TimeSetting from './Step2TimeSetting';
import Step3CalendarInput from './Step3CalendarInput';
import Step4Confirm from './Step4Confirm';

export default function ScheduleSetupWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    shiftType: '',
    shiftTimes: {},
    schedules: [],
  });

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);
  const updateFormData = (key, value) => setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    console.log("최종 제출 데이터:", formData);
    alert('제출 완료! (콘솔을 확인하세요)');
  };

  // 상단 진행 상태 바(Stepper) 이름 정의
  const stepLabels = ['교대 유형 선택', '근무 시간 설정', '근무표 입력', '확인 및 저장'];

  return (
    // 우측 메인 콘텐츠 영역 바탕 (연한 회색)
    <div style={{ flex: 1, backgroundColor: '#F9FAFB', height: '100vh', overflowY: 'auto', padding: '40px', boxSizing: 'border-box' }}>
      
      {/* 하얀색 둥근 카드 컨테이너 */}
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#FFF', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', padding: '40px 40px 60px 40px', minHeight: '80vh' }}>
        
        {/* 상단 Stepper 영역 */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '48px', flexWrap: 'wrap', gap: '8px' }}>
          {stepLabels.map((label, index) => {
            const stepNum = index + 1;
            const isActive = currentStep === stepNum;
            const isCompleted = currentStep > stepNum;

            return (
              <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: isActive || isCompleted ? '#6366F1' : '#9CA3AF' }}>
                  {/* 동그라미 아이콘 */}
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', fontWeight: 'bold',
                    backgroundColor: isActive ? '#6366F1' : isCompleted ? '#EEF2FF' : '#FFF',
                    color: isActive ? '#FFF' : isCompleted ? '#6366F1' : '#9CA3AF',
                    border: isActive || isCompleted ? 'none' : '1px solid #D1D5DB'
                  }}>
                    {isCompleted ? '✓' : stepNum}
                  </div>
                  {/* 텍스트 라벨 */}
                  <span style={{ fontSize: '14px', fontWeight: isActive ? 'bold' : 'normal' }}>{label}</span>
                </div>
                {/* 단계 사이 연결선 (마지막 항목 제외) */}
                {index < stepLabels.length - 1 && (
                  <div style={{ width: '30px', height: '1px', backgroundColor: '#E5E7EB', margin: '0 12px' }} />
                )}
              </div>
            );
          })}
        </div>

        {/* 현재 단계별 화면 렌더링 */}
        {currentStep === 1 && <Step1ShiftType formData={formData} updateFormData={updateFormData} onNext={nextStep} />}
        {currentStep === 2 && <Step2TimeSetting shiftType={formData.shiftType} shiftTimes={formData.shiftTimes} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />}
        {currentStep === 3 && <Step3CalendarInput shiftType={formData.shiftType} schedules={formData.schedules} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />}
        {currentStep === 4 && <Step4Confirm formData={formData} onPrev={prevStep} onSubmit={handleSubmit} />}
        
      </div>
    </div>
  );
}