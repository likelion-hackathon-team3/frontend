import React from 'react';

function Step3TimeSetting({ shiftTimes, commuteTime, updateFormData, onSubmit }) {
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

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>시간 및 통근 설정 (최초 1회)</h2>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>개인 맞춤 분석을 위해 최초 1회만 설정받습니다.</p>

      {/* 데이(Day) */}
      <div style={{ marginBottom: '16px', padding: '20px', border: '1px solid #E5E7EB', borderRadius: '12px', backgroundColor: '#F9FAFB' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '12px', color: '#111' }}>☀️ 데이</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '6px' }}>출근 시각</label>
            <input type="time" value={shiftTimes.dayShift?.start || '07:00'} onChange={(e) => handleChange('dayShift', 'start', e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', backgroundColor: '#FFF', boxSizing: 'border-box' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '6px' }}>퇴근 시각</label>
            <input type="time" value={shiftTimes.dayShift?.end || '15:00'} onChange={(e) => handleChange('dayShift', 'end', e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', backgroundColor: '#FFF', boxSizing: 'border-box' }} />
          </div>
        </div>
      </div>

      {/* 이브닝(Evening) */}
      <div style={{ marginBottom: '16px', padding: '20px', border: '1px solid #E5E7EB', borderRadius: '12px', backgroundColor: '#F9FAFB' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '12px', color: '#111' }}>🌥️ 이브닝</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '6px' }}>출근 시각</label>
            <input type="time" value={shiftTimes.eveningShift?.start || '15:00'} onChange={(e) => handleChange('eveningShift', 'start', e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', backgroundColor: '#FFF', boxSizing: 'border-box' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '6px' }}>퇴근 시각</label>
            <input type="time" value={shiftTimes.eveningShift?.end || '23:00'} onChange={(e) => handleChange('eveningShift', 'end', e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', backgroundColor: '#FFF', boxSizing: 'border-box' }} />
          </div>
        </div>
      </div>

      {/* 나이트(Night) */}
      <div style={{ marginBottom: '16px', padding: '20px', border: '1px solid #E5E7EB', borderRadius: '12px', backgroundColor: '#F9FAFB' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '12px', color: '#111' }}>🌙 나이트</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '6px' }}>출근 시각</label>
            <input type="time" value={shiftTimes.nightShift?.start || '23:00'} onChange={(e) => handleChange('nightShift', 'start', e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', backgroundColor: '#FFF', boxSizing: 'border-box' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '6px' }}>퇴근 시각</label>
            <input type="time" value={shiftTimes.nightShift?.end || '07:00'} onChange={(e) => handleChange('nightShift', 'end', e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', backgroundColor: '#FFF', boxSizing: 'border-box' }} />
          </div>
        </div>
      </div>

      {/* 통근시간 */}
      <div style={{ marginBottom: '24px', padding: '20px', border: '1px solid #E5E7EB', borderRadius: '12px', backgroundColor: '#F9FAFB' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '12px', color: '#111' }}>🚌 평균 편도 통근 시간</h3>
        <div>
          <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '6px' }}>통근 시간 (분 단위)</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input 
              type="number" 
              placeholder="예: 60" 
              value={commuteTime} 
              onChange={(e) => updateFormData('commuteTime', e.target.value)} 
              style={{ flex: 1, padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', backgroundColor: '#FFF', boxSizing: 'border-box' }} 
            />
            <span style={{ fontSize: '14px', color: '#111', fontWeight: 'bold' }}>분</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button onClick={onSubmit} style={{ flex: 1, padding: '14px', borderRadius: '8px', border: 'none', backgroundColor: '#6366F1', color: '#FFF', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>시간 저장하고 시작하기</button>
      </div>
    </div>
  );
}

export default Step3TimeSetting;