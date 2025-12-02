import React from 'react';

interface SummaryCardProps {
  title: string;
  value: string;
  subValue: string;
  icon: React.ReactNode;
  gradient: string;
  iconBg: string;
  borderColor: string;
  textColor: string;
  tagColor: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ 
  title, value, subValue, icon, gradient, iconBg, borderColor, textColor, tagColor 
}) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 border ${borderColor} ${gradient} backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-900/20 group`}>
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        {icon}
      </div>
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className={`w-14 h-14 ${iconBg} rounded-xl flex items-center justify-center shadow-lg`}>
          {icon}
        </div>
        <span className={`${textColor} text-xs font-medium ${tagColor} px-3 py-1 rounded-full uppercase tracking-wider`}>
          {subValue}
        </span>
      </div>
      <h3 className="text-4xl font-bold text-white mb-1 tracking-tight">{value}</h3>
      <p className={`${textColor} font-medium opacity-90`}>{title}</p>
    </div>
  );
};

export default SummaryCard;