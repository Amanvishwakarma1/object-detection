import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import {
  Download,
  Trash2,
  Clock,
  CheckCircle2,
  Layers,
  Eye,
  Columns,
  Sliders,
  ExternalLink
} from 'lucide-react';
import { formatDateTime } from '../../utils/formatUtils';
import { downloadImage } from '../../utils/imageUtils';

export const HistoryDetailModal = ({ record, isOpen, onClose, onDelete }) => {
  const [viewMode, setViewMode] = useState('annotated'); // 'annotated' | 'original' | 'side-by-side'

  if (!record) return null;

  const {
    id,
    filename,
    timestamp,
    savedAt,
    originalImage,
    processedImage,
    processingTimeMs,
    modelEndpoint,
    dimensions
  } = record;

  const handleDownload = () => {
    if (processedImage) {
      downloadImage(processedImage, `${filename}_fireguard_annotated.webp`);
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete the record for "${filename}"?`)) {
      onDelete(id);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={filename || 'Inspection Record Details'}
      subtitle={`Captured on ${formatDateTime(timestamp || savedAt)}`}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-5">
        {/* View Mode Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setViewMode('annotated')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'annotated'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Annotated Output</span>
            </button>

            {originalImage && (
              <>
                <button
                  onClick={() => setViewMode('original')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                    viewMode === 'original'
                      ? 'bg-slate-700 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Original Image</span>
                </button>

                <button
                  onClick={() => setViewMode('side-by-side')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                    viewMode === 'side-by-side'
                      ? 'bg-slate-700 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Columns className="w-3.5 h-3.5" />
                  <span>Side-by-Side</span>
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={Download}
              onClick={handleDownload}
              className="text-xs border-slate-700"
            >
              Download Annotated
            </Button>

            <Button
              variant="danger"
              size="sm"
              icon={Trash2}
              onClick={handleDelete}
              className="text-xs"
            >
              Delete Record
            </Button>
          </div>
        </div>

        {/* Display Area */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 min-h-[300px] max-h-[500px] overflow-auto flex items-center justify-center">
          {viewMode === 'annotated' && (
            <img
              src={processedImage}
              alt="Annotated Result"
              className="max-h-[460px] w-auto object-contain rounded-lg shadow-lg"
            />
          )}

          {viewMode === 'original' && (
            <img
              src={originalImage || processedImage}
              alt="Original Input"
              className="max-h-[460px] w-auto object-contain rounded-lg shadow-lg"
            />
          )}

          {viewMode === 'side-by-side' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div className="flex flex-col items-center">
                <span className="text-[11px] font-semibold text-slate-400 mb-1">Original Input</span>
                <img
                  src={originalImage}
                  alt="Original"
                  className="max-h-[380px] w-auto object-contain rounded-lg border border-slate-800"
                />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[11px] font-semibold text-orange-400 mb-1">AI Annotated</span>
                <img
                  src={processedImage}
                  alt="AI Annotated"
                  className="max-h-[380px] w-auto object-contain rounded-lg border border-orange-500/30"
                />
              </div>
            </div>
          )}
        </div>

        {/* Technical Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 font-mono">
          <div>
            <span className="text-[10px] text-slate-400 font-sans block uppercase">Record ID</span>
            <span className="text-slate-300 truncate block">{id}</span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 font-sans block uppercase">Inference Time</span>
            <span className="text-slate-300">{processingTimeMs ? `${processingTimeMs} ms` : 'N/A'}</span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 font-sans block uppercase">Resolution</span>
            <span className="text-slate-300">
              {dimensions?.width ? `${dimensions.width}×${dimensions.height}` : 'Native WebP'}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 font-sans block uppercase">Model Backend</span>
            <span className="text-orange-400 truncate block">aman9832/object-detection</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};
