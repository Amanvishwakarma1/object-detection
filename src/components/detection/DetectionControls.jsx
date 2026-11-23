import React from 'react';
import { Play, RotateCcw, Loader2, ShieldCheck } from 'lucide-react';
import { Button } from '../common/Button';

export const DetectionControls = ({
  hasImage,
  isProcessing,
  progressState,
  onRunDetection,
  onReset,
  hasResult
}) => {
  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
        {/* Run Detection Primary Action */}
        <Button
          variant="primary"
          size="md"
          icon={Play}
          onClick={onRunDetection}
          disabled={!hasImage || isProcessing}
          isLoading={isProcessing}
          className="flex-1 font-semibold text-xs sm:text-sm"
        >
          {isProcessing ? 'Analyzing Equipment...' : hasResult ? 'Re-Run Inspection' : 'Run FireGuard Detection'}
        </Button>

        {/* Reset Action */}
        <Button
          variant="secondary"
          size="md"
          icon={RotateCcw}
          onClick={onReset}
          disabled={(!hasImage && !hasResult) || isProcessing}
          className="sm:w-auto text-xs"
        >
          Reset
        </Button>
      </div>

      {/* Real-time Progress Indicator */}
      {isProcessing && (
        <div className="p-3 rounded-lg bg-[#0E1422] border border-orange-500/30 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-orange-400 flex items-center gap-1.5 text-[11px]">
              <Loader2 className="w-3 h-3 animate-spin" />
              {progressState.message || 'Processing detection...'}
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
              {progressState.stage}
            </span>
          </div>

          <div className="w-full bg-[#141C2E] rounded-full h-1 overflow-hidden">
            <div
              className={`h-full bg-orange-500 transition-all duration-300 ${
                progressState.stage === 'starting'
                  ? 'w-1/4'
                  : progressState.stage === 'connecting'
                  ? 'w-2/5'
                  : progressState.stage === 'uploading'
                  ? 'w-3/5'
                  : progressState.stage === 'inferring'
                  ? 'w-4/5 animate-pulse'
                  : 'w-full'
              }`}
            />
          </div>
        </div>
      )}

      {/* Node indicator */}
      <div className="flex items-center justify-between text-[10px] text-slate-400 px-1 font-mono">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-500" />
          aman9832/object-detection
        </span>
        <span>Route: /detect</span>
      </div>
    </div>
  );
};
