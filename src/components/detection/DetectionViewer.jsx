import React, { useState, useRef } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Download,
  Columns,
  Layers,
  Sliders,
  RotateCcw,
  CheckCircle2,
  Eye
} from 'lucide-react';
import { Button } from '../common/Button';
import { downloadImage } from '../../utils/imageUtils';

export const DetectionViewer = ({
  originalImage,
  processedImage,
  filename = 'inspection.jpg',
  processingTimeMs,
  onFullscreenChange
}) => {
  const [viewMode, setViewMode] = useState('annotated'); // 'annotated' | 'original' | 'side-by-side' | 'slider'
  const [zoomLevel, setZoomLevel] = useState(1);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const containerRef = useRef(null);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => setZoomLevel(1);

  const handleDownload = async () => {
    if (!processedImage) return;
    setIsDownloading(true);
    try {
      const ext = filename.split('.').pop() || 'webp';
      const cleanName = filename.replace(/\.[^/.]+$/, '');
      await downloadImage(processedImage, `${cleanName}_fireguard_annotated.${ext}`);
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (onFullscreenChange) onFullscreenChange(!isFullscreen);
  };

  return (
    <div
      ref={containerRef}
      className={`rounded-xl border border-slate-700/80 bg-[#070A12] flex flex-col overflow-hidden transition-all duration-200 ${
        isFullscreen ? 'fixed inset-4 z-50 shadow-2xl shadow-black/90' : 'relative'
      }`}
    >
      {/* Control Toolbar */}
      <div className="px-3.5 py-2 bg-[#0E1422] border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
        {/* View Mode Toggle Buttons */}
        <div className="flex items-center gap-1 bg-[#141C2E] p-0.5 rounded-lg border border-slate-700/80">
          <button
            onClick={() => setViewMode('annotated')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'annotated'
                ? 'bg-[#EA580C] text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>Annotated</span>
          </button>

          <button
            onClick={() => setViewMode('original')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'original'
                ? 'bg-[#1C263A] text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>Original</span>
          </button>

          <button
            onClick={() => setViewMode('side-by-side')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'side-by-side'
                ? 'bg-[#1C263A] text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Columns className="w-3 h-3" />
            <span>Side-by-Side</span>
          </button>

          <button
            onClick={() => setViewMode('slider')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'slider'
                ? 'bg-[#1C263A] text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-3 h-3" />
            <span>Split Slider</span>
          </button>
        </div>

        {/* Zoom & Action Controls */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center bg-[#141C2E] rounded-md border border-slate-700/80 px-1 py-0.5">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 0.5}
              className="p-1 text-slate-400 hover:text-slate-200 disabled:opacity-40 cursor-pointer"
              title="Zoom out"
            >
              <ZoomOut className="w-3 h-3" />
            </button>
            <span className="text-[10px] font-mono text-slate-300 px-1.5 min-w-[38px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 3}
              className="p-1 text-slate-400 hover:text-slate-200 disabled:opacity-40 cursor-pointer"
              title="Zoom in"
            >
              <ZoomIn className="w-3 h-3" />
            </button>
            {zoomLevel !== 1 && (
              <button
                onClick={handleResetZoom}
                className="p-1 text-orange-400 hover:text-orange-300 cursor-pointer"
                title="Reset zoom"
              >
                <RotateCcw className="w-2.5 h-2.5" />
              </button>
            )}
          </div>

          <Button
            variant="secondary"
            size="sm"
            icon={Download}
            onClick={handleDownload}
            isLoading={isDownloading}
            className="text-xs"
          >
            Download
          </Button>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-200 hover:bg-[#141C2E] transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit full screen' : 'Expand full screen'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Visual Display Area */}
      <div className="relative flex-1 min-h-[340px] max-h-[580px] bg-[#070A12] overflow-auto flex items-center justify-center p-3 select-none">
        {/* Single Mode: Annotated */}
        {viewMode === 'annotated' && (
          <div
            className="transition-transform duration-150 origin-center flex items-center justify-center"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src={processedImage}
              alt="Annotated Inspection Result"
              className="max-h-[520px] w-auto object-contain rounded border border-slate-800 shadow-xl"
            />
          </div>
        )}

        {/* Single Mode: Original */}
        {viewMode === 'original' && (
          <div
            className="transition-transform duration-150 origin-center flex items-center justify-center"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src={originalImage || processedImage}
              alt="Original Unannotated Image"
              className="max-h-[520px] w-auto object-contain rounded border border-slate-800 shadow-xl"
            />
          </div>
        )}

        {/* Side-by-Side Mode */}
        {viewMode === 'side-by-side' && (
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full h-full items-center transition-transform duration-150 origin-center"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-semibold text-slate-400 mb-1 uppercase tracking-wider font-mono">
                Input Image
              </span>
              <img
                src={originalImage || processedImage}
                alt="Original"
                className="max-h-[440px] w-auto object-contain rounded border border-slate-800 shadow-md"
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-semibold text-orange-400 mb-1 uppercase tracking-wider font-mono">
                YOLO Annotated Output
              </span>
              <img
                src={processedImage}
                alt="AI Annotated"
                className="max-h-[440px] w-auto object-contain rounded border border-orange-500/30 shadow-md shadow-orange-500/10"
              />
            </div>
          </div>
        )}

        {/* Split Comparison Slider Mode */}
        {viewMode === 'slider' && (
          <div
            className="relative max-h-[520px] max-w-full overflow-hidden rounded border border-slate-800 shadow-xl transition-transform duration-150 origin-center"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {/* Background: Annotated Image */}
            <img
              src={processedImage}
              alt="Processed"
              className="max-h-[520px] w-auto object-contain block"
            />

            {/* Foreground: Original Image (Clipped by slider) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={originalImage || processedImage}
                alt="Original"
                className="max-h-[520px] w-auto object-contain max-w-none block"
              />
            </div>

            {/* Precision Slider Divider Bar */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-orange-500 shadow-md cursor-ew-resize flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-5 h-5 -ml-[9px] rounded-full bg-[#EA580C] text-white flex items-center justify-center shadow-lg text-[8px] font-bold border border-white/20">
                ⮂⮃
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
              aria-label="Comparison slider"
            />
          </div>
        )}
      </div>

      {/* Viewer Footer Bar */}
      <div className="px-3.5 py-1.5 bg-[#0E1422] border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span className="text-slate-300">YOLO Visual Bounding Box Layer Rendered</span>
        </div>
        {processingTimeMs && (
          <span className="text-slate-400">
            Latency: {processingTimeMs}ms
          </span>
        )}
      </div>
    </div>
  );
};
