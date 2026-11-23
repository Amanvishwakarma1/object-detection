import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ScanEye,
  History,
  ShieldAlert,
  Cpu,
  Settings,
  ChevronLeft,
  ChevronRight,
  Flame,
  Activity,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { useModelHealth } from '../../hooks/useModelHealth';

export const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const { status, latency, isChecking, checkHealth } = useModelHealth(true);

  const navItems = [
    { to: '/', label: 'Overview', icon: LayoutDashboard },
    { to: '/studio', label: 'Detection Studio', icon: ScanEye },
    { to: '/history', label: 'Inspection Archive', icon: History },
    { to: '/equipment', label: 'Equipment Catalog', icon: ShieldAlert },
    { to: '/model-info', label: 'Model Specs', icon: Cpu },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-40 bg-[#0A0E18] border-r border-slate-800/80 flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      } hidden md:flex`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center px-4 border-b border-slate-800/80 justify-between bg-[#0D121E]">
        <NavLink to="/" className="flex items-center gap-2.5 overflow-hidden group">
          <div className="w-8 h-8 rounded-lg bg-[#EA580C] text-white flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(234,88,12,0.4),inset_0_1px_0_rgba(255,255,255,0.25)] border border-orange-400/30">
            <Flame className="w-4.5 h-4.5 fill-white/20" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-slate-100 tracking-tight flex items-center gap-1.5">
                FireGuard <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-orange-400 bg-orange-500/10 px-1.5 py-0.2 rounded border border-orange-500/20">AI</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-tight">
                Enterprise Vision
              </span>
            </div>
          )}
        </NavLink>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-md text-slate-400 hover:text-slate-200 hover:bg-[#141C2E] transition-colors cursor-pointer"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-2.5 space-y-1 overflow-y-auto">
        <div className="px-2 mb-2">
          {!isCollapsed && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Operations
            </span>
          )}
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-xs transition-all duration-150 group relative ${
                  isActive
                    ? 'bg-[#141C2E] text-slate-100 border border-slate-700/80 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#111726] border border-transparent'
                }`
              }
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-105" />
              {!isCollapsed && <span className="truncate">{item.label}</span>}
              {/* Subtle active pip indicator */}
              {!isCollapsed && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-500 opacity-0 group-[.active]:opacity-100 transition-opacity" />
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Model Status Card & Footer */}
      <div className="p-3 border-t border-slate-800/80 bg-[#070A12]">
        {!isCollapsed ? (
          <div className="rounded-lg p-2.5 bg-[#0E1422] border border-slate-800 mb-2.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium text-[11px] flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-orange-400" />
                Backend Node
              </span>
              <button
                onClick={checkHealth}
                disabled={isChecking}
                className="text-slate-400 hover:text-slate-200 transition-colors p-0.5 rounded cursor-pointer"
                title="Ping inference node"
              >
                <RefreshCw className={`w-3 h-3 ${isChecking ? 'animate-spin text-orange-400' : ''}`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    status === 'online'
                      ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                      : status === 'checking'
                      ? 'bg-amber-500 animate-pulse'
                      : 'bg-red-500'
                  }`}
                />
                <span className="text-[11px] font-semibold text-slate-200">
                  {status === 'online' ? 'System Online' : status === 'checking' ? 'Connecting...' : 'Standby'}
                </span>
              </div>
              {latency !== null && (
                <span className="text-[10px] text-slate-400 font-mono bg-slate-900/90 px-1.5 py-0.5 rounded border border-slate-800">
                  {latency}ms
                </span>
              )}
            </div>

            <p className="text-[10px] text-slate-400 font-mono truncate">
              aman9832/object-detection
            </p>
          </div>
        ) : (
          <div className="flex justify-center mb-2">
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                status === 'online' ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]' : 'bg-red-500'
              }`}
              title={`Hugging Face Space: ${status === 'online' ? 'Online' : 'Offline'}`}
            />
          </div>
        )}

        <div className={`flex items-center justify-between text-[10px] text-slate-400 ${isCollapsed ? 'justify-center' : 'px-1'}`}>
          {!isCollapsed && <span>FireGuard Platform</span>}
          <span className="font-mono text-slate-400">v1.2.0</span>
        </div>
      </div>
    </aside>
  );
};
