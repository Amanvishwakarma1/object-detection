import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon = null,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#080C14] disabled:opacity-40 disabled:cursor-not-allowed select-none rounded-lg cursor-pointer';

  const variants = {
    primary: 'bg-gradient-to-b from-[#F97316] to-[#EA580C] hover:from-[#FB923C] hover:to-[#EA580C] text-white shadow-[0_1px_2px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] border border-orange-500/40 active:scale-[0.98] focus:ring-orange-500 font-semibold',
    secondary: 'bg-[#141C2E] hover:bg-[#1A243B] text-slate-200 border border-slate-700/80 shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] active:scale-[0.98] focus:ring-slate-500',
    outline: 'border border-slate-700/90 hover:border-slate-600 text-slate-300 hover:text-white hover:bg-[#141C2E]/60 focus:ring-slate-500 active:scale-[0.98]',
    danger: 'bg-gradient-to-b from-red-500 to-red-600 hover:from-red-400 hover:to-red-600 text-white shadow-[0_1px_2px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.15)] border border-red-500/40 active:scale-[0.98] focus:ring-red-500',
    ghost: 'text-slate-400 hover:text-slate-200 hover:bg-[#141C2E] focus:ring-slate-500',
    success: 'bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-600 text-white shadow-[0_1px_2px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] border border-emerald-500/40 active:scale-[0.98] focus:ring-emerald-500',
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5 tracking-tight',
    md: 'text-xs sm:text-sm px-3.5 py-2 gap-2 tracking-tight',
    lg: 'text-sm px-4.5 py-2.5 gap-2.5 tracking-tight'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
      ) : Icon && iconPosition === 'left' ? (
        <Icon className="w-3.5 h-3.5 shrink-0" />
      ) : null}
      <span>{children}</span>
      {!isLoading && Icon && iconPosition === 'right' && (
        <Icon className="w-3.5 h-3.5 shrink-0" />
      )}
    </button>
  );
};
