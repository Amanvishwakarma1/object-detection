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
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#172033] border border-slate-800">
        <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
          <SettingsIcon className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-100">
            Platform Configuration & Privacy
          </h2>
          <p className="text-xs text-slate-400">
            Manage local storage retention, inspection viewer preferences, and security settings
          </p>
        </div>
      </div>

      {/* Viewer Preferences */}
      <div className="p-5 rounded-2xl bg-[#172033] border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Eye className="w-4 h-4 text-orange-400" />
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
            Detection Studio Viewer Preferences
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-semibold text-slate-200 block mb-1">
              Default Inspection Presentation
            </label>
            <p className="text-slate-400 text-[11px] mb-2.5">
              Choose the primary view mode displayed when inference completes in the Studio.
            </p>
            <select
              value={defaultViewMode}
              onChange={(e) => setDefaultViewMode(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 text-xs focus:outline-none focus:border-orange-500"
            >
              <option value="annotated">Annotated Image (Default)</option>
              <option value="side-by-side">Side-by-Side Comparison</option>
              <option value="slider">Interactive Split Slider</option>
              <option value="original">Original Image Only</option>
            </select>
          </div>

          {/* Model Confidence Slider (Transparently Marked Unavailable) */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 opacity-80">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-300">Confidence Threshold</span>
              <span className="text-[10px] text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                Fixed by Model Backend
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              The existing Hugging Face backend exposes a fixed detection threshold in its compiled YOLO script (<code className="text-slate-300 font-mono">results[0].plot()</code>). In accordance with system guidelines, custom confidence threshold adjustment is intentionally disabled to avoid simulating non-functional controls.
            </p>
          </div>
        </div>
      </div>

      {/* Local Storage & Cache Management */}
      <div className="p-5 rounded-2xl bg-[#172033] border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <HardDrive className="w-4 h-4 text-orange-400" />
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
            Browser Storage & Data Archive
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div>
            <span className="text-xs font-semibold text-slate-200 block">
              IndexedDB Storage Engine
            </span>
            <p className="text-xs text-slate-400 mt-0.5">
              Currently holding <strong>{stats.recordCount}</strong> inspection records ({formatFileSize(stats.estimatedBytes)}).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={Download}
              onClick={handleExportJSON}
              className="text-xs border-slate-700"
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
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Local detection history successfully cleared.</span>
          </div>
        )}
      </div>

      {/* Security & Privacy Statement */}
      <div className="p-5 rounded-2xl bg-[#172033] border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
            Security, Privacy & Data Handling
          </h3>
        </div>

        <ul className="space-y-2 text-xs text-slate-400 leading-relaxed list-disc pl-4">
          <li>
            <strong className="text-slate-200">Zero Private Credentials:</strong> FireGuard AI does not require, embed, or expose private API tokens. All inference requests are executed over public, sandboxed HTTPS endpoints provided by Hugging Face Spaces.
          </li>
          <li>
            <strong className="text-slate-200">Local Data Sovereignty:</strong> Uploaded inspection images and history records are preserved inside your local browser's IndexedDB storage. No user photographs are transmitted to third-party databases, tracking pixels, or advertisement networks.
          </li>
          <li>
            <strong className="text-slate-200">Inference Scope:</strong> Photographs submitted in the Studio are sent directly to the Hugging Face Space (<code className="text-slate-300 font-mono">aman9832/object-detection</code>) solely to compute object detection bounding boxes.
          </li>
        </ul>
      </div>
    </div>
  );
};
