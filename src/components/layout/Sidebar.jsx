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
  AlertTriangle,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { useModelHealth } from '../../hooks/useModelHealth';

export const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const { status, latency, isChecking, checkHealth } = useModelHealth(true);

  const navItems = [
    { to: '/', label: 'Overview', icon: LayoutDashboard },
    { to: '/studio', label: 'Detection Studio', icon: ScanEye },
    { to: '/history', label: 'Detection History', icon: History },
    { to: '/equipment', label: 'Equipment Classes', icon: ShieldAlert },
    { to: '/model-info', label: 'Model Information', icon: Cpu },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-40 bg-[#0d1424] border-r border-slate-800 flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      } hidden md:flex`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center px-4 border-b border-slate-800 justify-between bg-[#10192e]">
        <NavLink to="/" className="flex items-center gap-3 overflow-hidden group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform">
            <Flame className="w-6 h-6 fill-white/20" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-base text-slate-100 tracking-tight flex items-center gap-1.5">
                FireGuard <span className="text-orange-500 font-extrabold text-xs px-1.5 py-0.5 rounded bg-orange-500/10 border border-orange-500/20">AI</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
                Safety Vision Platform
              </span>
            </div>
          )}
        </NavLink>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 group relative ${
                  isActive
                    ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`
              }
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" />
              {!isCollapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </div>

      {/* Model Status Card & Footer */}
      <div className="p-3 border-t border-slate-800 bg-[#090d17]">
        {!isCollapsed ? (
          <div className="rounded-xl p-3 bg-[#111827] border border-slate-800/80 mb-3 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-orange-400" />
                Backend Status
              </span>
              <button
                onClick={checkHealth}
                disabled={isChecking}
                className="text-slate-500 hover:text-slate-300 transition-colors p-0.5 rounded cursor-pointer"
                title="Refresh connection test"
              >
                <RefreshCw className={`w-3 h-3 ${isChecking ? 'animate-spin text-orange-400' : ''}`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    status === 'online'
                      ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50 animate-pulse'
                      : status === 'checking'
                      ? 'bg-amber-500 animate-bounce'
                      : 'bg-red-500'
                  }`}
                />
                <span className="text-xs font-semibold text-slate-200">
                  {status === 'online' ? 'Model Ready' : status === 'checking' ? 'Testing...' : 'Space Standby'}
                </span>
              </div>
              {latency !== null && (
                <span className="text-[10px] text-slate-400 font-mono bg-slate-800 px-1.5 py-0.5 rounded">
                  {latency}ms
                </span>
              )}
            </div>

            <p className="text-[10px] text-slate-400 truncate">
              aman9832/object-detection
            </p>
          </div>
        ) : (
          <div className="flex justify-center mb-3">
            <div
              className={`w-3 h-3 rounded-full ${
                status === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'
              }`}
              title={`Hugging Face Space: ${status === 'online' ? 'Online' : 'Offline'}`}
            />
          </div>
        )}

        {/* Version info */}
        <div className={`flex items-center justify-between text-[11px] text-slate-400 ${isCollapsed ? 'justify-center' : 'px-1'}`}>
          {!isCollapsed && <span>FireGuard Core</span>}
          <span className="font-mono text-slate-400">v1.2.0</span>
        </div>
      </div>
    </aside>
  );
};
