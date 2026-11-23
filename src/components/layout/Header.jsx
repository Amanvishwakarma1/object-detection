import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  ScanEye,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Code2,
  Terminal,
  Activity
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { useModelHealth } from '../../hooks/useModelHealth';

const PAGE_METADATA = {
  '/': { title: 'Operations Overview', category: 'Monitoring' },
  '/studio': { title: 'Detection Studio', category: 'Computer Vision' },
  '/history': { title: 'Inspection Archive', category: 'Audit Trail' },
  '/equipment': { title: 'Equipment Catalog', category: 'Standards & Compliance' },
  '/model-info': { title: 'Model Architecture', category: 'Infrastructure' },
  '/settings': { title: 'System Settings', category: 'Configuration' },
  '/embed': { title: 'Embedded Widget', category: 'Integration' },
};

export const Header = ({ onOpenMobileNav, onOpenEmbedModal }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { status, latency } = useModelHealth(false);

  const currentPage = PAGE_METADATA[location.pathname] || {
    title: 'FireGuard AI',
    category: 'Console'
  };

  return (
    <header className="h-14 border-b border-slate-800/80 bg-[#0A0E18]/85 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between">
      {/* Mobile Drawer Trigger & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileNav}
          className="p-1.5 -ml-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-[#141C2E] md:hidden cursor-pointer"
          aria-label="Open mobile navigation"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-mono hidden sm:inline">
            {currentPage.category}
          </span>
          <span className="text-slate-400 hidden sm:inline">/</span>
          <span className="font-semibold text-slate-100 text-sm tracking-tight">
            {currentPage.title}
          </span>
        </div>
      </div>

      {/* Right Actions & Status Badges */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Real-time Model Status */}
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0E1422] border border-slate-800 text-xs">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              status === 'online' ? 'bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.6)]' : 'bg-red-400'
            }`}
          />
          <span className="text-slate-300 font-medium text-[11px]">
            {status === 'online' ? 'YOLO Node Ready' : 'Node Offline'}
          </span>
          {latency && (
            <span className="text-[10px] text-slate-400 font-mono border-l border-slate-800 pl-2">
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
          className="hidden sm:inline-flex text-xs bg-[#0E1422]"
        >
          Embed Widget
        </Button>

        {/* Studio Shortcut button */}
        {location.pathname !== '/studio' && (
          <Button
            variant="primary"
            size="sm"
            icon={ScanEye}
            onClick={() => navigate('/studio')}
            className="text-xs"
          >
            New Inspection
          </Button>
        )}

        {/* Org identifier */}
        <div className="w-7 h-7 rounded-md bg-[#141C2E] border border-slate-700/80 flex items-center justify-center text-[11px] font-bold text-orange-400 shadow-sm font-mono">
          FG
        </div>
      </div>
    </header>
  );
};
