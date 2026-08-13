import React from 'react';

function Step2TimeSetting({ shiftType, shiftTimes, updateFormData, onNext, onPrev }) {
  const handleChange = (shiftKey, field, value) => {
    const updatedShiftTimes = {
      ...shiftTimes,
      [shiftKey]: {
        ...shiftTimes[shiftKey],
        [field]: value
      }
    };
    updateFormData('shiftTimes', updatedShiftTimes);
  };

  // 선택된 교대 유형에 따른 조건부 렌더링 로직
  const showDay = shiftType !== '야간교대'; // 야간교대가 아닐 때만 데이 표시
  const showEvening = shiftType === '3교대' || shiftType === '불규칙'; // 3교대, 불규칙일 때만 이브닝 표시

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
        근무 시간 설정
      </h2>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
        각 근무의 출퇴근 시간을 설정해주세요. (최초 1회만 설정됩니다.)
      </p>

      {/* 데이(Day) */}
      {showDay && (
        <div style={{ marginBottom: '16px', padding: '16px', border: '1px solid #E5E7EB', borderRadius: '12px', backgroundColor: '#F9FAFB' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '12px', color: '#111' }}>☀️ 데이</h3>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>출근 시각</label>
              <input type="time" value={shiftTimes.dayShift?.start || '07:00'} onChange={(e) => handleChange('dayShift', 'start', e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>퇴근 시각</label>
              <input type="time" value={shiftTimes.dayShift?.end || '15:00'} onChange={(e) => handleChange('dayShift', 'end', e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
            </div>
          </div>
        </div>
      )}

      {/* 이브닝(Evening) */}
      {showEvening && (
        <div style={{ marginBottom: '16px', padding: '16px', border: '1px solid #E5E7EB', borderRadius: '12px', backgroundColor: '#F9FAFB' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '12px', color: '#111' }}>🌥️ 이브닝</h3>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>출근 시각</label>
              <input type="time" value={shiftTimes.eveningShift?.start || '15:00'} onChange={(e) => handleChange('eveningShift', 'start', e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>퇴근 시각</label>
              <input type="time" value={shiftTimes.eveningShift?.end || '23:00'} onChange={(e) => handleChange('eveningShift', 'end', e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
            </div>
          </div>
        </div>
      )}

      {/* 나이트(Night) - 모든 교대 유형에 기본 포함 */}
      <div style={{ marginBottom: '16px', padding: '16px', border: '1px solid #E5E7EB', borderRadius: '12px', backgroundColor: '#F9FAFB' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '12px', color: '#111' }}>🌙 나이트</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>출근 시각</label>
            <input type="time" value={shiftTimes.nightShift?.start || '23:00'} onChange={(e) => handleChange('nightShift', 'start', e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>퇴근 시각</label>
            <input type="time" value={shiftTimes.nightShift?.end || '07:00'} onChange={(e) => handleChange('nightShift', 'end', e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D1D5DB' }} />
          </div>
        </div>
      </div>

      {/* 오프(OFF) 휴무 안내 */}
      <div style={{ marginBottom: '24px', padding: '16px', border: '1px solid #E5E7EB', borderRadius: '12px', backgroundColor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80px' }}>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#111', marginBottom: '4px' }}>🏠 OFF 휴무</h3>
          <p style={{ fontSize: '13px', color: '#6B7280' }}>휴무일은 출퇴근 시간이 없습니다.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button onClick={onPrev} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB', backgroundColor: '#FFF', cursor: 'pointer', fontWeight: 'bold' }}>이전</button>
        <button onClick={onNext} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#6366F1', color: '#FFF', cursor: 'pointer', fontWeight: 'bold' }}>다음</button>
      </div>
    </div>
  );
}

export default Step2TimeSetting;