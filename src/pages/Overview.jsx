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
  Share2,
  Code2,
  Activity,
  Plus
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
  
  // Calculate average latency from actual records
  const recordsWithLatency = records.filter(r => r.processingTimeMs);
  const avgLatency = recordsWithLatency.length > 0
    ? Math.round(recordsWithLatency.reduce((acc, r) => acc + r.processingTimeMs, 0) / recordsWithLatency.length)
    : null;

  return (
    <div className="space-y-6">
      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#172033] via-[#111827] to-[#0B1120] border border-slate-800/80 shadow-2xl overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold">
              <Flame className="w-3.5 h-3.5" />
              <span>Intelligent Fire Safety Visual Inspection Platform</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              Fire Safety Vision Operations
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Automated computer vision platform powered by Ultralytics YOLO models. Upload site photographs to detect and verify essential fire safety apparatus, PPE, and workplace hazard mitigation gear across 7 industrial classes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              size="lg"
              icon={ScanEye}
              onClick={() => navigate('/studio')}
              className="shadow-xl shadow-orange-500/25"
            >
              Start New Inspection
            </Button>

            <Button
              variant="secondary"
              size="lg"
              icon={History}
              onClick={() => navigate('/history')}
            >
              Audit History
            </Button>
          </div>
        </div>
      </div>

      {/* Verified Model Status Banner */}
      <ModelStatusBanner />

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Images Processed"
          value={totalProcessed}
          subtitle={totalProcessed > 0 ? `${completedInspections} successfully completed` : 'No inspections run yet'}
          icon={Layers}
          color="orange"
        />

        <StatCard
          title="Monitored Classes"
          value="7 Classes"
          subtitle="Fire Protection, PPE, Equipment"
          icon={ShieldAlert}
          color="green"
        />

        <StatCard
          title="Average Inference Speed"
          value={avgLatency ? `${avgLatency} ms` : latency ? `${latency} ms` : 'Sub-second'}
          subtitle={avgLatency ? 'Calculated from local audit history' : 'Verified space response speed'}
          icon={Clock}
          color="blue"
        />

        <StatCard
          title="Model Health Status"
          value={status === 'online' ? '100% Ready' : 'Standby'}
          subtitle="Hugging Face Spaces (CPU-Basic)"
          icon={Activity}
          color="purple"
        />
      </div>

      {/* Main Analytics & Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Safety Equipment Distribution (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <DetectionChart records={records} />

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div
              onClick={() => navigate('/studio')}
              className="p-4 rounded-xl bg-[#172033] border border-slate-800 hover:border-orange-500/40 transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <ScanEye className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-200 group-hover:text-orange-400 transition-colors">
                Detection Studio
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Upload image or select sample
              </p>
            </div>

            <div
              onClick={() => navigate('/equipment')}
              className="p-4 rounded-xl bg-[#172033] border border-slate-800 hover:border-emerald-500/40 transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">
                Equipment Catalog
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Inspect 7 verified standards
              </p>
            </div>

            <div
              onClick={() => outletContext?.openEmbedModal && outletContext.openEmbedModal()}
              className="p-4 rounded-xl bg-[#172033] border border-slate-800 hover:border-blue-500/40 transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Code2 className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-200 group-hover:text-blue-400 transition-colors">
                Embed & Share
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Get public URL or iframe code
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
