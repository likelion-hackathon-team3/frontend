import React from 'react';

function Step1ShiftType({ formData, updateFormData, onNext }) {
  // 화면에 그릴 카드 데이터 목록
  const shiftTypes = [
    { 
      id: '2교대', 
      title: '2교대', 
      desc: '2가지 근무 유형이 반복되는 패턴', 
      icon: '☀️🌙' 
    },
    { 
      id: '3교대', 
      title: '3교대', 
      desc: '3가지 근무 유형이 반복되는 패턴', 
      icon: '☀️🌥️🌙' 
    },
    { 
      id: '야간교대', 
      title: '야간 교대', 
      desc: '야간 근무가 포함된 교대 패턴', 
      icon: '🌙' 
    },
    { 
      id: '불규칙', 
      title: '불규칙 교대', 
      desc: '정해진 패턴 없이 근무 유형이 변경', 
      icon: '📅' 
    }
  ];

  // 카드 클릭 시 실행되는 함수
  const handleSelect = (typeId) => {
    updateFormData('shiftType', typeId);
    onNext(); 
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
        교대 유형을 선택해주세요.
      </h2>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
        정확한 분석을 위해 필요해요.
      </p>

      {/* 카드 그리드 영역 */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '16px' 
      }}>
        {shiftTypes.map((type) => (
          <div 
            key={type.id} 
            onClick={() => handleSelect(type.id)}
            style={{
              border: formData.shiftType === type.id ? '2px solid #6366F1' : '1px solid #E5E7EB',
              borderRadius: '12px',
              padding: '20px',
              cursor: 'pointer',
              backgroundColor: formData.shiftType === type.id ? '#EEF2FF' : '#FFFFFF',
              transition: 'all 0.2s ease-in-out',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '12px' }}>{type.icon}</div>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', color: '#111' }}>
              {type.title}
            </h3>
            <p style={{ fontSize: '12px', color: '#666', lineHeight: '1.4' }}>
              {type.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Step1ShiftType;