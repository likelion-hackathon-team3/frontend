import React, { useState, useRef } from 'react';

function Step3CalendarInput({ shiftType, schedules, updateFormData, onNext, onPrev }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState([]);
  
  // AI 사진 업로드 로딩 상태
  const [isUploading, setIsUploading] = useState(false);
  // 숨겨진 파일 입력(input) 창을 클릭하기 위한 참조(ref)
  const fileInputRef = useRef(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay(); 
  const daysInMonth = new Date(year, month + 1, 0).getDate(); 

  const blanks = Array.from({ length: firstDay }, () => null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const totalSlots = [...blanks, ...days];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const formatDate = (d) => {
    const formattedMonth = String(month + 1).padStart(2, '0');
    const formattedDay = String(d).padStart(2, '0');
    return `${year}-${formattedMonth}-${formattedDay}`;
  };

  const toggleDateSelection = (dateString) => {
    if (selectedDates.includes(dateString)) {
      setSelectedDates(selectedDates.filter(d => d !== dateString));
    } else {
      setSelectedDates([...selectedDates, dateString]);
    }
  };

  const assignShift = (assignedType) => {
    if (selectedDates.length === 0) {
      alert('먼저 달력에서 날짜를 하나 이상 선택해주세요.');
      return;
    }
    let updatedSchedules = [...schedules];
    selectedDates.forEach(dateStr => {
      const existingIndex = updatedSchedules.findIndex(s => s.date === dateStr);
      if (existingIndex >= 0) {
        updatedSchedules[existingIndex].shift = assignedType;
      } else {
        updatedSchedules.push({ date: dateStr, shift: assignedType });
      }
    });
    updateFormData('schedules', updatedSchedules);
    setSelectedDates([]);
  };

  const getShiftForDate = (dateString) => {
    const schedule = schedules.find(s => s.date === dateString);
    return schedule ? schedule.shift : null;
  };

  // --- AI 사진 업로드 가짜(Mock) API 처리 로직 ---
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);

    // 실제로는 여기서 axios.post('/api/schedules/recognize', formData) 를 호출합니다.
    // 지금은 프론트엔드 테스트를 위해 1.5초 뒤에 가짜 결과가 내려오도록 흉내 냈습니다.
    setTimeout(() => {
      const mockRecognizedSchedules = [
        { date: formatDate(10), shift: 'DAY' },
        { date: formatDate(11), shift: 'EVENING' },
        { date: formatDate(12), shift: 'NIGHT' },
        { date: formatDate(13), shift: 'OFF' },
        { date: formatDate(14), shift: 'DAY' },
      ];
      
      updateFormData('schedules', mockRecognizedSchedules);
      setIsUploading(false);
      
      alert('AI가 근무표 인식을 완료했습니다!\n잘못 인식된 날짜가 있다면 달력에서 덮어씌워 수정해주세요.');
    }, 1500);
  };

  const shiftStyles = {
    DAY: { bg: '#E8F5E9', text: '#2E7D32', label: 'D' },
    EVENING: { bg: '#FFF3E0', text: '#E65100', label: 'E' },
    NIGHT: { bg: '#F3E5F5', text: '#6A1B9A', label: 'N' },
    OFF: { bg: '#F3F4F6', text: '#4B5563', label: 'OFF' }
  };

  const showDay = shiftType !== '야간교대'; 
  const showEvening = shiftType === '3교대' || shiftType === '불규칙';
  const buttonCount = (showDay ? 1 : 0) + (showEvening ? 1 : 0) + 2; 

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>근무표 입력</h2>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>근무표 사진을 올리거나, 달력에 직접 입력해주세요.</p>

      {/* 📸 AI 사진 업로드 영역 */}
      <div style={{ marginBottom: '24px', padding: '20px', backgroundColor: '#F3F4F6', borderRadius: '12px', textAlign: 'center', border: '2px dashed #D1D5DB' }}>
        <input 
          type="file" 
          accept="image/*" 
          style={{ display: 'none' }} 
          ref={fileInputRef} 
          onChange={handleFileUpload} 
        />
        <button 
          onClick={() => fileInputRef.current.click()} 
          disabled={isUploading}
          style={{ 
            padding: '12px 24px', 
            borderRadius: '8px', 
            border: 'none', 
            backgroundColor: isUploading ? '#9CA3AF' : '#111', 
            color: '#FFF', 
            fontWeight: 'bold', 
            fontSize: '15px',
            cursor: isUploading ? 'wait' : 'pointer',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        >
          {isUploading ? '⏳ AI가 이미지를 분석 중입니다...' : '📸 AI 근무표 사진 업로드'}
        </button>
        <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '12px' }}>
          * 사진 업로드 시 기존 달력에 자동으로 근무가 입력됩니다.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', padding: '0 10px' }}>
        <button onClick={prevMonth} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}>&lt;</button>
        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{year}년 {month + 1}월</span>
        <button onClick={nextMonth} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}>&gt;</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: '8px', fontSize: '13px', color: '#666' }}>
        <div style={{ color: '#EF4444' }}>일</div><div>월</div><div>화</div><div>수</div><div>목</div><div>금</div><div style={{ color: '#3B82F6' }}>토</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '24px' }}>
        {totalSlots.map((day, index) => {
          if (!day) return <div key={`blank-${index}`} style={{ padding: '20px' }}></div>;
          const dateString = formatDate(day);
          const isSelected = selectedDates.includes(dateString);
          const assignedShift = getShiftForDate(dateString);
          
          return (
            <div 
              key={dateString} onClick={() => toggleDateSelection(dateString)}
              style={{
                position: 'relative', height: '56px', display: 'flex', flexDirection: 'column',
                justifyContent: 'center', alignItems: 'center',
                border: isSelected ? '2px solid #6366F1' : '1px solid #E5E7EB', borderRadius: '8px',
                cursor: 'pointer', backgroundColor: isSelected ? '#EEF2FF' : '#FFF', transition: 'all 0.1s'
              }}
            >
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#111' }}>{day}</span>
              {assignedShift && (
                <div style={{ marginTop: '4px', fontSize: '11px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '4px', backgroundColor: shiftStyles[assignedShift].bg, color: shiftStyles[assignedShift].text }}>
                  {shiftStyles[assignedShift].label}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ backgroundColor: '#F9FAFB', padding: '16px', borderRadius: '12px', marginBottom: '24px' }}>
        <div style={{ fontSize: '13px', color: '#666', marginBottom: '12px', textAlign: 'center' }}>
          선택된 날짜: <strong style={{ color: '#6366F1' }}>{selectedDates.length}개</strong>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${buttonCount}, 1fr)`, gap: '8px' }}>
          {showDay && (
            <button onClick={() => assignShift('DAY')} style={{ padding: '10px 0', border: 'none', borderRadius: '6px', backgroundColor: shiftStyles.DAY.bg, color: shiftStyles.DAY.text, fontWeight: 'bold', cursor: 'pointer' }}>D 데이</button>
          )}
          {showEvening && (
            <button onClick={() => assignShift('EVENING')} style={{ padding: '10px 0', border: 'none', borderRadius: '6px', backgroundColor: shiftStyles.EVENING.bg, color: shiftStyles.EVENING.text, fontWeight: 'bold', cursor: 'pointer' }}>E 이브닝</button>
          )}
          <button onClick={() => assignShift('NIGHT')} style={{ padding: '10px 0', border: 'none', borderRadius: '6px', backgroundColor: shiftStyles.NIGHT.bg, color: shiftStyles.NIGHT.text, fontWeight: 'bold', cursor: 'pointer' }}>N 나이트</button>
          <button onClick={() => assignShift('OFF')} style={{ padding: '10px 0', border: 'none', borderRadius: '6px', backgroundColor: shiftStyles.OFF.bg, color: shiftStyles.OFF.text, fontWeight: 'bold', cursor: 'pointer' }}>OFF 휴무</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={onPrev} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB', backgroundColor: '#FFF', cursor: 'pointer', fontWeight: 'bold' }}>이전</button>
        <button onClick={onNext} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#6366F1', color: '#FFF', cursor: 'pointer', fontWeight: 'bold' }}>다음</button>
      </div>
    </div>
  );
}

export default Step3CalendarInput;