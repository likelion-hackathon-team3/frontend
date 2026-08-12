import { useState } from 'react';
import Step1ShiftType from './Step1ShiftType';
import Step2TimeSetting from './Step2TimeSetting';   // 바뀐 이름으로 불러오기
import Step3CalendarInput from './Step3CalendarInput'; // 바뀐 이름으로 불러오기
import Step4Confirm from './Step4Confirm';

export default function ScheduleSetupWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    shiftType: '',
    shiftTimes: {  // 시간 설정을 먼저 받음
      dayShift: { start: '07:00', end: '15:00' },
      eveningShift: { start: '15:00', end: '23:00' },
      nightShift: { start: '23:00', end: '07:00' },
      commuteMinutes: 30,
    },
    schedules: [], // 그 다음 달력 데이터를 받음
  });

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const updateFormData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    console.log("최종 제출 데이터:", formData);
    alert('제출 완료! (콘솔을 확인하세요)');
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', maxWidth: '600px', margin: '20px auto' }}>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        단계: {currentStep} / 4
      </div>
      
      {currentStep === 1 && (
        <Step1ShiftType formData={formData} updateFormData={updateFormData} onNext={nextStep} />
      )}
      {/* 2단계: 시간 설정이 먼저 렌더링 됩니다 */}
      {currentStep === 2 && (
        <Step2TimeSetting 
          shiftType={formData.shiftType} 
          shiftTimes={formData.shiftTimes} 
          updateFormData={updateFormData} 
          onNext={nextStep} 
          onPrev={prevStep} 
        />     
         )}
      {/* 3단계: 달력 입력이 그 다음 렌더링 됩니다 */}
      {currentStep === 3 && (
        <Step3CalendarInput 
          shiftType={formData.shiftType} 
          schedules={formData.schedules} 
          updateFormData={updateFormData} 
          onNext={nextStep} 
          onPrev={prevStep} 
        />
         )}
      {currentStep === 4 && (
        <Step4Confirm formData={formData} onPrev={prevStep} onSubmit={handleSubmit} />
      )}
    </div>
  );
}