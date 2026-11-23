import React from 'react';
import {
  Server,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Zap
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
    <div className="p-4 rounded-xl enterprise-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-[#162033] border border-slate-700/60 flex items-center justify-center text-slate-300 shrink-0">
          <Server className="w-4 h-4 text-orange-400" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-semibold text-slate-200">
              Inference Node: <span className="font-mono text-slate-100">aman9832/object-detection</span>
            </h4>
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[10px] font-medium border ${
                status === 'online'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : status === 'checking'
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  : 'bg-red-500/10 text-red-400 border-red-500/30'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  status === 'online' ? 'bg-emerald-400' : status === 'checking' ? 'bg-amber-400' : 'bg-red-400'
                }`}
              />
              {status === 'online' ? 'Active & Ready' : status === 'checking' ? 'Pinging Node...' : 'Offline'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400 mt-0.5">
            <span>
              Route: <code className="text-slate-300 font-mono">/detect</code>
            </span>
            {latency !== null && (
              <span>
                Latency: <strong className="text-slate-200 font-mono">{latency} ms</strong>
              </span>
            )}
            {lastSuccessfulInference && (
              <span>
                Last Job: <span className="text-slate-300">{formatDateTime(lastSuccessfulInference)}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end md:self-auto">
        <Button
          variant="secondary"
          size="sm"
          icon={RefreshCw}
          onClick={checkHealth}
          isLoading={isChecking}
          className="text-xs"
        >
          Ping Node
        </Button>

        <a
          href="https://huggingface.co/spaces/aman9832/object-detection"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-[#141C2E] hover:bg-[#1A243B] border border-slate-700/80 transition-colors shadow-sm"
        >
          <span>Hugging Face Space</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </a>
      </div>
    </div>
  );
};
