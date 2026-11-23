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
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#172033] border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100">
              Model Architecture & Backend Specifications
            </h2>
            <p className="text-xs text-slate-400">
              Verified technical facts regarding the Hugging Face Space inference service
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={RefreshCw}
            onClick={checkHealth}
            isLoading={isChecking}
            className="text-xs border-slate-700 text-slate-300"
          >
            Verify Live Status
          </Button>

          <a
            href="https://huggingface.co/spaces/aman9832/object-detection"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
          >
            <span>Open on Hugging Face</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Verified Technical Specifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Model ID */}
        <div className="p-4 rounded-2xl bg-[#172033] border border-slate-800 space-y-1.5">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
            Hugging Face Repository
          </span>
          <p className="text-base font-mono font-bold text-slate-100">
            aman9832/object-detection
          </p>
          <span className="text-[11px] text-slate-400 block">
            Owner: <strong className="text-slate-300">aman9832</strong>
          </span>
        </div>

        {/* Runtime Environment */}
        <div className="p-4 rounded-2xl bg-[#172033] border border-slate-800 space-y-1.5">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
            SDK & Framework
          </span>
          <p className="text-base font-mono font-bold text-emerald-400">
            Gradio 6.6.0 / Ultralytics YOLO
          </p>
          <span className="text-[11px] text-slate-400 block">
            Hardware: <strong className="text-slate-300">CPU-Basic</strong>
          </span>
        </div>

        {/* Verified API Endpoint */}
        <div className="p-4 rounded-2xl bg-[#172033] border border-slate-800 space-y-1.5">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
            Inference Endpoint
          </span>
          <p className="text-base font-mono font-bold text-orange-400">
            /detect
          </p>
          <span className="text-[11px] text-slate-400 block">
            Integration: <strong className="text-slate-300">@gradio/client</strong>
          </span>
        </div>

        {/* Connection Status */}
        <div className="p-4 rounded-2xl bg-[#172033] border border-slate-800 space-y-1.5">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
            Live Link Status
          </span>
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                status === 'online' ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'
              }`}
            />
            <span className="text-sm font-bold text-slate-100 capitalize">
              {status === 'online' ? 'Online & Verified' : 'Checking / Standby'}
            </span>
          </div>
          {latency !== null && (
            <span className="text-[11px] text-slate-400 font-mono block">
              Ping Latency: {latency} ms
            </span>
          )}
        </div>

        {/* Weights Checkpoint */}
        <div className="p-4 rounded-2xl bg-[#172033] border border-slate-800 space-y-1.5">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
            Checkpoint File
          </span>
          <p className="text-base font-mono font-bold text-slate-100">
            best.pt
          </p>
          <span className="text-[11px] text-slate-400 block">
            Base: Ultralytics YOLO (PyTorch)
          </span>
        </div>

        {/* Last Successful Inference */}
        <div className="p-4 rounded-2xl bg-[#172033] border border-slate-800 space-y-1.5">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
            Last Successful Job
          </span>
          <p className="text-sm font-mono font-semibold text-slate-200 truncate">
            {lastSuccessfulInference ? formatDateTime(lastSuccessfulInference) : 'No session jobs yet'}
          </p>
          <span className="text-[11px] text-slate-400 block">
            Recorded in local session
          </span>
        </div>
      </div>

      {/* Verified Architecture Pipeline */}
      <div className="p-6 rounded-2xl bg-[#172033] border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
          <Terminal className="w-4 h-4 text-orange-400" />
          <span>Inference Data Flow Architecture</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-bold text-orange-400">Step 1</span>
              <span>Client Browser</span>
            </div>
            <p className="font-semibold text-slate-200">Image Ingestion</p>
            <p className="text-[11px] text-slate-400">
              Validates JPG/PNG/WebP format, extracts dimensions, generates local blob payload.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-bold text-orange-400">Step 2</span>
              <span>SSE Protocol</span>
            </div>
            <p className="font-semibold text-slate-200">@gradio/client</p>
            <p className="text-[11px] text-slate-400">
              Connects to HF Space, invokes <code className="text-slate-300 font-mono">/detect</code> endpoint via Server-Sent Events.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-bold text-orange-400">Step 3</span>
              <span>Hugging Face</span>
            </div>
            <p className="font-semibold text-slate-200">YOLO Model Execution</p>
            <p className="text-[11px] text-slate-400">
              Executes <code className="text-slate-300 font-mono">results[0].plot()</code> on CPU container, rendering visual bounding boxes into output image.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-bold text-orange-400">Step 4</span>
              <span>FireGuard UI</span>
            </div>
            <p className="font-semibold text-slate-200">Interactive Studio</p>
            <p className="text-[11px] text-slate-400">
              Renders side-by-side, split slider, zoom controls, and archives to IndexedDB.
            </p>
          </div>
        </div>
      </div>

      {/* Code Snippet for Developers */}
      <div className="p-5 rounded-2xl bg-[#172033] border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Code2 className="w-4 h-4 text-orange-400" />
            Backend Connection Code (Official Integration)
          </span>
          <span className="text-[11px] font-mono text-slate-400">ESM JavaScript</span>
        </div>

        <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
{`import { Client } from "@gradio/client";

// Connect directly to the public Hugging Face Space
const client = await Client.connect("aman9832/object-detection");

// Execute inference on the verified /detect endpoint
const result = await client.predict("/detect", {
  image: imageFile // Blob or File object
});

// Extracted annotated visual output
const annotatedImageUrl = result.data[0].url;`}
        </pre>
      </div>
    </div>
  );
};
