import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, Sparkles, X, RefreshCw, FileText } from 'lucide-react';
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
    <div className="space-y-4">
      {/* Upload Box or Image Preview */}
      {!previewUrl ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center min-h-[300px] ${
            isDragOver
              ? 'border-orange-500 bg-orange-500/10 scale-[0.99]'
              : 'border-slate-700/80 hover:border-slate-600 bg-[#172033]/50 hover:bg-[#172033]/80'
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

          <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-4 shadow-inner group-hover:scale-110 transition-transform">
            <UploadCloud className="w-8 h-8" />
          </div>

          <h3 className="text-base font-semibold text-slate-100 mb-1">
            Upload Inspection Imagery
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mb-4">
            Drag and drop your inspection photograph here, or browse your local file system.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-400 font-medium">
            <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700">JPG</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700">PNG</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700">WebP</span>
            <span className="text-slate-400">• Max 15 MB</span>
          </div>
        </div>
      ) : (
        /* Image Preview Box */
        <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 flex flex-col">
          {/* Top Bar with File Details */}
          <div className="px-4 py-2.5 bg-[#172033] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 truncate">
              <FileText className="w-4 h-4 text-orange-400 shrink-0" />
              <span className="text-xs font-semibold text-slate-200 truncate">
                {selectedFile?.name || 'Inspection Image'}
              </span>
              {selectedFile?.size > 0 && (
                <span className="text-[10px] text-slate-400 font-mono">
                  ({formatFileSize(selectedFile.size)})
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled}
                className="px-2 py-1 rounded-lg text-[11px] font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
                title="Replace image"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Replace</span>
              </button>

              <button
                onClick={onClear}
                disabled={disabled}
                className="p-1 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors cursor-pointer"
                title="Remove image"
              >
                <X className="w-4 h-4" />
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
          <div className="relative flex items-center justify-center p-4 bg-slate-950 min-h-[280px] max-h-[460px] overflow-hidden">
            <img
              src={previewUrl}
              alt="Inspection Preview"
              className="max-h-[420px] w-auto object-contain rounded-lg shadow-lg"
            />
          </div>

          {/* Dimensions Footer */}
          {dimensions && dimensions.width > 0 && (
            <div className="px-4 py-2 bg-[#111827] border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>Resolution: {dimensions.width} × {dimensions.height} px</span>
              <span>Aspect: {dimensions.aspectRatio}</span>
            </div>
          )}
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
          <span>{error}</span>
        </div>
      )}

      {/* Instant Test Sample Images Bar */}
      <div className="rounded-xl p-3.5 bg-[#172033]/60 border border-slate-800">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            Instant Inspection Samples
          </span>
          <span className="text-[11px] text-slate-400">1-click test load</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {SAMPLE_IMAGES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => onSelectSample(sample)}
              disabled={disabled}
              className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-orange-500/40 text-left transition-all cursor-pointer group disabled:opacity-50"
            >
              <div className="w-10 h-10 rounded-md bg-slate-800 border border-slate-700 overflow-hidden shrink-0 flex items-center justify-center">
                <img
                  src={sample.dataUrl}
                  alt={sample.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-medium text-slate-200 truncate group-hover:text-orange-400 transition-colors">
                  {sample.expectedClass}
                </p>
                <p className="text-[10px] text-slate-400 truncate">
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
