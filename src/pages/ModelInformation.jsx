import React from 'react';
import {
  Cpu,
  Server,
  Activity,
  CheckCircle2,
  ExternalLink,
  Code2,
  Layers,
  ShieldCheck,
  RefreshCw,
  Terminal,
  Info,
  Database
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { useModelHealth } from '../hooks/useModelHealth';
import { formatDateTime } from '../utils/formatUtils';
import { DETECTION_CLASSES } from '../data/detectionClasses';

export const ModelInformation = () => {
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
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl enterprise-card">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#162033] border border-slate-700/80 text-orange-400 flex items-center justify-center shrink-0">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100">
              Model Specs & Architecture
            </h2>
            <p className="text-[11px] text-slate-400">
              Technical telemetry and verified capabilities for aman9832/object-detection
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={RefreshCw}
            onClick={checkHealth}
            isLoading={isChecking}
            className="text-xs"
          >
            Verify Link
          </Button>

          <a
            href="https://huggingface.co/spaces/aman9832/object-detection"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#EA580C] hover:bg-orange-600 transition-colors shadow-sm"
          >
            <span>Hugging Face Space</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Verified Technical Specifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        <div className="p-4 rounded-xl enterprise-card space-y-1">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block font-mono">
            Hugging Face Repository
          </span>
          <p className="text-sm font-mono font-bold text-slate-100">
            aman9832/object-detection
          </p>
          <span className="text-[10px] text-slate-400 block font-mono">
            Maintainer: aman9832
          </span>
        </div>

        <div className="p-4 rounded-xl enterprise-card space-y-1">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block font-mono">
            Runtime Framework
          </span>
          <p className="text-sm font-mono font-bold text-emerald-400">
            Gradio 6.6.0 • Ultralytics YOLO
          </p>
          <span className="text-[10px] text-slate-400 block font-mono">
            Hardware: CPU-Basic
          </span>
        </div>

        <div className="p-4 rounded-xl enterprise-card space-y-1">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block font-mono">
            Inference Route
          </span>
          <p className="text-sm font-mono font-bold text-orange-400">
            /detect
          </p>
          <span className="text-[10px] text-slate-400 block font-mono">
            Client: @gradio/client
          </span>
        </div>

        <div className="p-4 rounded-xl enterprise-card space-y-1">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block font-mono">
            Node Telemetry
          </span>
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                status === 'online' ? 'bg-emerald-400' : 'bg-red-400'
              }`}
            />
            <span className="text-xs font-semibold text-slate-200">
              {status === 'online' ? 'Online & Active' : 'Checking / Standby'}
            </span>
          </div>
          {latency !== null && (
            <span className="text-[10px] text-slate-400 font-mono block">
              Roundtrip Ping: {latency} ms
            </span>
          )}
        </div>

        <div className="p-4 rounded-xl enterprise-card space-y-1">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block font-mono">
            Weights Checkpoint
          </span>
          <p className="text-sm font-mono font-bold text-slate-100">
            best.pt
          </p>
          <span className="text-[10px] text-slate-400 block font-mono">
            Format: PyTorch / YOLOv8n
          </span>
        </div>

        <div className="p-4 rounded-xl enterprise-card space-y-1">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block font-mono">
            Last Successful Job
          </span>
          <p className="text-xs font-mono font-semibold text-slate-200 truncate">
            {lastSuccessfulInference ? formatDateTime(lastSuccessfulInference) : 'No session jobs yet'}
          </p>
          <span className="text-[10px] text-slate-400 block font-mono">
            Recorded locally
          </span>
        </div>
      </div>

      {/* Verified Architecture Pipeline */}
      <div className="p-5 rounded-xl enterprise-card space-y-3">
        <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-orange-400" />
          <span>Inference Pipeline</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 text-xs">
          <div className="p-3 rounded-lg bg-[#0E1422] border border-slate-800 space-y-1">
            <span className="font-mono text-orange-400 text-[10px] block">01 / Ingestion</span>
            <p className="font-semibold text-slate-200 text-xs">Payload Prep</p>
            <p className="text-[10px] text-slate-400">
              Validates JPG/PNG/WebP format, extracts pixel dimensions, converts to Blob.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-[#0E1422] border border-slate-800 space-y-1">
            <span className="font-mono text-orange-400 text-[10px] block">02 / Transport</span>
            <p className="font-semibold text-slate-200 text-xs">@gradio/client</p>
            <p className="text-[10px] text-slate-400">
              Transmits binary image via Server-Sent Events to <code className="text-slate-300 font-mono">/detect</code>.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-[#0E1422] border border-slate-800 space-y-1">
            <span className="font-mono text-orange-400 text-[10px] block">03 / Model</span>
            <p className="font-semibold text-slate-200 text-xs">Ultralytics YOLO</p>
            <p className="text-[10px] text-slate-400">
              Executes inference and draws bounding boxes via <code className="text-slate-300 font-mono">results[0].plot()</code>.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-[#0E1422] border border-slate-800 space-y-1">
            <span className="font-mono text-orange-400 text-[10px] block">04 / Viewport</span>
            <p className="font-semibold text-slate-200 text-xs">Visual Inspection</p>
            <p className="text-[10px] text-slate-400">
              Displays side-by-side or split slider comparison and logs to IndexedDB.
            </p>
          </div>
        </div>
      </div>

      {/* Code Snippet for Developers */}
      <div className="p-4 rounded-xl enterprise-card space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Code2 className="w-3.5 h-3.5 text-orange-400" />
            Backend Connection Code (ESM)
          </span>
          <span className="text-[10px] font-mono text-slate-400">JavaScript</span>
        </div>

        <pre className="p-3.5 rounded-lg bg-[#070A12] border border-slate-800 text-[11px] font-mono text-emerald-400 overflow-x-auto leading-relaxed">
{`import { Client } from "@gradio/client";

// Connect to Hugging Face Space
const client = await Client.connect("aman9832/object-detection");

// Execute inference on the verified /detect endpoint
const result = await client.predict("/detect", {
  image: imageFile // Blob or File object
});

// Extract annotated visual output URL
const annotatedImageUrl = result.data[0].url;`}
        </pre>
      </div>
    </div>
  );
};
