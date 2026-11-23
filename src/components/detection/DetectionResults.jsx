import React, { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  Info,
  Clock,
  Layers,
  FileText
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { DETECTION_CLASSES } from '../../data/detectionClasses';

export const DetectionResults = ({ result }) => {
  if (!result) return null;

  const {
    id,
    filename,
    processedAt,
    status,
    processingTimeMs
  } = result;

  return (
    <div className="space-y-3.5">
      {/* High-Level Status & KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="p-3 rounded-lg enterprise-card">
          <span className="text-[10px] text-slate-400 block mb-0.5 uppercase tracking-wider font-mono">Status</span>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="text-xs font-bold text-slate-100 capitalize">
              {status}
            </span>
          </div>
        </div>

        <div className="p-3 rounded-lg enterprise-card">
          <span className="text-[10px] text-slate-400 block mb-0.5 uppercase tracking-wider font-mono">Inference Time</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span className="text-xs font-bold text-slate-100 font-mono">
              {processingTimeMs ? `${processingTimeMs} ms` : 'N/A'}
            </span>
          </div>
        </div>

        <div className="p-3 rounded-lg enterprise-card">
          <span className="text-[10px] text-slate-400 block mb-0.5 uppercase tracking-wider font-mono">Visual Output</span>
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="text-xs font-bold text-slate-100">
              YOLO Annotated
            </span>
          </div>
        </div>

        <div className="p-3 rounded-lg enterprise-card">
          <span className="text-[10px] text-slate-400 block mb-0.5 uppercase tracking-wider font-mono">Class Inventory</span>
          <div className="flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-xs font-bold text-slate-100">
              3 Classes
            </span>
          </div>
        </div>
      </div>

      {/* Honest Backend Disclosure Banner */}
      <div className="p-3.5 rounded-lg bg-[#0E1422] border border-slate-800 text-xs text-slate-300 space-y-1.5">
        <div className="flex items-center gap-2 text-slate-300 font-medium text-[11px]">
          <Info className="w-3.5 h-3.5 text-orange-400 shrink-0" />
          <span>Ultralytics Direct Plotting Pipeline</span>
        </div>
        <p className="text-slate-400 leading-relaxed text-[10px]">
          The Space endpoint (<code className="text-slate-300 font-mono">aman9832/object-detection</code>) executes YOLO bounding box plotting directly onto the image raster for Oxygen Tank, Fire Extinguisher, and Toolbox. FireGuard AI displays this real annotated layer faithfully without generating synthetic coordinate arrays.
        </p>
      </div>

      {/* Detected Equipment Reference Checklist */}
      <div className="rounded-xl border border-slate-800 bg-[#0E1422] p-3.5 space-y-2.5">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-[11px] font-semibold text-slate-200 uppercase tracking-wider">
              Safety Verification Standards Checklist
            </h4>
            <p className="text-[10px] text-slate-400">
              Cross-reference equipment visualized in the inspection viewer above
            </p>
          </div>
          <Badge variant="default" size="sm">
            3 Classes
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          {DETECTION_CLASSES.map((item) => (
            <div
              key={item.id}
              className="p-2 rounded-lg bg-[#141C2E] border border-slate-700/60 flex items-start gap-2"
            >
              <div
                className="w-2 h-2 rounded-full shrink-0 mt-1"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-200 truncate">
                    {item.displayName}
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono">
                    {item.standardCode.split('/')[0]}
                  </span>
                </div>
                <p className="text-[9px] text-slate-400 line-clamp-1 mt-0.5">
                  {item.typicalLocations}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
