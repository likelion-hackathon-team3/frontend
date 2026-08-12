import React from 'react';

function Step4Confirm({ formData, onPrev, onSubmit }) {
  // 달력을 그리기 위한 기준 연/월 (입력된 근무표의 첫 번째 날짜 기준, 없으면 현재 달)
  const displayDate = formData.schedules.length > 0 
    ? new Date(formData.schedules[0].date) 
    : new Date();

  const year = displayDate.getFullYear();
  const month = displayDate.getMonth();
  
  const firstDay = new Date(year, month, 1).getDay(); 
  const daysInMonth = new Date(year, month + 1, 0).getDate(); 

  const blanks = Array.from({ length: firstDay }, () => null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const totalSlots = [...blanks, ...days];

  const formatDate = (d) => {
    const formattedMonth = String(month + 1).padStart(2, '0');
    const formattedDay = String(d).padStart(2, '0');
    return `${year}-${formattedMonth}-${formattedDay}`;
  };

  const getShiftForDate = (dateString) => {
    const schedule = formData.schedules.find(s => s.date === dateString);
    return schedule ? schedule.shift : null;
  };

  const shiftStyles = {
    DAY: { bg: '#E8F5E9', text: '#2E7D32', label: 'D', name: '데이' },
    EVENING: { bg: '#FFF3E0', text: '#E65100', label: 'E', name: '이브닝' },
    NIGHT: { bg: '#F3E5F5', text: '#6A1B9A', label: 'N', name: '나이트' },
    OFF: { bg: '#F3F4F6', text: '#4B5563', label: 'OFF', name: '휴무' }
  };

  // --- 화면에 표시된 달(Month) 기준 근무 통계 계산 로직 ---
  const shiftCounts = { DAY: 0, EVENING: 0, NIGHT: 0, OFF: 0 };
  
  formData.schedules.forEach(schedule => {
    const scheduleDate = new Date(schedule.date);
    // 현재 달력에 렌더링된 연/월과 일치하는 데이터만 카운트
    if (scheduleDate.getFullYear() === year && scheduleDate.getMonth() === month) {
      if (shiftCounts[schedule.shift] !== undefined) {
        shiftCounts[schedule.shift] += 1;
      }
    }
  });

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', fontFamily: 'sans-serif', paddingBottom: '20px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
        근무표 확인
      </h2>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
        입력한 근무표를 확인하고 저장해주세요.
      </p>

      {/* 1. 사용자가 선택한 교대 유형 표시 카드 */}
      <div style={{ marginBottom: '20px', padding: '16px', border: '1px solid #E5E7EB', borderRadius: '12px', backgroundColor: '#F9FAFB' }}>
        <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>선택한 교대 유형</div>
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#111' }}>
          {formData.shiftType || '선택 안 함'}
        </div>
      </div>

      {/* 2. 읽기 전용 달력 영역 */}
      <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #E5E7EB', borderRadius: '12px', backgroundColor: '#FFF', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
        
        {/* 달력 헤더 */}
        <div style={{ textAlign: 'center', marginBottom: '16px', fontSize: '16px', fontWeight: 'bold', color: '#111' }}>
          {year}년 {month + 1}월
        </div>

        {/* 요일 헤더 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: '8px', fontSize: '13px', color: '#666' }}>
          <div style={{ color: '#EF4444' }}>일</div><div>월</div><div>화</div><div>수</div><div>목</div><div>금</div><div style={{ color: '#3B82F6' }}>토</div>
        </div>

        {/* 달력 그리드 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
          {totalSlots.map((day, index) => {
            if (!day) return <div key={`blank-${index}`} style={{ padding: '20px' }}></div>;
            
            const dateString = formatDate(day);
            const assignedShift = getShiftForDate(dateString);
            
            return (
              <div 
                key={dateString}
                style={{
                  position: 'relative', height: '56px', display: 'flex', flexDirection: 'column',
                  justifyContent: 'center', alignItems: 'center',
                  border: '1px solid #F3F4F6', borderRadius: '8px',
                  backgroundColor: assignedShift ? '#FFF' : '#F9FAFB',
                }}
              >
                <span style={{ fontSize: '14px', fontWeight: '500', color: assignedShift ? '#111' : '#9CA3AF' }}>{day}</span>
                {assignedShift && (
                  <div style={{ marginTop: '4px', fontSize: '11px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '4px', backgroundColor: shiftStyles[assignedShift].bg, color: shiftStyles[assignedShift].text }}>
                    {shiftStyles[assignedShift].label}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. 근무 유형별 일수 통계 영역 */}
      <div style={{ marginBottom: '32px', padding: '20px', border: '1px solid #E5E7EB', borderRadius: '12px', backgroundColor: '#FFF' }}>
        {Object.keys(shiftCounts).map((shiftKey) => {
          // 2교대, 야간교대 등에서 사용하지 않는 근무(카운트 0)는 숨김 처리 가능 (현재는 모두 표시)
          if (shiftCounts[shiftKey] === 0 && formData.shiftType === '2교대' && shiftKey === 'EVENING') return null;
          if (shiftCounts[shiftKey] === 0 && formData.shiftType === '야간교대' && (shiftKey === 'DAY' || shiftKey === 'EVENING')) return null;

          return (
            <div key={shiftKey} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: shiftKey !== 'OFF' ? '1px solid #F3F4F6' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ 
                  display: 'inline-block', width: '24px', height: '24px', lineHeight: '24px', textAlign: 'center', 
                  borderRadius: '12px', fontSize: '11px', fontWeight: 'bold',
                  backgroundColor: shiftStyles[shiftKey].bg, color: shiftStyles[shiftKey].text 
                }}>
                  {shiftStyles[shiftKey].label}
                </span>
                <span style={{ fontSize: '14px', color: '#4B5563' }}>{shiftStyles[shiftKey].name}</span>
              </div>
              <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#111' }}>
                {shiftCounts[shiftKey]}일
              </div>
            </div>
          );
        })}
      </div>

      {/* 하단 네비게이션 버튼 */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={onPrev} 
          style={{ flex: 1, padding: '14px', borderRadius: '8px', border: '1px solid #D1D5DB', backgroundColor: '#FFF', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}
        >
          이전
        </button>
        <button 
          onClick={onSubmit} 
          style={{ flex: 1, padding: '14px', borderRadius: '8px', border: 'none', backgroundColor: '#6366F1', color: '#FFF', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}
        >
          저장하기
        </button>
      </div>
    </div>
  );
}

export default Step4Confirm;