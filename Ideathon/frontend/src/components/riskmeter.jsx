import React from 'react';

const RiskMeter = ({ riskLevel }) => {
  const riskColors = {
    low: { label: 'Low', color: '#34a853' },
    medium: { label: 'Medium', color: '#fbbc05' },
    high: { label: 'High', color: '#ea4335' },
  };

  const level = riskLevel ? riskLevel.toLowerCase() : 'low';
  const { label, color } = riskColors[level] || riskColors.low;

  return (
    <div className="risk-meter">
      <h3>Risk Level: <span style={{ color }}>{label}</span></h3>
      <div className="risk-bar" style={{ backgroundColor: color, width: level === 'low' ? '30%' : level === 'medium' ? '60%' : '100%' }} />
    </div>
  );
};

export default RiskMeter;
