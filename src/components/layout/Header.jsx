import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  Share2,
  ScanEye,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Flame,
  Code2
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { useModelHealth } from '../../hooks/useModelHealth';

const PAGE_TITLES = {
  '/': { title: 'Industrial Safety Overview', subtitle: 'Real-time equipment monitoring & detection metrics' },
  '/studio': { title: 'AI Detection Studio', subtitle: 'Upload and inspect fire safety equipment with YOLO inference' },
  '/history': { title: 'Inspection Archive', subtitle: 'Device-local historical visual inspection records' },
  '/equipment': { title: 'Verified Equipment Classes', subtitle: 'Reference specifications for the 7 supported detection classes' },
  '/model-info': { title: 'Model Architecture & Specs', subtitle: 'Verified technical documentation for aman9832/object-detection' },
  '/settings': { title: 'Platform Settings', subtitle: 'Viewer preferences, local storage, and integration codes' },
  '/embed': { title: 'Embedded Inspection Widget', subtitle: 'Standalone responsive widget view' },
};

export const Header = ({ onOpenMobileNav, onOpenEmbedModal }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { status, latency } = useModelHealth(false);

  const currentPage = PAGE_TITLES[location.pathname] || {
    title: 'FireGuard AI',
    subtitle: 'Fire Safety Equipment Detection & Visual Inspection'
  };

  return (
    <header className="h-16 border-b border-slate-800 bg-[#0d1424]/90 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between">
      {/* Mobile Drawer Trigger & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileNav}
          className="p-2 -ml-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 md:hidden cursor-pointer"
          aria-label="Open mobile navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-sm sm:text-base font-bold text-slate-100 flex items-center gap-2">
            <span>{currentPage.title}</span>
          </h1>
          <p className="text-[11px] text-slate-400 hidden sm:block truncate max-w-md">
            {currentPage.subtitle}
          </p>
        </div>
      </div>

      {/* Right Actions & Status Badges */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Model Status Pill */}
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs">
          <span
            className={`w-2 h-2 rounded-full ${
              status === 'online' ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50' : 'bg-red-400'
            }`}
          />
          <span className="text-slate-300 font-medium text-[11px]">
            {status === 'online' ? 'HF Space Active' : 'HF Space Ready'}
          </span>
          {latency && (
            <span className="text-[10px] text-slate-400 font-mono">
              {latency}ms
            </span>
          )}
        </div>

        {/* Share & Embed button */}
        <Button
          variant="outline"
          size="sm"
          icon={Code2}
          onClick={onOpenEmbedModal}
          className="hidden sm:inline-flex text-xs border-slate-700/80 bg-slate-900/40 text-slate-300"
        >
          Embed / Share
        </Button>

        {/* Studio Shortcut button (if not already on Studio) */}
        {location.pathname !== '/studio' && (
          <Button
            variant="primary"
            size="sm"
            icon={ScanEye}
            onClick={() => navigate('/studio')}
            className="text-xs shadow-orange-500/20"
          >
            New Detection
          </Button>
        )}

        {/* User / Org Avatar Placeholder */}
        <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-orange-400 shadow-inner">
          FG
        </div>
      </div>
    </header>
  );
};
