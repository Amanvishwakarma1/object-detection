import React from 'react';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'orange',
  className = ''
}) => {
  const iconBgs = {
    orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  };

  return (
    <div className={`p-5 rounded-2xl bg-[#172033] border border-slate-800/80 shadow-lg hover:border-slate-700 transition-all ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${iconBgs[color] || iconBgs.orange}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono tracking-tight">
          {value}
        </span>
        {trend && (
          <span className="text-xs font-medium text-emerald-400 font-sans">
            {trend}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="text-xs text-slate-400 mt-1 truncate">
          {subtitle}
        </p>
      )}
    </div>
  );
};
