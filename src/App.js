import React, { useState } from 'react';
// Sidebar와 위자드의 정확한 파일 경로로 수정했습니다.
import Sidebar from './components/layout/Sidebar';
import ScheduleSetupWizard from './components/setup/ScheduleSetupWizard';

function App() {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  const handleCompleteSetup = () => {
    setIsOnboardingComplete(true);
  };

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden' }}>
      {isOnboardingComplete ? (
        <>
          <Sidebar />
          <div style={{ flex: 1, backgroundColor: '#F9FAFB', padding: '40px', overflowY: 'auto' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>홈 대시보드</h2>
            <p>오늘의 근무 및 컨디션을 확인하는 메인 화면이 이곳에 들어갑니다.</p>
          </div>
        </>
      ) : (
        <ScheduleSetupWizard onComplete={handleCompleteSetup} />
      )}
    </div>
  );
}

export default App;