import React, { useState } from 'react';
import {
  ScanEye,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Server
} from 'lucide-react';
import { ImageUploader } from '../components/detection/ImageUploader';
import { DetectionControls } from '../components/detection/DetectionControls';
import { DetectionViewer } from '../components/detection/DetectionViewer';
import { DetectionResults } from '../components/detection/DetectionResults';
import { EmptyState } from '../components/common/EmptyState';
import { useDetection } from '../hooks/useDetection';

export const DetectionStudio = () => {
  const {
    selectedFile,
    previewUrl,
    fileDimensions,
    isProcessing,
    progressState,
    result,
    error,
    handleSelectFile,
    handleSelectSample,
    handleClear,
    handleRunDetection
  } = useDetection();

  return (
    <div className="space-y-4">
      {/* Studio Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl enterprise-card">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#162033] border border-slate-700/80 text-orange-400 flex items-center justify-center shrink-0">
            <ScanEye className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100">
              Inspection Studio
            </h2>
            <p className="text-[11px] text-slate-400">
              Ultralytics YOLO computer vision inference workspace
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-mono text-[11px]">Node:</span>
          <span className="font-mono text-slate-300 bg-[#0E1422] px-2 py-0.5 rounded border border-slate-800 text-[11px]">
            aman9832/object-detection
          </span>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column: Image Input & Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="p-4 rounded-xl enterprise-card space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <span>Staging & Ingestion</span>
              </h3>
              {previewUrl && (
                <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3 h-3" />
                  Staged
                </span>
              )}
            </div>

            <ImageUploader
              selectedFile={selectedFile}
              previewUrl={previewUrl}
              dimensions={fileDimensions}
              onSelectFile={handleSelectFile}
              onSelectSample={handleSelectSample}
              onClear={handleClear}
              disabled={isProcessing}
              error={error}
            />

            <div className="pt-2 border-t border-slate-800">
              <DetectionControls
                hasImage={Boolean(selectedFile || previewUrl)}
                isProcessing={isProcessing}
                progressState={progressState}
                onRunDetection={handleRunDetection}
                onReset={handleClear}
                hasResult={Boolean(result)}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Visual Inspection & Results Area (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {result ? (
            <div className="space-y-4">
              <DetectionViewer
                originalImage={result.originalImage || previewUrl}
                processedImage={result.processedImage}
                filename={result.filename}
                processingTimeMs={result.processingTimeMs}
              />
              <DetectionResults result={result} />
            </div>
          ) : (
            <div className="p-8 sm:p-12 rounded-xl enterprise-card text-center min-h-[460px] flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-xl bg-[#141C2E] border border-slate-700/80 text-slate-300 flex items-center justify-center mb-3">
                <Layers className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-sm font-bold text-slate-100 mb-1">
                Visual Inspection Viewport
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mb-5 leading-relaxed">
                Stage an image on the left, then click <strong>"Run FireGuard Detection"</strong> to execute real inference on the Hugging Face Space.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-w-md w-full text-left text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-[#0E1422] border border-slate-800">
                  <span className="text-[9px] text-slate-400 block uppercase">Mode</span>
                  <span className="text-slate-200 text-[11px]">Side-by-Side</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0E1422] border border-slate-800">
                  <span className="text-[9px] text-slate-400 block uppercase">Tools</span>
                  <span className="text-slate-200 text-[11px]">Split Slider</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0E1422] border border-slate-800 col-span-2 sm:col-span-1">
                  <span className="text-[9px] text-slate-400 block uppercase">Export</span>
                  <span className="text-slate-200 text-[11px]">Direct WebP</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
