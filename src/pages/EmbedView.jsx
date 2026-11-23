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
    <div className="min-h-screen bg-[#0B1120] text-slate-100 p-4 sm:p-6 font-sans">
      {/* Compact Embed Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md">
            <Flame className="w-4 h-4 fill-white/20" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
              <span>FireGuard AI</span>
              <span className="text-[10px] text-orange-400 px-1.5 py-0.5 rounded bg-orange-500/10 border border-orange-500/20">
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
          className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors"
        >
          <span>Open Full SaaS</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Workspace */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-5 space-y-4">
          <div className="p-4 rounded-2xl bg-[#172033] border border-slate-800 space-y-4">
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

        <div className="md:col-span-7 space-y-4">
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
            <div className="p-8 rounded-2xl bg-[#172033]/60 border border-dashed border-slate-800 text-center flex flex-col items-center justify-center min-h-[360px]">
              <ScanEye className="w-12 h-12 text-orange-400/60 mb-3" />
              <h3 className="text-sm font-bold text-slate-200 mb-1">
                Embedded Inspection Studio
              </h3>
              <p className="text-xs text-slate-400 max-w-sm">
                Stage an image on the left to detect fire extinguishers, hydrants, safety helmets, and equipment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
