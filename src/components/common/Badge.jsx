import React from 'react';

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className = ''
}) => {
  const variants = {
    default: 'bg-[#141C2E] text-slate-300 border-slate-700/80',
    orange: 'bg-orange-500/10 text-orange-400 border-orange-500/25',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
    danger: 'bg-red-500/10 text-red-400 border-red-500/25',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/25',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/25'
  };

  const dotColors = {
    default: 'bg-slate-400',
    orange: 'bg-orange-400',
    success: 'bg-emerald-400',
    warning: 'bg-amber-400',
    danger: 'bg-red-400',
    blue: 'bg-blue-400',
    purple: 'bg-purple-400'
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 gap-1 tracking-tight',
    md: 'text-[11px] px-2.5 py-0.5 gap-1.5 tracking-tight',
    lg: 'text-xs px-3 py-1 gap-1.5'
  };

  return (
    <span className={`inline-flex items-center font-medium rounded-full border shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] ${variants[variant] || variants.default} ${sizes[size] || sizes.md} ${className}`}>
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[variant] || dotColors.default}`} />
      )}
      <span>{children}</span>
    </span>
  );
};
