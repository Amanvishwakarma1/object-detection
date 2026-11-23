import React, { useState } from 'react';
import {
  ScanEye,
  RotateCcw,
  UploadCloud,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight
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
    <div className="space-y-6">
      {/* Studio Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#172033] border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
            <ScanEye className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100">
              Fire Safety Detection Studio
            </h2>
            <p className="text-xs text-slate-400">
              Interactive workspace for high-resolution fire safety apparatus inference
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Model:</span>
          <span className="font-mono text-orange-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 font-semibold">
            aman9832/object-detection
          </span>
        </div>
      </div>

      {/* Main Studio Grid (Two Column Workspace) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Image Input & Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-[#172033] border border-slate-800/80 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <span>1. Image Input Payload</span>
              </h3>
              {previewUrl && (
                <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Image Staged
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
        <div className="lg:col-span-7 space-y-6">
          {result ? (
            <div className="space-y-6">
              {/* Interactive Image Result Viewer */}
              <DetectionViewer
                originalImage={result.originalImage || previewUrl}
                processedImage={result.processedImage}
                filename={result.filename}
                processingTimeMs={result.processingTimeMs}
              />

              {/* Detailed Detection Output & Inspection Checklist */}
              <DetectionResults result={result} />
            </div>
          ) : (
            /* Empty State when no detection has been executed */
            <div className="p-8 sm:p-12 rounded-2xl bg-[#172033]/60 border border-dashed border-slate-800 text-center min-h-[500px] flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center mb-4 shadow-inner">
                <Layers className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-200 mb-1">
                Visual Inspection Results Area
              </h3>
              <p className="text-xs text-slate-400 max-w-md mb-6 leading-relaxed">
                Upload an image or pick one of the sample industrial photos on the left, then click <strong>"Run FireGuard Detection"</strong> to execute real inference through the Hugging Face Space.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-w-lg w-full text-left text-xs">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase">Inspection</span>
                  <span className="text-slate-200 font-medium">Side-by-Side</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase">Controls</span>
                  <span className="text-slate-200 font-medium">Split Slider & Zoom</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase">Export</span>
                  <span className="text-slate-200 font-medium">Download WebP</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
