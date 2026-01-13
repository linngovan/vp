import React from 'react';

interface StatCardProps {
  icon: string;
  value: string | number;
  label: string;
  subLabel: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, subLabel }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border-gradient-top flex items-center gap-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-lg transition-shadow duration-300">
      <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center flex-shrink-0 text-brand-purple">
        <i className={`fas ${icon} text-2xl`}></i>
      </div>
      <div>
        <div className="text-4xl font-bold text-brand-purple mb-1 leading-none">{value}</div>
        <div className="text-sm font-bold text-gray-700 uppercase tracking-wide">{label}</div>
        <div className="text-sm text-gray-400 mt-0.5">{subLabel}</div>
      </div>
    </div>
  );
};

export default StatCard;