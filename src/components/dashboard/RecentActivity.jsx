import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  CheckCircle2,
  FileImage,
  ArrowRight,
  ScanEye
} from 'lucide-react';
import { Button } from '../common/Button';
import { EmptyState } from '../common/EmptyState';
import { formatRelativeTime } from '../../utils/formatUtils';

export const RecentActivity = ({ records = [], onSelectRecord }) => {
  const navigate = useNavigate();

  if (!records || records.length === 0) {
    return (
      <div className="p-4.5 rounded-xl enterprise-card">
        <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
          Inspection Activity
        </h3>
        <EmptyState
          icon={ScanEye}
          title="No Inspection Logs"
          description="Inference logs and visual bounding box records will appear in this audit feed."
          actionLabel="Launch Studio"
          onAction={() => navigate('/studio')}
        />
      </div>
    );
  }

  const recentList = records.slice(0, 5);

  return (
    <div className="p-4.5 rounded-xl enterprise-card flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
            Recent Inspections
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Verified equipment scans logged locally
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          icon={ArrowRight}
          iconPosition="right"
          onClick={() => navigate('/history')}
          className="text-xs text-slate-300 hover:text-white"
        >
          View All ({records.length})
        </Button>
      </div>

      <div className="divide-y divide-slate-800/80">
        {recentList.map((rec) => (
          <div
            key={rec.id}
            onClick={() => onSelectRecord ? onSelectRecord(rec) : navigate('/history')}
            className="py-2.5 px-2 flex items-center justify-between hover:bg-[#162033]/60 rounded-lg transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-2.5 truncate">
              {/* Thumbnail */}
              <div className="w-8 h-8 rounded-md bg-[#0B101D] border border-slate-700/80 overflow-hidden shrink-0 flex items-center justify-center">
                {rec.processedImage || rec.originalImage ? (
                  <img
                    src={rec.processedImage || rec.originalImage}
                    alt={rec.filename}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                ) : (
                  <FileImage className="w-4 h-4 text-slate-500" />
                )}
              </div>

              <div className="overflow-hidden">
                <p className="text-xs font-medium text-slate-200 truncate group-hover:text-orange-400 transition-colors">
                  {rec.filename || 'Inspection Record'}
                </p>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono mt-0.5">
                  <span>{formatRelativeTime(rec.timestamp || rec.savedAt)}</span>
                  {rec.processingTimeMs && (
                    <span>• {rec.processingTimeMs}ms</span>
                  )}
                </div>
              </div>
            </div>

            <div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-2.5 h-2.5" />
                Verified
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
