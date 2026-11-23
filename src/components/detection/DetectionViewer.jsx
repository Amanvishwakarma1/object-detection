import React, { useState, useRef, useEffect } from 'react';
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
  Eye,
  Info
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
      className={`rounded-2xl border border-slate-700 bg-slate-950 flex flex-col overflow-hidden transition-all duration-300 ${
        isFullscreen ? 'fixed inset-4 z-50 shadow-2xl shadow-black/80' : 'relative'
      }`}
    >
      {/* Control Toolbar */}
      <div className="px-4 py-2.5 bg-[#172033] border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
        {/* View Mode Toggle Buttons */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setViewMode('annotated')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'annotated'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Annotated</span>
          </button>

          <button
            onClick={() => setViewMode('original')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'original'
                ? 'bg-slate-700 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Original</span>
          </button>

          <button
            onClick={() => setViewMode('side-by-side')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'side-by-side'
                ? 'bg-slate-700 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Side-by-Side</span>
          </button>

          <button
            onClick={() => setViewMode('slider')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'slider'
                ? 'bg-slate-700 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Split Slider</span>
          </button>
        </div>

        {/* Zoom & Action Controls */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center bg-slate-900/90 rounded-lg border border-slate-800 px-1">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 0.5}
              className="p-1 text-slate-400 hover:text-slate-200 disabled:opacity-40 cursor-pointer"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono text-slate-300 px-1.5 min-w-[42px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 3}
              className="p-1 text-slate-400 hover:text-slate-200 disabled:opacity-40 cursor-pointer"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            {zoomLevel !== 1 && (
              <button
                onClick={handleResetZoom}
                className="p-1 text-orange-400 hover:text-orange-300 cursor-pointer"
                title="Reset zoom"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            icon={Download}
            onClick={handleDownload}
            isLoading={isDownloading}
            className="text-xs border-slate-700 hover:bg-slate-800 text-slate-300"
          >
            Download
          </Button>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit full screen' : 'Expand full screen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Visual Display Area */}
      <div className="relative flex-1 min-h-[360px] max-h-[620px] bg-slate-950 overflow-auto flex items-center justify-center p-4 select-none">
        {/* Single Mode: Annotated */}
        {viewMode === 'annotated' && (
          <div
            className="transition-transform duration-150 origin-center flex items-center justify-center"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src={processedImage}
              alt="Annotated Inspection Result"
              className="max-h-[540px] w-auto object-contain rounded-lg shadow-2xl"
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
              className="max-h-[540px] w-auto object-contain rounded-lg shadow-2xl"
            />
          </div>
        )}

        {/* Side-by-Side Mode */}
        {viewMode === 'side-by-side' && (
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full items-center transition-transform duration-150 origin-center"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <div className="flex flex-col items-center">
              <span className="text-[11px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Original Input
              </span>
              <img
                src={originalImage || processedImage}
                alt="Original"
                className="max-h-[460px] w-auto object-contain rounded-lg border border-slate-800 shadow-lg"
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[11px] font-semibold text-orange-400 mb-1.5 uppercase tracking-wider">
                AI Annotated Overlay
              </span>
              <img
                src={processedImage}
                alt="AI Annotated"
                className="max-h-[460px] w-auto object-contain rounded-lg border border-orange-500/30 shadow-lg shadow-orange-500/10"
              />
            </div>
          </div>
        )}

        {/* Split Comparison Slider Mode */}
        {viewMode === 'slider' && (
          <div
            className="relative max-h-[540px] max-w-full overflow-hidden rounded-lg border border-slate-800 shadow-2xl transition-transform duration-150 origin-center"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {/* Background: Annotated Image */}
            <img
              src={processedImage}
              alt="Processed"
              className="max-h-[540px] w-auto object-contain block"
            />

            {/* Foreground: Original Image (Clipped by slider) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={originalImage || processedImage}
                alt="Original"
                className="max-h-[540px] w-auto object-contain max-w-none block"
              />
            </div>

            {/* Slider Divider Bar */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-orange-500 shadow-lg cursor-ew-resize flex items-center justify-center"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-7 h-7 -ml-[13px] rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg text-[10px] font-bold">
                ⮂⮃
              </div>
            </div>

            {/* Interactive Range Input overlay */}
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
      <div className="px-4 py-2 bg-[#111827] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-medium text-slate-300">YOLO Visual Bounding Box Layer Active</span>
        </div>
        {processingTimeMs && (
          <span className="font-mono text-[11px] text-slate-400">
            Inference: {processingTimeMs}ms
          </span>
        )}
      </div>
    </div>
  );
};
