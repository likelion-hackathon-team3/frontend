import React from 'react';

function Step2Confirm({ formData, onPrev, onSaveSchedule }) {
  const displayDate = formData.schedules.length > 0 ? new Date(formData.schedules[0].date) : new Date();
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

  const shiftCounts = { DAY: 0, EVENING: 0, NIGHT: 0, OFF: 0 };
  
  formData.schedules.forEach(schedule => {
    const scheduleDate = new Date(schedule.date);
    if (scheduleDate.getFullYear() === year && scheduleDate.getMonth() === month) {
      if (shiftCounts[schedule.shift] !== undefined) {
        shiftCounts[schedule.shift] += 1;
      }
    }
  });

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', fontFamily: 'sans-serif', paddingBottom: '20px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>근무표 최종 확인</h2>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>입력하신 근무표가 맞는지 확인하고 저장해주세요.</p>

      {/* 달력 영역 */}
      <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #E5E7EB', borderRadius: '12px', backgroundColor: '#FFF', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
        <div style={{ textAlign: 'center', marginBottom: '16px', fontSize: '16px', fontWeight: 'bold', color: '#111' }}>
          {year}년 {month + 1}월
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: '8px', fontSize: '13px', color: '#666' }}>
          <div style={{ color: '#EF4444' }}>일</div><div>월</div><div>화</div><div>수</div><div>목</div><div>금</div><div style={{ color: '#3B82F6' }}>토</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
          {totalSlots.map((day, index) => {
            if (!day) return <div key={`blank-${index}`} style={{ padding: '20px' }}></div>;
            const dateString = formatDate(day);
            const assignedShift = getShiftForDate(dateString);
            
            return (
              <div key={dateString} style={{ position: 'relative', height: '56px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid #F3F4F6', borderRadius: '8px', backgroundColor: assignedShift ? '#FFF' : '#F9FAFB' }}>
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

      {/* 통계 영역 */}
      <div style={{ marginBottom: '32px', padding: '20px', border: '1px solid #E5E7EB', borderRadius: '12px', backgroundColor: '#FFF' }}>
        {Object.keys(shiftCounts).map((shiftKey) => (
          <div key={shiftKey} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: shiftKey !== 'OFF' ? '1px solid #F3F4F6' : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ display: 'inline-block', width: '24px', height: '24px', lineHeight: '24px', textAlign: 'center', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', backgroundColor: shiftStyles[shiftKey].bg, color: shiftStyles[shiftKey].text }}>
                {shiftStyles[shiftKey].label}
              </span>
              <span style={{ fontSize: '14px', color: '#4B5563' }}>{shiftStyles[shiftKey].name}</span>
            </div>
            <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#111' }}>
              {shiftCounts[shiftKey]}일
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={onPrev} style={{ flex: 1, padding: '14px', borderRadius: '8px', border: '1px solid #D1D5DB', backgroundColor: '#FFF', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>수정하기 (이전)</button>
        {/* 클릭 시 근무표가 서버에 저장되고, 3단계로 넘어갑니다. */}
        <button onClick={onSaveSchedule} style={{ flex: 1, padding: '14px', borderRadius: '8px', border: 'none', backgroundColor: '#6366F1', color: '#FFF', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>근무표 저장하고 다음으로</button>
      </div>
    </div>
  );
}

export default Step2Confirm;