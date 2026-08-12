import React from 'react';

function Sidebar() {
  const menuItems = [
    { icon: '🏠', label: '홈 (분석 리포트)', active: false },
    { icon: '📅', label: '근무표 입력', active: true }, // 현재 화면이므로 활성화(active) 처리
    { icon: '🕒', label: '타임라인', active: false },
    { icon: '📝', label: '피드백 & 기록', active: false },
    { icon: '⚙️', label: '설정', active: false },
  ];

  return (
    <div style={{ width: '240px', borderRight: '1px solid #E5E7EB', padding: '24px 16px', backgroundColor: '#FFF', height: '100vh', boxSizing: 'border-box' }}>
      {/* 로고 영역 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '40px', paddingLeft: '8px' }}>
        <div style={{ width: '28px', height: '28px', backgroundColor: '#6366F1', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 'bold', fontSize: '18px' }}>
         愛 
        </div>
        <h1 style={{ fontSize: '20px', fontWeight: '900', color: '#111', margin: 0, letterSpacing: '-0.5px' }}>퇴근후애(愛)</h1>
      </div>

      {/* 메뉴 리스트 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {menuItems.map((item, index) => (
          <div key={index} style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px',
            backgroundColor: item.active ? '#EEF2FF' : 'transparent',
            color: item.active ? '#6366F1' : '#4B5563',
            fontWeight: item.active ? 'bold' : 'normal',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}>
            <span style={{ fontSize: '18px' }}>{item.icon}</span>
            <span style={{ fontSize: '15px' }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;