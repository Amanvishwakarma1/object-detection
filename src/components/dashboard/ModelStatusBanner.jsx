import React from 'react';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Server
} from 'lucide-react';
import { Button } from '../common/Button';
import { useModelHealth } from '../../hooks/useModelHealth';
import { formatDateTime } from '../../utils/formatUtils';

export const ModelStatusBanner = () => {
  const {
    status,
    latency,
    lastChecked,
    errorMessage,
    isChecking,
    checkHealth,
    lastSuccessfulInference
  } = useModelHealth(true);

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[#172033] border border-slate-800/80 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="flex items-start sm:items-center gap-3.5">
        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${
            status === 'online'
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              : status === 'checking'
              ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
              : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}
        >
          {status === 'online' ? (
            <Server className="w-5 h-5" />
          ) : status === 'checking' ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : (
            <AlertTriangle className="w-5 h-5" />
          )}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-slate-100">
              Hugging Face Space: aman9832/object-detection
            </h4>
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                status === 'online'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : status === 'checking'
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  : 'bg-red-500/10 text-red-400 border-red-500/30'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  status === 'online'
                    ? 'bg-emerald-400 animate-pulse'
                    : status === 'checking'
                    ? 'bg-amber-400'
                    : 'bg-red-400'
                }`}
              />
              {status === 'online' ? 'Connected & Verified' : status === 'checking' ? 'Testing Link...' : 'Space Standby'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 mt-1">
            <span>
              Endpoint: <code className="text-slate-300 font-mono">/detect</code>
            </span>
            {latency !== null && (
              <span>
                Verified Latency: <strong className="text-emerald-400 font-mono">{latency} ms</strong>
              </span>
            )}
            {lastSuccessfulInference && (
              <span>
                Last Inference: <span className="text-slate-300">{formatDateTime(lastSuccessfulInference)}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end md:self-auto">
        <Button
          variant="outline"
          size="sm"
          icon={RefreshCw}
          onClick={checkHealth}
          isLoading={isChecking}
          className="text-xs border-slate-700 hover:bg-slate-800 text-slate-300"
        >
          Ping Space
        </Button>

        <a
          href="https://huggingface.co/spaces/aman9832/object-detection"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-colors"
        >
          <span>Open on HF</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
