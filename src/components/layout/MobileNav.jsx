import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ScanEye,
  History,
  ShieldAlert,
  Cpu,
  Settings,
  X,
  Flame,
  Activity,
  Code2
} from 'lucide-react';
import { useModelHealth } from '../../hooks/useModelHealth';

export const MobileNav = ({ isOpen, onClose, onOpenEmbedModal }) => {
  const { status, latency } = useModelHealth(false);

  const navItems = [
    { to: '/', label: 'Overview', icon: LayoutDashboard },
    { to: '/studio', label: 'Detection Studio', icon: ScanEye },
    { to: '/history', label: 'Detection History', icon: History },
    { to: '/equipment', label: 'Equipment Classes', icon: ShieldAlert },
    { to: '/model-info', label: 'Model Information', icon: Cpu },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <div className="relative w-72 max-w-[80vw] bg-[#0d1424] border-r border-slate-800 flex flex-col z-10">
            {/* Drawer Header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 bg-[#10192e]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white">
                  <Flame className="w-5 h-5 fill-white/20" />
                </div>
                <span className="font-bold text-sm text-slate-100">FireGuard AI</span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                        isActive
                          ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      }`
                    }
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}

              <button
                onClick={() => {
                  onClose();
                  onOpenEmbedModal();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 cursor-pointer"
              >
                <Code2 className="w-5 h-5 shrink-0" />
                <span>Share & Embed Widget</span>
              </button>
            </div>

            {/* Status Footer */}
            <div className="p-4 border-t border-slate-800 bg-[#090d17] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Backend Space</span>
                <span className="text-slate-300 font-mono text-[11px] truncate max-w-[120px]">
                  aman9832
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    status === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'
                  }`}
                />
                <span className="text-xs text-slate-300 font-medium">
                  {status === 'online' ? 'Online' : 'Ready'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0d1424]/95 backdrop-blur-md border-t border-slate-800 px-2 py-1.5 flex items-center justify-around">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 p-1.5 rounded-lg text-[10px] font-medium ${
              isActive ? 'text-orange-400' : 'text-slate-400'
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Overview</span>
        </NavLink>

        <NavLink
          to="/studio"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 p-1.5 rounded-lg text-[10px] font-medium ${
              isActive ? 'text-orange-400 font-bold' : 'text-slate-400'
            }`
          }
        >
          <div className="w-8 h-8 -mt-3 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/30">
            <ScanEye className="w-4 h-4" />
          </div>
          <span className="mt-0.5">Studio</span>
        </NavLink>

        <NavLink
          to="/history"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 p-1.5 rounded-lg text-[10px] font-medium ${
              isActive ? 'text-orange-400' : 'text-slate-400'
            }`
          }
        >
          <History className="w-5 h-5" />
          <span>History</span>
        </NavLink>

        <NavLink
          to="/equipment"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 p-1.5 rounded-lg text-[10px] font-medium ${
              isActive ? 'text-orange-400' : 'text-slate-400'
            }`
          }
        >
          <ShieldAlert className="w-5 h-5" />
          <span>Classes</span>
        </NavLink>
      </nav>
    </>
  );
};
