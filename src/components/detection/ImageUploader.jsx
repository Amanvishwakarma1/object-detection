import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, Sparkles, X, RefreshCw, FileText, Camera } from 'lucide-react';
import { Button } from '../common/Button';
import { formatFileSize } from '../../utils/formatUtils';
import { SAMPLE_IMAGES } from '../../data/sampleImages';

export const ImageUploader = ({
  selectedFile,
  previewUrl,
  dimensions,
  onSelectFile,
  onSelectSample,
  onClear,
  disabled = false,
  error = null
}) => {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onSelectFile(files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onSelectFile(files[0]);
    }
  };

  return (
    <div className="space-y-3.5">
      {/* Upload Dropzone or Staged Preview */}
      {!previewUrl ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border border-dashed rounded-xl p-8 sm:p-10 text-center transition-all duration-150 cursor-pointer flex flex-col items-center justify-center min-h-[260px] ${
            isDragOver
              ? 'border-orange-500 bg-orange-500/5'
              : 'border-slate-700/70 hover:border-slate-500 bg-[#0B101D] hover:bg-[#0E1422]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileInputChange}
            disabled={disabled}
          />

          <div className="w-12 h-12 rounded-xl bg-[#162033] border border-slate-700/80 flex items-center justify-center text-slate-300 mb-3 shadow-inner">
            <Camera className="w-5 h-5 text-orange-400" />
          </div>

          <h3 className="text-sm font-semibold text-slate-100 mb-1">
            Stage Inspection Image
          </h3>
          <p className="text-[11px] text-slate-400 max-w-xs mb-3">
            Drop your JPG, PNG, or WebP site photograph here, or browse local disk.
          </p>

          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">JPG</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">PNG</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">WebP</span>
            <span className="text-slate-400">• Max 15 MB</span>
          </div>
        </div>
      ) : (
        /* Image Preview Box */
        <div className="relative rounded-xl overflow-hidden border border-slate-700/80 bg-[#070A12] flex flex-col">
          {/* Top Bar with File Details */}
          <div className="px-3 py-2 bg-[#0E1422] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 truncate">
              <FileText className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span className="text-xs font-semibold text-slate-200 truncate font-mono">
                {selectedFile?.name || 'Inspection Image'}
              </span>
              {selectedFile?.size > 0 && (
                <span className="text-[10px] text-slate-400 font-mono">
                  ({formatFileSize(selectedFile.size)})
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled}
                className="px-2 py-1 rounded text-[11px] font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
                title="Replace image"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Replace</span>
              </button>

              <button
                onClick={onClear}
                disabled={disabled}
                className="p-1 rounded text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors cursor-pointer"
                title="Remove image"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileInputChange}
            disabled={disabled}
          />

          {/* Preview Image Frame */}
          <div className="relative flex items-center justify-center p-3 bg-[#070A12] min-h-[240px] max-h-[380px] overflow-hidden">
            <img
              src={previewUrl}
              alt="Inspection Preview"
              className="max-h-[350px] w-auto object-contain rounded border border-slate-800 shadow-md"
            />
          </div>

          {/* Dimensions Footer */}
          {dimensions && dimensions.width > 0 && (
            <div className="px-3 py-1.5 bg-[#0A0F1B] border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>{dimensions.width} × {dimensions.height} px</span>
              <span>Aspect: {dimensions.aspectRatio}</span>
            </div>
          )}
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
          {error}
        </div>
      )}

      {/* 1-Click Instant Inspection Presets */}
      <div className="rounded-xl p-3 bg-[#0E1422] border border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-orange-400" />
            Inspection Presets
          </span>
          <span className="text-[10px] text-slate-400">1-click test load</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {SAMPLE_IMAGES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => onSelectSample(sample)}
              disabled={disabled}
              className="flex items-center gap-2 p-1.5 rounded-lg bg-[#141C2E] hover:bg-[#1A243B] border border-slate-700/60 hover:border-orange-500/40 text-left transition-all cursor-pointer group disabled:opacity-40"
            >
              <div className="w-8 h-8 rounded bg-slate-900 border border-slate-800 overflow-hidden shrink-0 flex items-center justify-center">
                <img
                  src={sample.dataUrl}
                  alt={sample.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="overflow-hidden">
                <p className="text-[11px] font-semibold text-slate-200 truncate group-hover:text-orange-400 transition-colors">
                  {sample.expectedClass.split(' ')[0]}
                </p>
                <p className="text-[9px] text-slate-400 font-mono truncate">
                  {sample.tags[0]}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
