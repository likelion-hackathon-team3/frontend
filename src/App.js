import ScheduleSetupWizard from './components/setup/ScheduleSetupWizard';

function App() {
  return (
    <div className="App">
      {/* 우리가 만든 다단계 마법사 컴포넌트를 최상위에서 불러옵니다 */}
      <ScheduleSetupWizard />
    </div>
  );
}

export default App;