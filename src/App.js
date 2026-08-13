import React from 'react';
import Sidebar from './components/layout/Sidebar';
import ScheduleSetupWizard from './components/setup/ScheduleSetupWizard';

function App() {
  return (
    // 전체 화면을 꽉 채우고, 가로로(flex) 배치
    <div style={{ display: 'flex', width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden' }}>
      <Sidebar />
      <ScheduleSetupWizard />
    </div>
  );
}

export default App;