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
  return (
    <div className={`p-4.5 rounded-xl enterprise-card enterprise-card-hover flex flex-col justify-between ${className}`}>
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div className="w-7 h-7 rounded-md bg-[#162033] border border-slate-700/60 flex items-center justify-center text-slate-300">
            <Icon className="w-3.5 h-3.5" />
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-slate-100 font-mono tracking-tight">
            {value}
          </span>
          {trend && (
            <span className="text-[11px] font-medium text-emerald-400 font-sans">
              {trend}
            </span>
          )}
        </div>

        {subtitle && (
          <p className="text-[11px] text-slate-400 truncate">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
