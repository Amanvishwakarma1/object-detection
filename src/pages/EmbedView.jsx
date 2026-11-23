import React from 'react';
import { Flame, ScanEye, ExternalLink, ShieldAlert } from 'lucide-react';
import { ImageUploader } from '../components/detection/ImageUploader';
import { DetectionControls } from '../components/detection/DetectionControls';
import { DetectionViewer } from '../components/detection/DetectionViewer';
import { DetectionResults } from '../components/detection/DetectionResults';
import { useDetection } from '../hooks/useDetection';

export const EmbedView = () => {
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
    <div className="min-h-screen bg-[#080C14] text-slate-100 p-3 sm:p-5 font-sans">
      {/* Compact Embed Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#EA580C] text-white flex items-center justify-center shrink-0 shadow-sm">
            <Flame className="w-4 h-4 fill-white/20" />
          </div>
          <div>
            <h1 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
              <span>FireGuard AI</span>
              <span className="text-[9px] text-slate-400 px-1 py-0.2 rounded bg-[#141C2E] border border-slate-700/80 font-mono">
                Widget
              </span>
            </h1>
            <p className="text-[10px] text-slate-400">
              Fire Safety Equipment Visual Inspection
            </p>
          </div>
        </div>

        <a
          href={window.location.origin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors font-mono text-[11px]"
        >
          <span>Open Full Console</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Workspace */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        <div className="md:col-span-5 space-y-3">
          <div className="p-3.5 rounded-xl enterprise-card space-y-3">
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

        <div className="md:col-span-7 space-y-3">
          {result ? (
            <div className="space-y-3">
              <DetectionViewer
                originalImage={result.originalImage || previewUrl}
                processedImage={result.processedImage}
                filename={result.filename}
                processingTimeMs={result.processingTimeMs}
              />
              <DetectionResults result={result} />
            </div>
          ) : (
            <div className="p-6 rounded-xl enterprise-card text-center flex flex-col items-center justify-center min-h-[320px]">
              <ScanEye className="w-10 h-10 text-orange-400/50 mb-2.5" />
              <h3 className="text-xs font-bold text-slate-200 mb-1">
                Embedded Inspection Studio
              </h3>
              <p className="text-[11px] text-slate-400 max-w-xs">
                Stage an image on the left to detect fire extinguishers, hydrants, safety helmets, and equipment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
