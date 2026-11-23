import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  FileImage,
  ArrowRight,
  ExternalLink,
  ScanEye
} from 'lucide-react';
import { Button } from '../common/Button';
import { EmptyState } from '../common/EmptyState';
import { formatRelativeTime } from '../../utils/formatUtils';

export const RecentActivity = ({ records = [], onSelectRecord }) => {
  const navigate = useNavigate();

  if (!records || records.length === 0) {
    return (
      <div className="p-5 rounded-2xl bg-[#172033] border border-slate-800/80 shadow-lg">
        <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4">
          Recent Visual Inspections
        </h3>
        <EmptyState
          icon={ScanEye}
          title="No Inspection Activity Yet"
          description="Uploaded images and model predictions will appear here in your local audit stream."
          actionLabel="Launch Detection Studio"
          onAction={() => navigate('/studio')}
        />
      </div>
    );
  }

  const recentList = records.slice(0, 5);

  return (
    <div className="p-5 rounded-2xl bg-[#172033] border border-slate-800/80 shadow-lg flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
            Recent Visual Inspections
          </h3>
          <p className="text-xs text-slate-400">
            Latest inference jobs processed through the active model
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          icon={ArrowRight}
          iconPosition="right"
          onClick={() => navigate('/history')}
          className="text-xs text-orange-400 hover:text-orange-300"
        >
          View All ({records.length})
        </Button>
      </div>

      <div className="divide-y divide-slate-800/80 overflow-hidden">
        {recentList.map((rec) => (
          <div
            key={rec.id}
            onClick={() => onSelectRecord ? onSelectRecord(rec) : navigate('/history')}
            className="py-3 px-2 flex items-center justify-between hover:bg-slate-800/40 rounded-xl transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3 truncate">
              {/* Thumbnail */}
              <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 overflow-hidden shrink-0 flex items-center justify-center">
                {rec.processedImage || rec.originalImage ? (
                  <img
                    src={rec.processedImage || rec.originalImage}
                    alt={rec.filename}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <FileImage className="w-5 h-5 text-slate-500" />
                )}
              </div>

              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-slate-200 truncate group-hover:text-orange-400 transition-colors">
                  {rec.filename || 'Inspection Record'}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {formatRelativeTime(rec.timestamp || rec.savedAt)}
                  </span>
                  {rec.processingTimeMs && (
                    <span className="font-mono text-slate-400">
                      • {rec.processingTimeMs}ms
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-3 h-3" />
                Completed
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
