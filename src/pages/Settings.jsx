import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  HardDrive,
  Sliders,
  ShieldCheck,
  Trash2,
  Download,
  AlertTriangle,
  Info,
  CheckCircle2,
  Lock,
  Eye,
  Server
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { useHistory } from '../hooks/useHistory';
import { formatFileSize } from '../utils/formatUtils';

export const Settings = () => {
  const { stats, handleClearAll, handleExportJSON } = useHistory();
  const [defaultViewMode, setDefaultViewMode] = useState('annotated');
  const [clearedNotice, setClearedNotice] = useState(false);

  const confirmClear = async () => {
    if (window.confirm('Clear all local detection history records from this browser?')) {
      await handleClearAll();
      setClearedNotice(true);
      setTimeout(() => setClearedNotice(false), 3000);
    }
  };

  return (
    <div className="space-y-4 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3 p-3.5 rounded-xl enterprise-card">
        <div className="w-8 h-8 rounded-lg bg-[#162033] border border-slate-700/80 text-orange-400 flex items-center justify-center shrink-0">
          <SettingsIcon className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-100">
            System Settings & Data Retention
          </h2>
          <p className="text-[11px] text-slate-400">
            Manage local storage retention, inspection viewer preferences, and security settings
          </p>
        </div>
      </div>

      {/* Viewer Preferences */}
      <div className="p-4 rounded-xl enterprise-card space-y-3.5">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2.5">
          <Eye className="w-4 h-4 text-orange-400" />
          <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
            Studio Viewport Preferences
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="font-semibold text-slate-200 block mb-1 text-[11px]">
              Default Presentation Mode
            </label>
            <p className="text-slate-400 text-[10px] mb-2">
              Primary viewport presentation displayed upon inference completion.
            </p>
            <select
              value={defaultViewMode}
              onChange={(e) => setDefaultViewMode(e.target.value)}
              className="w-full bg-[#0A0F1B] border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-orange-500 font-mono"
            >
              <option value="annotated">Annotated Output (Default)</option>
              <option value="side-by-side">Side-by-Side Dual View</option>
              <option value="slider">Interactive Split Slider</option>
              <option value="original">Original Image Only</option>
            </select>
          </div>

          <div className="p-3 rounded-lg bg-[#0E1422] border border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-300 text-[11px]">Confidence Parameter</span>
              <span className="text-[9px] text-slate-400 font-mono bg-slate-900 px-1.5 py-0.2 rounded border border-slate-800">
                Fixed by Model
              </span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              The remote YOLO model script sets detection thresholds during graph compilation. Manual threshold adjustment is disabled to prevent simulated controls.
            </p>
          </div>
        </div>
      </div>

      {/* Local Storage & Cache Management */}
      <div className="p-4 rounded-xl enterprise-card space-y-3.5">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2.5">
          <HardDrive className="w-4 h-4 text-orange-400" />
          <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
            Browser Storage & Data Archive
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-lg bg-[#0E1422] border border-slate-800">
          <div>
            <span className="text-xs font-semibold text-slate-200 block font-mono">
              IndexedDB Storage Engine
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Holding <strong>{stats.recordCount}</strong> inspection records ({formatFileSize(stats.estimatedBytes)}).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              icon={Download}
              onClick={handleExportJSON}
              className="text-xs"
            >
              Export JSON
            </Button>

            <Button
              variant="danger"
              size="sm"
              icon={Trash2}
              onClick={confirmClear}
              className="text-xs"
            >
              Clear Records
            </Button>
          </div>
        </div>

        {clearedNotice && (
          <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Local detection history successfully cleared.</span>
          </div>
        )}
      </div>

      {/* Security & Privacy Statement */}
      <div className="p-4 rounded-xl enterprise-card space-y-2.5">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
            Security & Data Protection
          </h3>
        </div>

        <ul className="space-y-1.5 text-[11px] text-slate-400 leading-relaxed list-disc pl-4">
          <li>
            <strong className="text-slate-200">No Private API Keys:</strong> All inference requests route publicly to the Hugging Face Space endpoint.
          </li>
          <li>
            <strong className="text-slate-200">Client-Side Sovereignty:</strong> Staged inspection imagery and history records are preserved inside your local browser's IndexedDB.
          </li>
          <li>
            <strong className="text-slate-200">Inference Scope:</strong> Imagery is processed solely by the remote YOLO model for object detection.
          </li>
        </ul>
      </div>
    </div>
  );
};
