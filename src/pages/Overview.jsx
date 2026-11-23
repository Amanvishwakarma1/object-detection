import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
  ScanEye,
  History,
  ShieldAlert,
  Clock,
  Layers,
  ArrowRight,
  Flame,
  CheckCircle2,
  Code2,
  Activity,
  Server,
  FileCheck
} from 'lucide-react';
import { StatCard } from '../components/dashboard/StatCard';
import { DetectionChart } from '../components/dashboard/DetectionChart';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { ModelStatusBanner } from '../components/dashboard/ModelStatusBanner';
import { HistoryDetailModal } from '../components/history/HistoryDetailModal';
import { Button } from '../components/common/Button';
import { useHistory } from '../hooks/useHistory';
import { useModelHealth } from '../hooks/useModelHealth';

export const Overview = () => {
  const navigate = useNavigate();
  const outletContext = useOutletContext();
  const { records, handleDeleteRecord } = useHistory();
  const { status, latency } = useModelHealth(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const totalProcessed = records.length;
  const completedInspections = records.filter(r => r.status === 'completed').length;
  
  const recordsWithLatency = records.filter(r => r.processingTimeMs);
  const avgLatency = recordsWithLatency.length > 0
    ? Math.round(recordsWithLatency.reduce((acc, r) => acc + r.processingTimeMs, 0) / recordsWithLatency.length)
    : null;

  return (
    <div className="space-y-5">
      {/* Executive Operations Header */}
      <div className="p-5 sm:p-6 rounded-2xl enterprise-card flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative overflow-hidden">
        <div className="space-y-1.5 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#162033] border border-slate-700/80 text-slate-300 text-[11px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span>Industrial Equipment Computer Vision Console</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
            Fire Safety Visual Inspection System
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
            Automated visual verification of critical life-safety apparatus, suppression cylinders, emergency pull stations, and workplace safety equipment via Ultralytics YOLO models.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          <Button
            variant="primary"
            size="md"
            icon={ScanEye}
            onClick={() => navigate('/studio')}
          >
            Launch Inspection Studio
          </Button>

          <Button
            variant="secondary"
            size="md"
            icon={History}
            onClick={() => navigate('/history')}
          >
            Audit History
          </Button>
        </div>
      </div>

      {/* Model Status Infrastructure Banner */}
      <ModelStatusBanner />

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <StatCard
          title="Total Scans Logged"
          value={totalProcessed}
          subtitle={totalProcessed > 0 ? `${completedInspections} verified inspections` : 'Audit archive ready'}
          icon={Layers}
          color="orange"
        />

        <StatCard
          title="Monitored Equipment"
          value="3 Classes"
          subtitle="Extinguisher, Oxygen Tank, Toolbox"
          icon={ShieldAlert}
          color="green"
        />

        <StatCard
          title="Inference Latency"
          value={avgLatency ? `${avgLatency} ms` : latency ? `${latency} ms` : 'Online'}
          subtitle={avgLatency ? 'Calculated from local logs' : 'Verified space roundtrip'}
          icon={Clock}
          color="blue"
        />

        <StatCard
          title="Backend Infrastructure"
          value={status === 'online' ? '100% Ready' : 'Standby'}
          subtitle="Hugging Face Spaces (CPU-Basic)"
          icon={Activity}
          color="purple"
        />
      </div>

      {/* Analytics & Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Safety Equipment Distribution (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <DetectionChart records={records} />

          {/* Clean Operations Quick Navigation */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div
              onClick={() => navigate('/studio')}
              className="p-3.5 rounded-xl enterprise-card enterprise-card-hover cursor-pointer group"
            >
              <div className="w-7 h-7 rounded-md bg-[#162033] text-orange-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <ScanEye className="w-3.5 h-3.5" />
              </div>
              <h4 className="text-xs font-semibold text-slate-200 group-hover:text-orange-400 transition-colors">
                Detection Studio
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Stage and inspect site images
              </p>
            </div>

            <div
              onClick={() => navigate('/equipment')}
              className="p-3.5 rounded-xl enterprise-card enterprise-card-hover cursor-pointer group"
            >
              <div className="w-7 h-7 rounded-md bg-[#162033] text-emerald-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <ShieldAlert className="w-3.5 h-3.5" />
              </div>
              <h4 className="text-xs font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors">
                Equipment Catalog
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Review NFPA & OSHA standards
              </p>
            </div>

            <div
              onClick={() => outletContext?.openEmbedModal && outletContext.openEmbedModal()}
              className="p-3.5 rounded-xl enterprise-card enterprise-card-hover cursor-pointer group"
            >
              <div className="w-7 h-7 rounded-md bg-[#162033] text-blue-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <Code2 className="w-3.5 h-3.5" />
              </div>
              <h4 className="text-xs font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">
                Embed & Share
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Copy iframe snippet
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Activity (5 cols) */}
        <div className="lg:col-span-5">
          <RecentActivity
            records={records}
            onSelectRecord={(rec) => setSelectedRecord(rec)}
          />
        </div>
      </div>

      {/* Detail Modal */}
      <HistoryDetailModal
        record={selectedRecord}
        isOpen={Boolean(selectedRecord)}
        onClose={() => setSelectedRecord(null)}
        onDelete={handleDeleteRecord}
      />
    </div>
  );
};
