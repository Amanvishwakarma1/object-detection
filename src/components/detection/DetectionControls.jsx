import React from 'react';
import { Play, RotateCcw, Loader2, Sparkles, AlertCircle, ShieldCheck } from 'lucide-react';
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
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Run Detection Primary Action */}
        <Button
          variant="primary"
          size="lg"
          icon={Play}
          onClick={onRunDetection}
          disabled={!hasImage || isProcessing}
          isLoading={isProcessing}
          className={`flex-1 font-semibold text-sm shadow-xl ${
            hasImage && !isProcessing && !hasResult
              ? 'animate-pulse hover:animate-none'
              : ''
          }`}
        >
          {isProcessing ? 'Analyzing Equipment...' : hasResult ? 'Re-Run Inspection' : 'Run FireGuard Detection'}
        </Button>

        {/* Reset Action */}
        <Button
          variant="secondary"
          size="lg"
          icon={RotateCcw}
          onClick={onReset}
          disabled={(!hasImage && !hasResult) || isProcessing}
          className="sm:w-auto"
        >
          Reset Studio
        </Button>
      </div>

      {/* Real-time Progress Indicator */}
      {isProcessing && (
        <div className="p-3.5 rounded-xl bg-orange-500/10 border border-orange-500/30 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-orange-400 flex items-center gap-1.5">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              {progressState.message || 'Processing detection...'}
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
              Stage: {progressState.stage}
            </span>
          </div>

          <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-300 ${
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

      {/* Backend Attribution Note */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          Backend: Hugging Face Spaces (aman9832/object-detection)
        </span>
        <span className="font-mono text-slate-400">Endpoint: /detect</span>
      </div>
    </div>
  );
};
