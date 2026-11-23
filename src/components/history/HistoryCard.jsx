import React from 'react';
import {
  Clock,
  Trash2,
  Download,
  Eye,
  CheckCircle2,
  FileImage,
  ExternalLink
} from 'lucide-react';
import { formatDate, formatTime } from '../../utils/formatUtils';
import { downloadImage } from '../../utils/imageUtils';

export const HistoryCard = ({ record, onOpenDetail, onDelete }) => {
  const {
    id,
    filename,
    timestamp,
    savedAt,
    processedImage,
    originalImage,
    processingTimeMs,
    status
  } = record;

  const handleDownload = (e) => {
    e.stopPropagation();
    if (processedImage) {
      downloadImage(processedImage, `${filename}_fireguard_annotated.webp`);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <div
      onClick={() => onOpenDetail(record)}
      className="rounded-2xl border border-slate-800 bg-[#172033] hover:border-slate-700 hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col group cursor-pointer"
    >
      {/* Thumbnail Frame */}
      <div className="relative h-44 bg-slate-950 overflow-hidden flex items-center justify-center border-b border-slate-800">
        {processedImage || originalImage ? (
          <img
            src={processedImage || originalImage}
            alt={filename}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <FileImage className="w-10 h-10 text-slate-600" />
        )}

        {/* Status Badge Overlay */}
        <div className="absolute top-2.5 left-2.5">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/90 text-white backdrop-blur-md shadow-sm">
            <CheckCircle2 className="w-3 h-3" />
            Completed
          </span>
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={() => onOpenDetail(record)}
            className="p-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-lg cursor-pointer"
            title="Inspect record"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={handleDownload}
            className="p-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors shadow-lg cursor-pointer"
            title="Download annotated image"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Info Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h4 className="text-xs font-bold text-slate-100 truncate group-hover:text-orange-400 transition-colors">
            {filename || 'Inspection Record'}
          </h4>
          <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5 font-mono">
            <Clock className="w-3 h-3 text-slate-500" />
            <span>{formatDate(timestamp || savedAt)} • {formatTime(timestamp || savedAt)}</span>
          </p>
        </div>

        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-[11px] text-slate-400 font-mono">
            {processingTimeMs ? `${processingTimeMs} ms` : 'YOLOv8'}
          </span>

          <button
            onClick={handleDelete}
            className="text-slate-500 hover:text-red-400 p-1 rounded transition-colors cursor-pointer"
            title="Delete this record"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
