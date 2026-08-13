import { useState } from 'react';
import Step1CalendarInput from './Step1CalendarInput';
import Step2Confirm from './Step2Confirm';
import Step3TimeSetting from './Step3TimeSetting';

export default function ScheduleSetupWizard({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    schedules: [],
    shiftTimes: {},
    commuteTime: '',
  });

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);
  const updateFormData = (key, value) => setFormData((prev) => ({ ...prev, [key]: value }));

  const handleScheduleSubmit = async () => {
    console.log("✅ [API 전송] 근무표 데이터 저장:", formData.schedules);
    alert('근무표가 성공적으로 저장되었습니다!\n이제 최초 1회 시간 설정을 진행합니다.');
    nextStep(); 
  };

  const handleTimeSubmit = async () => {
    console.log("✅ [API 전송] 시간 설정 데이터 저장:", { shiftTimes: formData.shiftTimes, commuteTime: formData.commuteTime });
    alert('시간 설정이 완료되었습니다!');
    onComplete(); 
  };

  const stepLabels = ['근무표 입력', '근무표 확인', '시간 및 통근 설정'];

  return (
    <div style={{ flex: 1, backgroundColor: '#F9FAFB', height: '100vh', overflowY: 'auto', padding: '40px', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#FFF', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', padding: '40px 40px 60px 40px', minHeight: '80vh' }}>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '48px', flexWrap: 'wrap', gap: '8px' }}>
          {stepLabels.map((label, index) => {
            const stepNum = index + 1;
            const isActive = currentStep === stepNum;
            const isCompleted = currentStep > stepNum;

            return (
              <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: isActive || isCompleted ? '#6366F1' : '#9CA3AF' }}>
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', fontWeight: 'bold',
                    backgroundColor: isActive ? '#6366F1' : isCompleted ? '#EEF2FF' : '#FFF',
                    color: isActive ? '#FFF' : isCompleted ? '#6366F1' : '#9CA3AF',
                    border: isActive || isCompleted ? 'none' : '1px solid #D1D5DB'
                  }}>
                    {isCompleted ? '✓' : stepNum}
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: isActive ? 'bold' : 'normal' }}>{label}</span>
                </div>
                {index < stepLabels.length - 1 && (
                  <div style={{ width: '30px', height: '1px', backgroundColor: '#E5E7EB', margin: '0 12px' }} />
                )}
              </div>
            );
          })}
        </div>

        {currentStep === 1 && <Step1CalendarInput schedules={formData.schedules} updateFormData={updateFormData} onNext={nextStep} />}
        {currentStep === 2 && <Step2Confirm formData={formData} onPrev={prevStep} onSaveSchedule={handleScheduleSubmit} />}
        {currentStep === 3 && <Step3TimeSetting shiftTimes={formData.shiftTimes} commuteTime={formData.commuteTime} updateFormData={updateFormData} onSubmit={handleTimeSubmit} />}
        
      </div>
    </div>
  );
}